const db = require("../../config/db");

const getCustomerData = async (req, res) => {
  try {
    const getCustData = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM `myshop-db`.cust_reg", (err, result) => {
        if (err) {
          console.log(err, " : error while getting data customer reg");
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    res.status(200).send({ success: true, data: getCustData });
  } catch (error) {
    console.log(error, " : Error MYHRMS Controllers in MYHRMS Modules");
  }
};

const getRoles = async (req, res) => {
  try {
    const { id } = req.params;
    const getRolesData = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM ${id}_myshop.emp_roles where role_status = 1`,
        (err, result) => {
          if (err) {
            console.log(err, " : error while getting data role Data reg");
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    res.status(200).send({ success: true, data: getRolesData });
  } catch (error) {
    console.log(error, " : Error MYHRMS Controllers in MYHRMS Employee Roles");
  }
};

const getAllPermissions = async (req, res) => {
  const { id, role_code } = req.params;
  const res_ = await new Promise((resolve, reject) => {
    db.query(
      `select * from ${id}_myshop.roles_menu_mgmt where emp_role_code = ?`,
      [parseInt(role_code)],
      (err2, result2) => {
        if (err2) {
          console.log(err2, " : err2or while role_mgmt getting data.");
          reject(err2);
        } else {
          db.query(
            `select * from ${id}_myshop.roles_sub_menu_mgmt where emp_role_code = ?`,
            [parseInt(role_code)],
            (err3, result3) => {
              if (err3) {
                console.log(err3, " : err3or while role_mgmt getting data.");
                reject(err3);
              } else {
                resolve({
                  menu_items: result2,
                  sub_menu_items: result3,
                });
              }
            }
          );
        }
      }
    );
  });

  res.status(200).send(res_);
};
const updateSubMenu = async (req, res) => {
  try {
    const { custID, role, sub_menu } = req.body;
    const updateData = await new Promise((resolve, reject) => {
      sub_menu.forEach((item, index, myarr) => {
        db.query(
          `update ${custID}_myshop.roles_sub_menu_mgmt set  sub_menu_status = ? 
        where emp_role_code = ? and sub_menu_config_name = ?`,
          [item.sub_menu_status, parseInt(role), item.sub_menu_config_name],
          (err, result) => {
            if (err) {
              console.log(err, " : error while updating sub menu data");
              reject(err);
            } else {
              if (Object.is(myarr.length - 1, index)) {
                resolve(result);
              }
            }
          }
        );
      });
    });

    res.status(200).send({ success: true, data: updateData });
  } catch (error) {
    console.log(error, ": Line No. 103");
  }
};
const updateMenu = async (req, res) => {
  try {
    console.log(req.body);
    const { custID, role, menu } = req.body;
    const updateData = await new Promise((resolve, reject) => {
      menu.forEach((item, index, myarr) => {
        db.query(
          `update ${custID}_myshop.roles_menu_mgmt set  menu_status = ? 
        where emp_role_code = ? and menu_config_name = ?`,
          [item.menu_status, parseInt(role), item.menu_config_name],
          (err, result) => {
            if (err) {
              console.log(err, " : error while updating menu data");
              reject(err);
            } else {
              if (Object.is(myarr.length - 1, index)) {
                resolve(result);
              }
            }
          }
        );
      });
    });

    res.status(200).send({ success: true, data: updateData });
  } catch (error) {
    console.log(error, ": Line No. 103");
  }
};
module.exports = {
  getCustomerData,
  getRoles,
  getAllPermissions,
  updateSubMenu,
  updateMenu,
};
