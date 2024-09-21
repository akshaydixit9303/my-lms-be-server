const db = require("../../config/db");
const {
  createInvRow,
  taxInvoiceEntry,
  createCustomer,
} = require("./InvoiceFunctions");
const fs = require("fs");

const getCorporateCustData = (req, res) => {
  const { cust_id } = req.params;
  db.query(
    "SELECT * FROM main_admin_db.offline_cust_reg_corp where cust_id = ?",
    [cust_id],
    (err, result) => {
      if (err)
        console.log(
          err,
          " : error while getting proforma corporate customer data."
        );
      else {
        res.status(200).send({
          success: true,
          data: result,
        });
      }
    }
  );
};
const createCorpProformaInv = (req, res) => {
  const {
    dataUri,
    cust_data,
    invoice_num,
    final_amt,
    ip_address,
    formData,
    data,
    order_id,
    course_id,
    course_fee,
    hsn_code,
    service,
    appliedTax,
    taxAmount,
    amount,
    remain_amt,
    pay_mode,
    dis_per,
    dis_value,
    amt_after_dis,
    inv_incl_tax_amt,
    serviceRow,
    tax_applicability,
  } = req.body;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  var presentDate = yyyy + "-" + mm + "-" + dd;

  // Add 90 days to the current date
  today.setDate(today.getDate() + 90);

  var futureDD = String(today.getDate()).padStart(2, "0");
  var futureMM = String(today.getMonth() + 1).padStart(2, "0");
  var futureYYYY = today.getFullYear();

  var futureDate = futureYYYY + "-" + futureMM + "-" + futureDD;

  const pdf = Buffer.from(dataUri.split(",")[1], "base64");

  db.query(
    "SELECT * FROM main_admin_db.proforma_invoices_myvedait where order_id = ? OR invoice_no = ?",
    [order_id, invoice_num],
    (err, valid) => {
      if (err)
        console.log(err, " : error while checking corporate offline invoices");
      else
        createInvRow(
          cust_data,
          invoice_num,
          final_amt,
          ip_address,
          formData,
          data,
          order_id,
          course_id,
          course_fee,
          hsn_code,
          service,
          appliedTax,
          taxAmount,
          amount,
          remain_amt,
          pay_mode,
          dis_per,
          dis_value,
          amt_after_dis,
          inv_incl_tax_amt,
          serviceRow,
          presentDate,
          res,
          pdf,
          tax_applicability
        );
    }
  );
};

const getAllInvoiceCust = (req, res) => {
  const { cust_id } = req.params;
  try {
    db.query(
      "SELECT * FROM main_admin_db.proforma_invoices_myvedait where cust_id = ?",
      [cust_id],
      (err, result) => {
        if (err)
          console.log(
            err,
            " : error while getting data of corporate customer invoice."
          );
        else
          res.status(200).send({
            success: true,
            data: result,
          });
      }
    );
  } catch (error) {}
};

//

const updateInvoiceStatus = async (newUpdateStatus, rows, res, cust_data) => {
  try {
    var value_success;

    const updateResult = await new Promise((resolve, reject) => {
      db.query(
        "UPDATE main_admin_db.proforma_invoices_myvedait SET ? WHERE invoice_no = ?",
        [newUpdateStatus, rows.invoice_no],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    console.log(updateResult, "updated data");

    const newUpdatedData = {
      ...newUpdateStatus,
      payment_status: newUpdateStatus?.invoice_type,
      cust_gstin: cust_data?.GSTIN,
      payment_date_time: newUpdateStatus?.ccav_trans_date,
    };

    if (
      newUpdateStatus.invoice_type === "Paid" ||
      newUpdateStatus.invoice_type !== "Paid"
    ) {
      const { success } = await taxInvoiceEntry(newUpdatedData);
      console.log(success, "success 1");
      if (
        success &&
        rows.service_id == 1 &&
        newUpdateStatus.invoice_type === "Paid"
      ) {
        const statusS = createCustomer(cust_data, res, rows?.course_id);
        console.log(statusS, "staatus");

        if (statusS) {
          db.query(
            "delete from main_admin_db.proforma_invoices_myvedait where invoice_no = ?",
            [rows.invoice_no],
            (errRm, resultRm) => {
              if (errRm)
                console.log(
                  errRm,
                  " : error while removing Updated Proforma Invoice."
                );
              else res.status(200).send({ success: true });
            }
          );
        } else {
          res.status(200).send({ success: true });
        }
      } else if (success && rows.service_id !== 1) {
        db.query(
          "delete from main_admin_db.proforma_invoices_myvedait where invoice_no = ?",
          [rows.invoice_no],
          (errRm, resultRm) => {
            if (errRm)
              console.log(
                errRm,
                " : error while removing Updated Proforma Invoice."
              );
            else res.status(200).send({ success: true });
          }
        );
      } else if (
        success &&
        rows.service_id == 1 &&
        newUpdateStatus.invoice_type !== "Paid"
      ) {
        db.query(
          "delete from main_admin_db.proforma_invoices_myvedait where invoice_no = ?",
          [rows.invoice_no],
          (errRm, resultRm) => {
            if (errRm)
              console.log(
                errRm,
                " : error while removing Updated Proforma Invoice."
              );
            else res.status(200).send({ success: true });
          }
        );
      }
    }
  } catch (error) {
    console.log(error, " : error while update proforma invoice:");
    throw error;
  }
};
const updatePaidInvoice = (req, res) => {
  const { dataUri, rows, cust_data, formData } = req.body;
  const updateData = { ...rows, ...formData };
  const newUpdateStatus = {
    ...updateData,
    invoice_status: 1,
  };
  const pdf = Buffer.from(dataUri.split(",")[1], "base64");
  const inv_name = rows.invoice_no.replace("/", "-");
  fs.writeFileSync(`./offline_invoices/${inv_name}.pdf`, pdf);

  updateInvoiceStatus(newUpdateStatus, rows, res, cust_data);
};
const checkOrders = (req, res) => {
  const { cust_id, id } = req.params;

  try {
    db.query(
      `SELECT
      t1.id,t1.service_name,t1.service_id,t1.order_id,t1.order_date,t1.invoice_no,t1.inv_date,
      t1.cust_id, t1.course_id,t1.billing_name,t1.billing_tel,
      t1.billing_address,
      t1.billing_email,
      t1.services,
      t1.coupon_id,
      t1.mrp_amount,
      t1.inv_amount,
      t1.inv_incl_tax_amount,
      t1.payment_status,
      t1.payment_date_time,
      t1.cust_gstin,
      t1.txn_details,
      t1.payment_remark,
      t1.payment_mode,
      t1.mer_amount,
      t1.ccav_tracking_id,
      t1.ccav_bank_ref_no,
      t1.ccav_order_status,
      t1.ccav_failure_msg,
      t1.ccav_payment_mode,
      t1.ccav_card_name,
      t1.ccav_status_code,
      t1.ccav_status_message,
      t1.ccav_retry,
      t1.ccav_trans_date,
      t1.ccav_response_code,
      t1.invoice_gen_type,
      t1.gst_challan_no,
      t1.gst_status,
      t1.gst_pay_date,
      t1.duration,
      t1.due_date,
      t1.payment_type,
      t1.dis_percent,
      t1.dis_amount,
      t1.discounted_amount,
      t1.tax_amount,
      t1.tax_percent,
      t1.hsn_sac,
      t1.remain_amount,
      t1.bank_name,
      t1.ifsc_code,
      t1.cheque_no,
      t1.file_name,
      t1.invoice_type,
      t1.invoice_status,
      t1.cust_type,
      t1.po_number,
      t1.po_remark,
      t1.inv_validity,
      t1.pmt_tc_type,
      t1.pmt_tc_remark,
      t1.part_pmt_percent,
      t1.place_of_supply,
      t1.sales_type
    FROM
      main_admin_db.proforma_invoices_myvedait t1
    WHERE
      t1.cust_id = ? 
      AND t1.service_id = ? 
      AND t1.remain_amount > 0 
      AND t1.order_id IS NOT NULL 
      AND NOT EXISTS (
        SELECT 1
        FROM main_admin_db.proforma_invoices_myvedait t2
        WHERE t1.order_id = t2.order_id AND remain_amount = 0
      )
    GROUP BY
    t1.id,
    t1.service_name,
    t1.service_id,
    t1.order_id,
    t1.order_date,
    t1.invoice_no,
    t1.inv_date,
    t1.cust_id,
    t1.course_id,
    t1.billing_name,
    t1.billing_tel,
    t1.billing_address,
    t1.billing_email,
    t1.services,
    t1.coupon_id,
    t1.mrp_amount,
    t1.inv_amount,
    t1.inv_incl_tax_amount,
    t1.payment_status,
    t1.payment_date_time,
    t1.cust_gstin,
    t1.txn_details,
    t1.payment_remark,
    t1.payment_mode,
    t1.mer_amount,
    t1.ccav_tracking_id,
    t1.ccav_bank_ref_no,
    t1.ccav_order_status,
    t1.ccav_failure_msg,
    t1.ccav_payment_mode,
    t1.ccav_card_name,
    t1.ccav_status_code,
    t1.ccav_status_message,
    t1.ccav_retry,
    t1.ccav_trans_date,
    t1.ccav_response_code,
    t1.invoice_gen_type,
    t1.gst_challan_no,
    t1.gst_status,
    t1.gst_pay_date,
    t1.duration,
    t1.due_date,
    t1.payment_type,
    t1.dis_percent,
    t1.dis_amount,
    t1.discounted_amount,
    t1.tax_amount,
    t1.tax_percent,
    t1.hsn_sac,
    t1.remain_amount,
    t1.bank_name,
    t1.ifsc_code,
    t1.cheque_no,
    t1.file_name,
    t1.invoice_type,
    t1.invoice_status,
    t1.cust_type,
    t1.po_number,
    t1.po_remark,
    t1.inv_validity,
    t1.pmt_tc_type,
    t1.pmt_tc_remark,
    t1.part_pmt_percent,
    t1.place_of_supply,
    t1.sales_type `,
      [cust_id, parseInt(id)],
      (err, result) => {
        if (err) console.log(err);
        else {
          if (!result.length) {
            res.status(200).send({
              success: false,
            });
          } else {
            res.status(200).send({ success: true, data: result });
          }
        }
      }
    );
  } catch (error) {}
};
const getOrderDetails = (req, res) => {
  const { cust_id, order_id } = req.params;
  try {
    db.query(
      "SELECT * FROM main_admin_db.proforma_invoices_myvedait where cust_id = ? and order_id = ?",
      [cust_id, order_id],
      (err, result) => {
        if (err)
          console.log(
            err,
            " : error while getting proforma all invoices data of order"
          );
        else
          res.status(200).send({
            success: true,
            data: result,
          });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
const getOrderInvoices = async (req, res) => {
  const paidInvoices = await new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM main_admin_db.tax_invoice_order_myvedait where tax_applicability = ?",
      ["Plus-Tax"],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });

  const myItData = await new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM main_admin_db.invoice_order_myit_ft where ccav_order_status = ?",
      ["Success"],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

  // total success orders
  const success_orders = paidInvoices.length + myItData.length;
  // total order amount
  const tot_amt = paidInvoices.map((e) => {
    return parseFloat(e.inv_amount);
  });

  const tot_my_it = myItData.map((e) => {
    return parseFloat(e.amount_incl_tax);
  });

  const total_ = tot_amt.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const total_myit = tot_my_it.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const total_order_amount = total_ + total_myit;
  // GST Paid
  const tot_amt_gst_paid = paidInvoices
    .filter((item) => item.tax_paid_amount)
    .map((e) => {
      return parseFloat(e.tax_paid_amount);
    });

  // const tot_my_it_gst_paid = myItData.map((e)=>{
  //   return parseFloat(e.amount_incl_tax)
  // })

  console.log(tot_amt_gst_paid, "mmyyy");
  const gst_paid_total_ = tot_amt_gst_paid.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  // const gst_paid_total_myit = tot_my_it_gst_paid.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue,
  //   0
  // );

  // gst pending

  const tot_amt_gst_pending = paidInvoices
    .filter((item) => !item.tax_paid_amount)
    .map((e) => {
      return parseFloat(e.tax_amount);
    });

  // const tot_my_it_gst_pending = myItData.map((e)=>{
  //   return parseFloat(e.amount_incl_tax)
  // })

  const gst_peding_total_ = tot_amt_gst_pending.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  // const gst_peding_total_myit = tot_my_it_gst_peding.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue,
  //   0
  // );

  const myHrmsData = paidInvoices.filter((item) => item.service_id === 10);
  const myShopData = paidInvoices.filter((item) => item.service_id === 9);
  const myPraxisData = paidInvoices.filter((item) => item.service_id === 8);
  const myVedaCourseData = paidInvoices.filter((item) => item.service_id === 1);
  const myItDataCount = myItData.length ? myItData.length : 0;

  const myHrms = {
    Pending: myHrmsData.filter((item) => item.ccav_order_status === "Pending")
      .length,
    Success: myHrmsData.filter((item) => item.ccav_order_status === "Success")
      .length,
    Aborted: myHrmsData.filter((item) => item.ccav_order_status === "Aborted")
      .length,
    Invalid: myHrmsData.filter((item) => item.ccav_order_status === "Invalid")
      .length,
    Timeout: myHrmsData.filter((item) => item.ccav_order_status === "Timeout")
      .length,
    GST_PAID: myHrmsData.filter(
      (item) =>
        item.gst_status === "Paid" && item.ccav_order_status === "Success"
    ).length,
    GST_DUE: myHrmsData.filter(
      (item) =>
        item.gst_status !== "Paid" && item.ccav_order_status === "Success"
    ).length,
  };
  const myShop = {
    Pending: myShopData.filter((item) => item.ccav_order_status === "Pending")
      .length,
    Success: myShopData.filter((item) => item.ccav_order_status === "Success")
      .length,
    Aborted: myShopData.filter((item) => item.ccav_order_status === "Aborted")
      .length,
    Invalid: myShopData.filter((item) => item.ccav_order_status === "Invalid")
      .length,
    Timeout: myShopData.filter((item) => item.ccav_order_status === "Timeout")
      .length,
    GST_PAID: myShopData.filter(
      (item) =>
        item.gst_status === "Paid" && item.ccav_order_status === "Success"
    ).length,
    GST_DUE: myShopData.filter(
      (item) =>
        item.gst_status !== "Paid" && item.ccav_order_status === "Success"
    ).length,
  };
  const myPraxis = {
    Pending: myPraxisData.filter((item) => item.ccav_order_status === "Pending")
      .length,
    Success: myPraxisData.filter((item) => item.ccav_order_status === "Success")
      .length,
    Aborted: myPraxisData.filter((item) => item.ccav_order_status === "Aborted")
      .length,
    Invalid: myPraxisData.filter((item) => item.ccav_order_status === "Invalid")
      .length,
    Timeout: myPraxisData.filter((item) => item.ccav_order_status === "Timeout")
      .length,
    GST_PAID: myPraxisData.filter(
      (item) =>
        item.gst_status === "Paid" && item.ccav_order_status === "Success"
    ).length,
    GST_DUE: myPraxisData.filter(
      (item) =>
        item.gst_status !== "Paid" && item.ccav_order_status === "Success"
    ).length,
  };
  const myVedaCourse = {
    Pending: myVedaCourseData.filter(
      (item) => item.ccav_order_status === "Pending"
    ).length,
    Success: myVedaCourseData.filter(
      (item) => item.ccav_order_status === "Success"
    ).length,
    Aborted: myVedaCourseData.filter(
      (item) => item.ccav_order_status === "Aborted"
    ).length,
    Invalid: myVedaCourseData.filter(
      (item) => item.ccav_order_status === "Invalid"
    ).length,
    Timeout: myVedaCourseData.filter(
      (item) => item.ccav_order_status === "Timeout"
    ).length,
    GST_PAID: myVedaCourseData.filter(
      (item) =>
        item.gst_status === "Paid" && item.ccav_order_status === "Success"
    ).length,
    GST_DUE: myVedaCourseData.filter(
      (item) =>
        item.gst_status !== "Paid" && item.ccav_order_status === "Success"
    ).length,
  };
  const myIt = {
    Pending: myItData.filter((item) => item.ccav_order_status === "Pending")
      .length,
    Success: myItData.filter((item) => item.ccav_order_status === "Success")
      .length,
    Aborted: myItData.filter((item) => item.ccav_order_status === "Aborted")
      .length,
    Invalid: myItData.filter((item) => item.ccav_order_status === "Invalid")
      .length,
    Timeout: myItData.filter((item) => item.ccav_order_status === "Timeout")
      .length,
    GST_PAID: myItData.filter(
      (item) =>
        item.gst_status === "Paid" && item.ccav_order_status === "Success"
    ).length,
    GST_DUE: myItData.filter(
      (item) =>
        item.gst_status !== "Paid" && item.ccav_order_status === "Success"
    ).length,
  };

  res.status(200).json({
    myHrms,
    myShop,
    myVedaCourse,
    myPraxis,
    myIt,
    success_orders,
    total_order_amount: total_order_amount?.toFixed(2),
    gst_paid_total_: gst_paid_total_?.toFixed(2),
    gst_peding_total_: gst_peding_total_?.toFixed(2),
  });
};
module.exports = {
  getCorporateCustData,
  createCorpProformaInv,
  getAllInvoiceCust,
  updatePaidInvoice,
  checkOrders,
  getOrderDetails,
  getOrderInvoices,
};
