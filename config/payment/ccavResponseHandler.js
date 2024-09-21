var http = require("http"),
  fs = require("fs"),
  ccav = require("./ccavutil.js"),
  crypto = require("crypto"),
  qs = require("querystring");

const axios = require("axios");

const db = require("../../config/db.js");

exports.postRes = function (request, response) {
  var ccavEncResponse = "",
    ccavResponse = "",
    workingKey = "B4E910BBC714BFAB0695086C999F1C9F", //Put in the 32-Bit key shared by CCAvenues.
    ccavPOST = "";

  //Generate Md5 hash for the key and then convert in base64 string
  var md5 = crypto.createHash("md5").update(workingKey).digest();
  var keyBase64 = Buffer.from(md5).toString("base64");

  //Initializing Vector and then convert in base64 string
  var ivBase64 = Buffer.from([
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x0c, 0x0d, 0x0e, 0x0f,
  ]).toString("base64");

  var encryption = request.body.encResp;
  ccavResponse = ccav.decrypt(encryption, keyBase64, ivBase64);
  // response.send(ccavResponse)
  const urlSearchParams = new URLSearchParams(ccavResponse);

  // Convert URLSearchParams to a JSON object
  const jsonObject = {};
  urlSearchParams.forEach((value, key) => {
    jsonObject[key] = value;
  });

  // Log the JSON object
  const strData = JSON.stringify(jsonObject, null, 2);
  const data = JSON.parse(strData);

  console.log(data, "parsed data");

  const params_5_parsed_data = JSON.parse(data.merchant_param5);
  console.log(params_5_parsed_data, "params_5_parsed_data");

  db.query(
    `insert into main_admin_db.ccav_res_payment_details
  (order_id,currency,amount,billing_name,
    billing_address,billing_city,billing_state,billing_zip,billing_tel,billing_email,ccav_order_no,
    tracking_id,bank_ref_no,order_status,failure_msg,payment_mode,
    card_name,status_code,status_message,retry,trans_date,
    response_code,mer_param1,mer_param2,mer_param3,mer_param4,mer_param5)
   values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.order_id,
      data.currency,
      data.amount,
      data.billing_name,
      data.billing_address,
      data.billing_city,
      data.billing_state,
      data.billing_zip,
      data.billing_tel,
      data.billing_email,
      request.body.orderNo,
      data?.tracking_id,
      data?.bank_ref_no,
      data?.order_status,
      data?.failure_message,
      data?.payment_mode,
      data?.card_name,
      data?.status_code,
      data?.status_message,
      data?.retry,
      data?.trans_date,
      data?.response_code,
      data?.merchant_param1,
      data?.merchant_param2,
      data?.merchant_param3,
      data?.merchant_param4,
      data?.merchant_param5,
    ],
    (err, result) => {
      if (err) console.log(err);
      else {
        var newText = data?.merchant_param1.split("-")[1];
        var checkText = newText.trim().split(" ")[0];
        if (checkText.toLowerCase() === "myit") {
          db.query(
            `update main_admin_db.myit_all_ticket_customers set ticket_log_date_time = ?, ccav_tracking_id = ?,ccav_bank_ref_no= ?,ccav_order_status= ?,ccav_failure_msg= ?,ccav_payment_mode= ?,
            ccav_card_name= ?,ccav_status_code= ?,ccav_status_message= ?,ccav_retry= ?,ccav_trans_date= ?,
            ccav_response_code = ? where ticket_id = ? and mail = ?`,
            [
              data?.trans_date,
              data?.tracking_id,
              data?.bank_ref_no,
              data?.order_status,
              data?.failure_message,
              data?.payment_mode,
              data?.card_name,
              data?.status_code,
              data?.status_message,
              data?.retry,
              data?.trans_date,
              data?.response_code,
              data?.merchant_param3,
              data?.billing_email,
            ],
            (err, result) => {
              if (err) console.log(err);
              else {
                console.log(data.order_id);
                response.render("success", {
                  id: data.order_id,
                  type: checkText.toLowerCase(),
                });
              }
            }
          );
        } else if (checkText.toLowerCase() === "myshop") {
          db.query(
            "update main_admin_db.myshop_indi_cust_ids set ccav_order_status = ?,coupon_id = ?,gstin = ? where order_id = ?",
            [
              data?.order_status,
              data?.merchant_param4,
              params_5_parsed_data.gstin,
              data?.order_id,
            ],
            (err, result) => {
              if (err) console.log(err);
              else
                response.render("success", {
                  id: data.order_id,
                  type: checkText.toLowerCase(),
                });
            }
          );
        } else if (checkText.toLowerCase() === "praxis") {
          db.query(
            "update main_admin_db.praxis_indi_cust_ids set ccav_order_status = ? where order_id = ?",
            [data?.order_status, data?.order_id],
            (err, result) => {
              if (err) console.log(err);
              else
                response.render("success", {
                  id: data.order_id,
                  type: checkText.toLowerCase(),
                });
            }
          );
        } else if (checkText.toLowerCase() === "myveda") {
          console.log("Good");
          db.query(
            "update main_admin_db.myveda_indi_cust_ids set ccav_order_status = ?,amount = ? where order_id = ?",
            [data?.order_status, data?.merchant_param3, data?.order_id],
            (err, result) => {
              if (err) console.log(err);
              else
                response.render("success", {
                  id: data.order_id,
                  type: checkText.toLowerCase(),
                });
            }
          );
        } else if (checkText.toLowerCase() === "myhrms") {
          db.query(
            "update main_admin_db.myhrms_indi_cust_ids set ccav_order_status = ?,amount = ? where order_id = ?",
            [data?.order_status, data?.merchant_param3, data?.order_id],
            (err, result) => {
              if (err) console.log(err);
              else
                response.render("success", {
                  id: data.order_id,
                  type: checkText.toLowerCase(),
                });
            }
          );
        } else {
          console.log("NO API TYPE FOUND");
        }
      }
    }
  );
};
