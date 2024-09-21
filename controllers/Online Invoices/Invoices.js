const db = require("../../config/db");
const fs = require("fs");
const nodemailer = require("nodemailer");
const { taxInvoiceEntry } = require("../Offline Invoices/InvoiceFunctions");
const myhrmsCustomer = async (data, dueDate) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const today1 = yyyy + "-" + mm + "-" + dd;
  let domain_id = data?.cust_id.toLowerCase() + ".myhrms";

  domain_id.toLowerCase();
  const insertData = {
    cust_id: data?.cust_id,
    mail: data?.billing_email,
    domain_id: domain_id?.toLowerCase(),
    country: data?.country,
    state: data?.state,
    city: data?.city,
    pincode: data?.pincode,
    address: data?.billing_address,
    number: data?.billing_tel,
    start_date: today1,
    end_date: dueDate,
    name: data?.billing_name,
    order_id: data?.order_id,
    ccav_order_status: "Pending",
    duration: data?.duration,
    amount: data?.inv_amount,
    tax: data?.tax_percent,
    hsn_hac: data?.hsnHacData.hsn_code,
    amount_incl_tax: data?.inv_incl_tax_amount,
    coupon_id: data?.coupon_id,
    gstin: data?.cust_gstin,
    tax_amount: data?.tax_amount,
    comp_name: data?.comp_name,
    reg_type: "Online",
    ip_address: data?.mer_param2,
  };

  const resultData = await new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM main_admin_db.myhrms_indi_cust_ids where cust_id = ?",
      [data?.cust_id],
      (errC, resultC) => {
        if (errC) {
          console.log(errC);
          reject(errC);
        } else {
          if (!resultC.length) {
            db.query(
              "insert into main_admin_db.myhrms_indi_cust_ids set ?",
              [insertData],
              (err, result) => {
                if (err) {
                  reject(err);
                  console.log(err);
                } else {
                  resolve({ success: true, data: result });
                }
              }
            );
          }
        }
      }
    );
  });

  return resultData;
};
const myshopCustomer = async (data, dueDate) => {
  try {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    const today1 = yyyy + "-" + mm + "-" + dd;
    let domain_id = data?.cust_id.toLowerCase() + ".myshop";
    const insertData = {
      cust_id: data?.cust_id,
      mail: data?.billing_email,
      domain_id: domain_id,
      country: data?.country,
      state: data?.state,
      city: data?.city,
      pincode: data?.pincode,
      address: data?.billing_address,
      number: data?.billing_tel,
      start_date: today1,
      end_date: dueDate,
      name: data?.billing_name,
      order_id: data?.order_id,
      ccav_order_status: "Pending",
      duration: data?.duration,
      amount: data?.inv_amount,
      tax: data?.tax_percent,
      hsn_hac: data?.hsnHacData.hsn_code,
      amount_incl_tax: data?.inv_incl_tax_amount,
      coupon_id: data?.coupon_id,
      gstin: data?.cust_gstin,
      tax_amount: data?.tax_amount,
      company_name: data?.comp_name,
      reg_type: "Online",
      ip_address: data?.mer_param2,
    };

    const resultData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM main_admin_db.myshop_indi_cust_ids where cust_id = ?",
        [data?.cust_id],
        (errC, resultC) => {
          if (errC) {
            console.log(errC);
            reject(errC);
          } else {
            if (!resultC.length) {
              db.query(
                "insert into main_admin_db.myshop_indi_cust_ids set ?",
                [insertData],
                (err, result) => {
                  if (err) {
                    reject(err);
                    console.log(err);
                  } else {
                    resolve({ success: true, data: result });
                  }
                }
              );
            }
          }
        }
      );
    });

    return resultData;
  } catch (error) {
    console.log(error);
  }
};
const sendToEmail = async (data) => {
  try {
    const sendEmail = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM main_admin_db.email_temp_online_proforma_invoices where id = 1",
        (err, result) => {
          if (err) {
            reject(err);
            console.log(err);
          } else {
            const { subject, url, message, caution, signature } = result[0];

            const output = `
                          <h3>Dear ${data?.name} </h3>
                          <p>${message}.</p>
                          <p><b>URL</b> : <a href="${url}" target="_blank">${url}</a></p>
                          <p><b>Order-ID :</b> ${data?.order_id}</p>
                          <p><b>Subscribed Service : </b> ${data?.service_name}</p>
                          <p>${caution}</p>
                          <p>${signature}</p>
                        `;

            db.query("SELECT * FROM `myveda-db`.email_srv", (err, result) => {
              if (err) {
                console.log(err);
              } else {
                let host1 = result[0]?.host;
                let port1 = result[0]?.port;
                let user1 = result[0]?.auth_uid;
                let pass1 = result[0]?.auth_pass;
                let fromEmail = result[0]?.from_email;
                let bccEmail = result[0]?.bcc_email;
                let transporter = nodemailer.createTransport({
                  host: host1,
                  port: port1,
                  secure: true, // true for 465, false for other p orts
                  auth: {
                    user: user1, // generated ethereal user
                    pass: pass1, // generated ethereal password
                  },
                });

                // send mail with defined transport object
                let info = transporter
                  .sendMail({
                    from: `"" ${fromEmail}`, // sender address
                    to: data?.toEmail, // list of receivers
                    subject: subject, // Subject line
                    bcc: bccEmail,
                    html: output, // html body
                    attachments: [
                      {
                        filename: data?.file_name,
                        content: data?.pdf,
                      },
                    ],
                  })
                  .then(() => {
                    console.log("Email Sent : ", data?.name);
                    resolve({ success: true });
                  });
              }
            });
          }
        }
      );
    });

    return sendEmail;
  } catch (error) {
    console.log(error);
  }
};
const createProforma = async (req, res) => {
  // create proforma invoice

  try {
    const {
      dataUri,
      state,
      gst,
      ccavResDetails,
      invoice_no,
      dueDate,
      otherData,
      data,
      hsnData,
    } = req.body;

    const pdfBufferData = Buffer.from(dataUri?.split(",")[1], "base64");
    const {
      service_name,
      service_id,
      order_id,
      order_date,
      inv_date,
      cust_id,
      billing_name,
      billing_tel,
      billing_address,
      billing_email,
      coupon_id,
      mrp_amount,
      inv_amount,
      inv_incl_tax_amount,
      cust_gstin,
      mer_amount,
      invoice_gen_type,
      dis_percent,

      dis_amount,
      discounted_amount,
      tax_amount,
      tax_percent,
      remain_amount,
      invoice_type,
      invoice_status,
      cust_type,
      tax_applicability,
      hsnHacData,
      duration,
      country,
      contactcode,
      pincode,
      city,
      comp_name,
    } = data;

    const file_name_ = billing_email + "_" + order_id + ".pdf";

    const insertData = {
      service_name,
      service_id,
      order_id,
      order_date,
      inv_date,
      cust_id,
      billing_name,
      billing_tel,
      billing_address,
      billing_email,
      services: service_name,
      coupon_id,
      mrp_amount,
      inv_amount,
      inv_incl_tax_amount,
      cust_gstin,
      mer_amount,
      invoice_gen_type,
      dis_percent,
      dis_amount,
      discounted_amount,
      tax_amount,
      tax_percent,
      remain_amount,
      invoice_type,
      invoice_status,
      cust_type,
      tax_applicability,
      duration,
      country,
      pincode,
      hsn_sac: hsnData?.hsn_code,
      city,
      state: data?.state,
      invoice_no,
      place_of_supply: otherData.inter_state,
      sales_type: otherData.sales_type,
      file_name: file_name_,
    };

    const getFolderPath = () => {
      if (service_id == 10) {
        return `./myhrms_invoices/${file_name_}`;
      } else if (service_id == 9) {
        return `./myshop_invoices/${file_name_}`;
      }
    };
    const folderPath = getFolderPath();
    const createProformaInv = await new Promise((resolve, reject) => {
      fs.writeFile(folderPath, pdfBufferData, (err) => {
        if (err) {
          reject(err);
          console.log(err, " : error while creating online proforma invoice");
        } else {
          db.query(
            "select * from main_admin_db.proforma_invoices_myvedait where cust_id = ?",
            [cust_id],
            (errC, resultC) => {
              if (errC) console.log(errC);
              else {
                if (!resultC.length) {
                  db.query(
                    "insert into main_admin_db.proforma_invoices_myvedait set ?",
                    [insertData],
                    (err2, result2) => {
                      if (err2) console.log(err2);
                      else {
                        console.log(result2);
                        resolve({ success: true, data: result2 });
                      }
                    }
                  );
                }
              }
            }
          );
        }
      });
    });

    const getCustomerData = await new Promise((resolve, reject) => {
      try {
        if (createProformaInv.success) {
          async function getD() {
            if (service_id == 10) {
              const dataF = await myhrmsCustomer(data, dueDate);
              resolve(dataF);
            } else if (service_id == 9) {
              const dataF = await myshopCustomer(data, dueDate);

              resolve(dataF);
            }
          }
          getD();
        } else {
          resolve({ success: false });
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });

    const emailC = {
      toEmail: data?.billing_email,
      order_id: data?.order_id,
      name: data?.billing_name,
      pdf: pdfBufferData,
      file_name: file_name_,
      service_name: data?.service_name,
    };

    async function sendEmail() {
      if (getCustomerData.success) {
        const resultData = await sendToEmail(emailC);

        res.status(200).send({ success: resultData.success });
      }
    }
    sendEmail();
  } catch (error) {
    console.log(error);
  }
};

const sendMailtoCustomer = async (id, data) => {
  try {
    const getMailData = await new Promise((resolve, reject) => {
      if (id == 10) {
        db.query(
          "SELECT * FROM main_admin_db.email_temp_myhrms_pmt_update",
          (errTemp, resTemp) => {
            if (errTemp) {
              reject(errTemp);
              console.log(errTemp);
            } else {
              const { subject, url, message, caution, signature } = resTemp[0];
              resolve({ subject, url, message, caution, signature });
            }
          }
        );
      } else {
        db.query(
          "SELECT * FROM main_admin_db.email_temp_myshop_pmt_update",
          (errTemp, resTemp) => {
            if (errTemp) {
              reject(errTemp);
              console.log(errTemp);
            } else {
              const { subject, url, message, caution, signature } = resTemp[0];
              resolve({ subject, url, message, caution, signature });
            }
          }
        );
      }
    });

    const { subject, url, message, caution, signature } = getMailData;
    const sendMail = await new Promise((resolve, reject) => {
      const output = `
      <h3>Dear ${data?.name} </h3>
      <p>${message}.</p>
      <p><b>URL</b> : <a href="${url + "/" + data?.cust_id}" target="_blank">${
        url + "/" + data?.cust_id
      }</a></p>
      <p><b>Customer ID :</b> ${data?.cust_id}</p>
      <p>${caution}</p>
      <p>${signature}</p>
     `;
      db.query("SELECT * FROM `myveda-db`.email_srv", (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(result);
          let host1 = result[0]?.host;
          let port1 = result[0]?.port;
          let user1 = result[0]?.auth_uid;
          let pass1 = result[0]?.auth_pass;
          let fromEmail = result[0]?.from_email;
          let bccEmail = result[0]?.bcc_email;
          let transporter = nodemailer.createTransport({
            host: host1,
            port: port1,
            secure: true, // true for 465, false for other p orts
            auth: {
              user: user1, // generated ethereal user
              pass: pass1, // generated ethereal password
            },
          });

          // send mail with defined transport object
          let info = transporter
            .sendMail({
              from: `"" ${fromEmail}`, // sender address
              to: data?.mail, // list of receivers
              subject: subject, // Subject line
              bcc: bccEmail,
              html: output, // html body
              attachments: [
                {
                  filename: data?.file_name,
                  content: data?.pdf,
                },
              ],
            })
            .then(() => {
              resolve({ success: true });
            });
        }
      });
    });
    return sendMail;
  } catch (error) {
    console.log(error);
  }
};

// update customer

const updateCustomerTable = async (id, data, cust_id) => {
  try {
    const updateT = await new Promise((resolve, reject) => {
      if (id == 10) {
        db.query(
          "update main_admin_db.myhrms_indi_cust_ids set ? where cust_id = ?",
          [data, cust_id],
          (errD, resultD) => {
            if (errD) {
              reject(errD);
              console.log(errD);
            } else {
              resolve({ success: true });
            }
          }
        );
      } else if (id == 9) {
        db.query(
          "update main_admin_db.myshop_indi_cust_ids set ? where cust_id = ?",
          [data, cust_id],
          (errD, resultD) => {
            if (errD) {
              reject(errD);
              console.log(errD);
            } else {
              resolve({ success: true });
            }
          }
        );
      }
    });

    return updateT;
  } catch (error) {
    console.log(error);
  }
};
const updateProformaInv = async (req, res) => {
  try {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    const today1 = yyyy + "-" + mm + "-" + dd;
    const { data, due_date, formData, dataUri } = req.body;
    const updateData = { ...data, ...formData };
    const newUpdateStatus = {
      ...updateData,
      invoice_status: 1,
    };

    const getFolderPath = () => {
      if (data?.service_id == 10) {
        return `./myhrms_invoices/${data?.file_name}`;
      } else if (data?.service_id == 9) {
        return `./myshop_invoices/${data?.file_name}`;
      }
    };
    const folderPath = getFolderPath();
    const pdfBufferData = Buffer.from(dataUri?.split(",")[1], "base64");
    const updateResult = await new Promise((resolve, reject) => {
      fs.writeFile(folderPath, pdfBufferData, (err) => {
        if (err)
          console.log(
            err,
            " : error while updating proforma online invoice pdf"
          );
        else {
          db.query(
            "SELECT * FROM main_admin_db.proforma_invoices_myvedait where cust_id = ?",
            [data?.cust_id],
            (errUp, resultUp) => {
              if (errUp) console.log(errUp);
              else {
                const preData = resultUp[0];

                const newUpData = {
                  ...preData,
                  ...formData,
                  invoice_status: 1,
                };

                db.query(
                  "UPDATE main_admin_db.proforma_invoices_myvedait set ? WHERE invoice_no = ?",
                  [newUpData, data?.invoice_no],
                  (err, result) => {
                    if (err) {
                      reject(err);
                    } else {
                      const { city, state, pincode, country, ...newUpD } =
                        newUpData;
                      console.log(result);
                      resolve(newUpD);
                    }
                  }
                );
              }
            }
          );
        }
      });
    });

    const newUpdatedData = {
      ...updateResult,
      payment_status: newUpdateStatus?.invoice_type,
      cust_gstin: data?.cust_gstin,
      payment_date_time: newUpdateStatus?.ccav_trans_date,
    };

    if (
      newUpdateStatus.invoice_type === "Paid" ||
      newUpdateStatus.invoice_type !== "Paid"
    ) {
      const { success } = await taxInvoiceEntry(newUpdatedData);
      if (success && newUpdateStatus.invoice_type === "Paid") {
        const updateMyRow = {
          gstin: data?.cust_gstin,
          start_date: today1,
          end_date: due_date,
          ccav_order_status: "Success",
        };
        const getResutCust = await updateCustomerTable(
          data?.service_id,
          updateMyRow,
          data?.cust_id
        );
        if (getResutCust.success) {
          db.query(
            "delete from main_admin_db.proforma_invoices_myvedait where invoice_no = ?",
            [data?.invoice_no],
            (errRm, resultRm) => {
              if (errRm)
                console.log(
                  errRm,
                  " : error while removing Updated Proforma Invoice."
                );
              else {
                async function getResult() {
                  const emailData = {
                    name: data?.billing_name,
                    cust_id: data?.cust_id,
                    pdf: pdfBufferData,
                    file_name: data?.file_name,
                    mail: data?.billing_email,
                  };
                  const getDF = await sendMailtoCustomer(
                    data?.service_id,
                    emailData
                  );
                  if (getDF.success) {
                    res.status(200).send({ success: true });
                  }
                }
                getResult();
              }
            }
          );
        }
      } else {
        db.query(
          "delete from main_admin_db.proforma_invoices_myvedait where invoice_no = ?",
          [data?.invoice_no],
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
    console.log(error);
  }
};

module.exports = {
  createProforma,
  updateProformaInv,
};
