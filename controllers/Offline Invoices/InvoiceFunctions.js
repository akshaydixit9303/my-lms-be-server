const db = require("../../config/db");
const fs = require("fs");
const createInvRow = (
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
) => {
  const inv_name = invoice_num.replace("/", "-");
  fs.writeFileSync(`./offline_invoices/${inv_name}.pdf`, pdf);
  db.query(
    `insert into \`main_admin_db\`.proforma_invoices_myvedait (service_id,
        service_name,
        order_id,
        cust_id,
        course_id,
        order_date,
        invoice_no,
        inv_date,
        billing_name,
        billing_tel,
        billing_email,
        billing_address,
        services,
          mer_amount,
          invoice_gen_type,
          mrp_amount,
          inv_amount,
          inv_incl_tax_amount,
          dis_percent,
          dis_amount,
          discounted_amount,
          tax_amount,
          tax_percent,
          hsn_sac,
          remain_amount,
          file_name,
          invoice_type,
          invoice_status,
          cust_type,
          po_number,
          po_remark,
          inv_validity,
          pmt_tc_type,
          pmt_tc_remark,
          part_pmt_percent,
          place_of_supply,
          sales_type,
          tax_applicability
          ) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      serviceRow.id,
      serviceRow.category_title,
      order_id,
      cust_data?.cust_id,
      course_id ? course_id : "",
      presentDate,
      invoice_num,
      presentDate,
      cust_data?.spocName,
      cust_data?.spocContact,
      cust_data?.spocEmail,
      cust_data?.address,
      serviceRow.category_title,
      amount,
      "Offline",
      parseInt(course_fee),
      amount,
      inv_incl_tax_amt,
      dis_per,
      dis_value,
      amt_after_dis,
      taxAmount,
      parseInt(appliedTax),
      hsn_code,
      remain_amt,
      `${inv_name}.pdf`,
      "Proforma",
      0,
      "Corporate",
      formData.po_number,
      formData.po_remark,
      formData.inv_validity,
      formData.pmt_tc_select,
      formData.pmt_tnc_remark,
      formData.pmt_tc_percent ? parseInt(formData.pmt_tc_percent) : 0,
      formData.place_of_supply,
      formData.sales_type,
      tax_applicability,
    ],
    (err1, result1) => {
      if (err1)
        console.log(
          err1,
          " : error while creating row in offine corporate customer invoice"
        );
      else {
        return res.status(200).send({
          success: true,
          message: "! Proforma Invoice Created Successfully.",
        });
      }
    }
  );
};

// Function to create invoice entry
const taxInvoiceEntry = async (data) => {
  try {
    const {
      po_remark,
      invoice_status,
      invoice_type,
      inv_validity,
      pmt_tc_type,
      pmt_tc_remark,
      part_pmt_percent,
      id,
      ...newData
    } = data;

    const existingInvoice = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM main_admin_db.tax_invoice_order_myvedait WHERE invoice_no = ?",
        [data?.invoice_no],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    if (!existingInvoice.length) {
      console.log("good");
      const insertResult = await new Promise((resolve, reject) => {
        db.query(
          "INSERT INTO main_admin_db.tax_invoice_order_myvedait SET ?",
          [newData], // Use newData instead of data
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });

      return { success: true, insertResult };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log(error, ": error while creating invoice entry");
    throw error;
  }
};

const createCustomer = async (data, res, course_id) => {
  try {
    const createCourseId = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM \`myveda-db\`.add_courses where course_id = ?`,
        [course_id],
        (err, result) => {
          if (err) console.log(err);
          else {
            const { duration } = result[0];
            // Function to format date as yyyy-mm-dd
            function formatDate(date) {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              return `${year}-${month}-${day}`;
            }

            // Get today's date
            const today = new Date();
            const startDate = formatDate(today);

            // Get the date 90 days from today
            const futureDate = new Date();
            futureDate.setDate(today.getDate() + parseInt(duration));
            const endDate = formatDate(futureDate);

            console.log("Start Date:", startDate);
            console.log("End Date:", endDate);

            db.query(
              "insert into `myveda-db`.corp_cust_course_ids (cust_id,course_id,start_date,end_date) values (?,?,?,?)",
              [data?.cust_id, course_id, startDate, endDate],
              (errM, resultM) => {
                if (errM) {
                  console.log(errM);
                  reject(err);
                } else {
                  const newInsertData = {
                    ...data,
                    start_date: startDate,
                    end_date: endDate,
                  };
                  resolve(newInsertData);
                }
              }
            );
          }
        }
      );
    });

    const getStaus = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `myveda-db`.comp_cust_req_db where cust_id = ?",
        [data?.cust_id],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (!result.length) {
              db.query(
                "insert into `myveda-db`.comp_cust_req_db set ?",
                [createCourseId],
                (err2, result2) => {
                  if (err2)
                    console.log(
                      err2,
                      " : creating customer row data in comp_cust_req_db "
                    );
                  else {
                    console.log(result2, "inserted data");
                    resolve(true);
                  }
                }
              );
            } else {
              resolve(true);
            }
          }
        }
      );
    });

    return { success: getStaus };
  } catch (error) {
    console.log(error, ": error while creating customer");
  }
};
async function allOrderInvoices(data) {
  const paidInvoices = await new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM main_admin_db.tax_invoice_order_myvedait",
      [data?.invoice_no],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });

  console.log(paidInvoices);
}
module.exports = {
  createInvRow,
  createCustomer,
  taxInvoiceEntry,

  allOrderInvoices,
};
