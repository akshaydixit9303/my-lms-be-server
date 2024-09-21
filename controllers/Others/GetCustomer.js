const db = require("../../config/db");

const getIndividualCustomers = async (id) => {
  try {
    const getMyData = await new Promise((resolve, reject) => {
      if (id == 1) {
        db.query(
          "SELECT *, CONCAT(full_name, ' ', surname) AS name, email as mail FROM main_admin_db.myveda_indi_cust_ids WHERE ccav_order_status = ?",
          ["Success"],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting MyVeda E-Learning services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else if (id == 8) {
        db.query(
          "SELECT * FROM main_admin_db.praxis_indi_cust_ids WHERE ccav_order_status = ?",
          ["Success"],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting Praxis services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else if (id == 9) {
        db.query(
          "SELECT * FROM main_admin_db.myshop_indi_cust_ids WHERE ccav_order_status = ?",
          ["Success"],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting MyShop services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else if (id == 10) {
        db.query(
          "SELECT * FROM main_admin_db.myhrms_indi_cust_ids WHERE ccav_order_status = ?",
          ["Success"],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting MyHrms services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else {
        db.query(
          "SELECT *, spocName as name, email as mail, contact as number, GSTIN as gstin FROM main_admin_db.offline_cust_reg_indi where service_id = ?",
          [parseInt(id)],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting other services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      }
    });

    return getMyData;
    // Combine all results into one array
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const getCustomerData = async (req, res) => {
  try {
    const { id, serv_id } = req.params;
    const getData = await new Promise((resolve, reject) => {
      switch (id) {
        case "Corp":
          db.query(
            "SELECT *,spocName as name, spocEmail as mail, spocContact as number, GSTIN as gstin FROM main_admin_db.offline_cust_reg_corp where service_id = ?",
            [parseInt(serv_id)],
            (err, result) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                resolve({ success: true, data: result });
              }
            }
          );
          break;

        case "Indi":
          async function getDD() {
            const dateG = await getIndividualCustomers(serv_id);
            resolve({ success: true, data: dateG });
          }
          getDD();

          break;

        default:
          resolve({ success: false, data: [] });
      }
    });

    res.status(200).send(getData);
  } catch (error) {
    console.log(error, " : error while getting regsitered customers.");
  }
};

const updateIndiData = async (
  firstName,
  lastName,
  city,
  state,
  gstin,
  spocContact,
  country,
  pincode,
  address,
  id,
  company,
  cust_id
) => {
  try {
    const getMyData = await new Promise((resolve, reject) => {
      if (id == 1) {
        const newData = {
          full_name: firstName,
          surname: lastName,
          country,
          state,
          city,
          gstin,
          number: spocContact,
          address,
          pincode,
        };
        db.query(
          "update main_admin_db.myveda_indi_cust_ids set ? WHERE cust_id = ?",
          [newData, cust_id],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting MyVeda E-Learning services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else if (id == 8) {
        const newData = {
          name: firstName + " " + lastName,

          country,
          state,
          city,

          number: spocContact,
          address,
          pincode,
        };
        db.query(
          "update main_admin_db.praxis_indi_cust_ids set ? WHERE cust_id = ?",
          [newData, cust_id],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting MyVeda E-Learning services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else if (id == 9) {
        const newData = {
          name: firstName + " " + lastName,

          country,
          state,
          city,
          gstin,
          number: spocContact,
          address,
          pincode,
        };
        db.query(
          "update main_admin_db.myshop_indi_cust_ids set ? WHERE cust_id = ?",
          [newData, cust_id],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting MyVeda E-Learning services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else if (id == 10) {
        const newData = {
          name: firstName + " " + lastName,

          country,
          state,
          city,
          gstin,
          number: spocContact,
          address,
          pincode,
        };
        db.query(
          "update main_admin_db.myhrms_indi_cust_ids set ? WHERE cust_id = ?",
          [newData, cust_id],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting MyVeda E-Learning services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else {
        const newData = {
          spocName: firstName + " " + lastName,

          country,
          state,
          city,
          GSTIN: gstin,
          contact: spocContact,
          address,
          pincode,
        };

        db.query(
          "update main_admin_db.offline_cust_reg_indi set ? where cust_id = ?",
          [newData, cust_id],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting other services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      }
    });

    return getMyData;
    // Combine all results into one array
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
const updateCustomerData = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      city,
      state,
      gstin,
      spocContact,
      country,
      pincode,
      address,
      serviceId,
      company,
      custType,
      cust_id,
      webPortal,
      spocName,
    } = req.body;

    if (custType == 1) {
      async function myData() {
        const updteD = await updateIndiData(
          firstName,
          lastName,
          city,
          state,
          gstin,
          spocContact,
          country,
          pincode,
          address,
          serviceId,
          company,
          cust_id
        );

        res.status(200).send({ success: true, data: updteD });
      }
      myData();
    } else {
      const newData = {
        companyName: company,
        webPortal: webPortal,
        GSTIN: gstin,
        spocContact,
        state,
        city,
        pincode,
        address,
        country,
        spocName,
      };
      db.query(
        "update main_admin_db.offline_cust_reg_corp set ? where cust_id = ?",
        [newData, cust_id],
        (err, result) => {
          if (err) console.log(err);
          else {
            res
              .status(200)
              .send({ success: true, data: "! Updated Successfully." });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteIndiCustomer = async (id, cust_id) => {
  try {
    const getMyData = await new Promise((resolve, reject) => {
      if (id == 1) {
        db.query(
          "delete from main_admin_db.myveda_indi_cust_ids WHERE cust_id = ?",
          [cust_id],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting MyVeda E-Learning services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else if (id == 8) {
        db.query(
          "delete from main_admin_db.praxis_indi_cust_ids WHERE cust_id = ?",
          [cust_id],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting MyVeda E-Learning services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else if (id == 9) {
        db.query(
          "delete from main_admin_db.myshop_indi_cust_ids WHERE cust_id = ?",
          [cust_id],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting MyVeda E-Learning services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else if (id == 10) {
        db.query(
          "delete from main_admin_db.myhrms_indi_cust_ids WHERE cust_id = ?",
          [cust_id],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting MyVeda E-Learning services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else {
        db.query(
          "delete from main_admin_db.offline_cust_reg_indi where cust_id = ?",
          [cust_id],
          (err, result) => {
            if (err) {
              console.log(
                err,
                " : error while getting other services customer data"
              );
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      }
    });

    return getMyData;
    // Combine all results into one array
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { cust_type } = req.params;
    const { data } = req.body;
    console.log(data, cust_type);

    const deleteD = await new Promise((resolve, reject) => {
      switch (cust_type) {
        case "1":
          async function delD() {
            const deleteIndiCust = await deleteIndiCustomer(
              data?.serv_id,
              data?.cust_id
            );

            resolve(deleteIndiCust);
          }
          delD();
          break;
        case "2":
          db.query(
            "delete from main_admin_db.offline_cust_reg_corp where cust_id = ?",
            [data?.cust_id],
            (err, result) => {
              if (err) {
                console.log(
                  err,
                  " : error while getting other services customer data"
                );
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
          break;

        default:
          return false;
          break;
      }
    });

    res.status(200).send({ success: true, data: deleteD });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getCustomerData,
  updateCustomerData,
  deleteCustomer,
};
