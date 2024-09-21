const db = require("../../config/db");

const getAllInvoicesCustomer = async (req, res) => {
  const { id, cust_id } = req.params;
  const getAllPaidInvoice = await new Promise((resolve, reject) => {
    const query = `SELECT * FROM main_admin_db.tax_invoice_order_myvedait WHERE service_id = ? AND cust_id = ?`;
    db.query(query, [parseInt(id), cust_id], (err, result) => {
      if (err) console.log(err, " : error while getting offline invoices,");
      else {
        resolve(result);
      }
    });
  });

  const getAllProforma = await new Promise((resolve, reject) => {
    const query = `SELECT * FROM main_admin_db.proforma_invoices_myvedait WHERE service_id = ? AND cust_id = ?`;
    db.query(query, [parseInt(id), cust_id], (err, result) => {
      if (err) console.log(err, " : error while getting offline invoices,");
      else {
        // resolve(result);
        if (id == 10) {
          db.query(
            "SELECT * FROM main_admin_db.myhrms_indi_cust_ids where cust_id = ?",
            [cust_id],
            (errC, resultC) => {
              if (errC) console.log(errC);
              else {
                const pr_inv_res = result[0];
                const cust_info = resultC[0];

                const newResData = result.map((item, index) => {
                  return { ...item, ...resultC[index] };
                });

                resolve(newResData);
              }
            }
          );
        } else if (id == 9) {
          db.query(
            "SELECT * FROM main_admin_db.myshop_indi_cust_ids where cust_id = ?",
            [cust_id],
            (errC, resultC) => {
              if (errC) console.log(errC);
              else {
                const pr_inv_res = result[0];
                const cust_info = resultC[0];

                const newResData = result.map((item, index) => {
                  return { ...item, ...resultC[index] };
                });

                resolve(newResData);
              }
            }
          );
        } else {
          resolve(result);
        }
      }
    });
  });

  const allData = [...getAllPaidInvoice, ...getAllProforma];
  res.status(200).send({ success: true, data: allData });
};

const getAllDataGraph = async (req, res) => {
  const getOrdersData = await new Promise((resolve, reject) => {
    db.query(
      `SELECT tax_amount as GST_DUE, tax_paid_amount as GST_PAID,order_id as ORDER_ID
    FROM main_admin_db.tax_invoice_order_myvedait where tax_applicability = ?`,
      ["Plus-Tax"],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
  res.status(200).send({
    success: true,
    data: getOrdersData,
  });
};

const getAllDashGraphData = async (req, res) => {
  const getOrdersData = await new Promise((resolve, reject) => {
    db.query(
      `SELECT
        p.service_code as service_name,
        t.service_id as service_id,
        COUNT(DISTINCT t.order_id) AS Total_Orders
      FROM
        main_admin_db.tax_invoice_order_myvedait t
      JOIN
        main_admin_db.product_cat p ON t.service_id = p.id where t.tax_applicability = ?
      GROUP BY
        p.service_code, t.service_id`,
      ["Plus-Tax"],
      (err, result) => {
        if (err) reject(err);
        else {
          resolve(result);
        }
      }
    );
  });

  res.status(200).send({
    success: true,
    data: getOrdersData,
  });
};
module.exports = {
  getAllInvoicesCustomer,
  getAllDataGraph,
  getAllDashGraphData,
};
