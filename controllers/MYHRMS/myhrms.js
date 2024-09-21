const db = require("../../config/db");

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
const day = String(today.getDate()).padStart(2, "0");
const fs = require("fs");
const path = require("path");
const formattedDate = `${year}-${month}-${day}`;
const getCustomerData = async (req, res) => {
  try {
    const getCustData = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM `myhrms-db`.cust_reg", (err, result) => {
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
        `SELECT * FROM ${id}_myhrms.emp_roles where role_status = 1`,
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
      `select * from ${id}_myhrms.roles_menu_mgmt where emp_role_code = ?`,
      [parseInt(role_code)],
      (err2, result2) => {
        if (err2) {
          console.log(err2, " : err2or while role_mgmt getting data.");
          reject(err2);
        } else {
          db.query(
            `select * from ${id}_myhrms.roles_sub_menu_mgmt where emp_role_code = ?`,
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
          `update ${custID}_myhrms.roles_sub_menu_mgmt set  sub_menu_status = ? 
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
          `update ${custID}_myhrms.roles_menu_mgmt set  menu_status = ? 
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

const createRolePid = async (req, res) => {
  try {
    const { role, cust_id } = req.body;

    const lastNum = await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${cust_id}_myhrms.emp_roles`, (err, result) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          // const total_entry = result.length;
          const checkD = result.map((item) => item.role_code);

          const checkMax = Math.max(...checkD);
          resolve(checkMax + 1);
        }
      });
    });

    const slicedRole = role.replace(/[\s-]/g, "").slice(0, 3);
    const paddedNum =
      lastNum.toString().length < 3
        ? "0".repeat(lastNum.toString().length - 1) + lastNum
        : lastNum;

    const p_id = slicedRole?.toUpperCase() + "-" + paddedNum;
    res.status(200).json({ success: true, role_code: lastNum, p_id });
  } catch (error) {
    console.log(error);
  }
};

const getPermissionTable = async (req, res) => {
  try {
    const rowData = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM `myhrms-db`.default_emp_roles", (err, result) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(result);
        }
      });
    });
    res.status(200).json({ success: true, data: rowData });
  } catch (error) {
    console.log(error);
  }
};
const createPermission = async (req, res) => {
  try {
    const { formData, cust_id } = req.body;

    const createData = await new Promise((resolve, reject) => {
      const insertData = {
        role: formData?.role,
        role_code: formData?.role_code,
        access_temp_code: formData?.p_id,
        role_status: 1,
      };
      db.query(
        `insert into ${cust_id}_myhrms.emp_roles set ?`,
        [insertData],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(insertData);
          }
        }
      );
    });

    res.status(200).json({ success: true, data: createData });
  } catch (error) {
    console.log(error);
  }
};
const getDefaultPermission = async (req, res) => {
  try {
    const main_menu = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `myhrms-db`.default_main_menu_mgmt",
        (err, result) => {
          if (err) {
            reject(err);
            console.log(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    const sub_menu = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `myhrms-db`.default_sub_menu_mgmt",
        (err, result) => {
          if (err) {
            reject(err);
            console.log(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    res.status(200).json({ success: true, main_menu, sub_menu });
  } catch (error) {
    console.log(error);
  }
};
const getActiveCustomers = async (req, res) => {
  try {
    let finalData = [];
    const getCustIds = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM main_admin_db.myhrms_indi_cust_ids where ccav_order_status = ?",
        ["Success"],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (result.length) {
              result.forEach((item, index, myarr) => {
                if (item.end_date > formattedDate) {
                  finalData.push(item);
                }
                if (Object.is(myarr.length - 1, index)) {
                  resolve(finalData);
                }
              });
            }
            // const
            // resolve(result)
          }
        }
      );
    });

    const newEntry = [
      {
        name: "MYHRMS Sample Database",
        cust_id: "sample_db",
        comp_name: "MYHRMS Sample Database",
      },
    ];
    const getNewCust = [...newEntry, ...getCustIds];
    res
      .status(200)
      .json({ success: true, data: getNewCust, total: getCustIds.length });
  } catch (error) {
    console.log(error);
  }
};

const getCustomersConfig = async (req, res) => {
  try {
    const { cust_id } = req.params;
    const getData = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM ${cust_id?.toLowerCase()}_myhrms.emp_roles`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    res.status(200).json({ success: true, data: getData });
  } catch (error) {}
};

const createPermissionTemp = async (req, res) => {
  try {
    const { cust_id, userSubMenu, userMainMenu, roleData, dataUri } = req.body;

    const pdfBuffer = Buffer.from(dataUri?.split(",")[1], "base64");
    // Function to ensure directory exists and save the PDF
    function savePdf() {
      // Check if the directory exists
      const dirPath = path.join(`./app_data/myhrms-customers`, cust_id);
      if (!fs.existsSync(dirPath)) {
        // Create the directory if it does not exist
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Define the path for the PDF file
      const file_name =
        (
          roleData?.role +
          "_" +
          roleData?.role_code +
          "_" +
          roleData?.access_temp_code
        )?.toLowerCase() + ".pdf";
      const filePath = path.join(dirPath, file_name);

      // Write the PDF buffer to a file
      fs.writeFile(filePath, pdfBuffer, (err) => {
        if (err) {
          console.error("Error saving the PDF file:", err);
        } else {
          console.log("PDF file saved successfully.");
        }
      });
    }

    // Call the function to save the PDF
    savePdf();

    const delMainMenu = await new Promise((resolve, reject) => {
      db.query(
        `select * from ${cust_id}_myhrms.roles_menu_mgmt where emp_role_code = ?`,
        [roleData?.role_code],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (result.length) {
              db.query(
                `delete from ${cust_id}_myhrms.roles_menu_mgmt where emp_role_code = ?`,
                [roleData?.role_code],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
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

    const delSubMenu = await new Promise((resolve, reject) => {
      if (delMainMenu) {
        db.query(
          `select * from ${cust_id}_myhrms.roles_sub_menu_mgmt where emp_role_code = ?`,
          [roleData?.role_code],
          (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              if (result.length) {
                db.query(
                  `delete from ${cust_id}_myhrms.roles_sub_menu_mgmt where emp_role_code = ?`,
                  [roleData?.role_code],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
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
      }
    });

    const crMainMenu = await new Promise((resolve, reject) => {
      if (delSubMenu) {
        userMainMenu.forEach((item, index, myarr) => {
          const insertDataMain = {
            emp_role: roleData?.role,
            emp_role_code: roleData?.role_code,
            menu_config_name: item.menu_config_name,
            menu_name: item.menu_name,
            menu_status: item.menu_status,
          };

          db.query(
            `insert into ${cust_id}_myhrms.roles_menu_mgmt set ?`,
            [insertDataMain],
            (err, result) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                if (Object.is(myarr.length - 1, index)) {
                  resolve(true);
                }
              }
            }
          );
        });
      }
    });

    const crSubMenu = await new Promise((resolve, reject) => {
      if (crMainMenu) {
        userSubMenu.forEach((item, index, myarr) => {
          const insertDataMain = {
            emp_role: roleData?.role,
            emp_role_code: roleData?.role_code,
            menu_config_name: item.main_menu_config_name,
            sub_menu_config_name: item.sub_menu_config_name,
            sub_menu_name: item.sub_menu_name,
            sub_menu_status: item.sub_menu_status,
          };

          db.query(
            `insert into ${cust_id}_myhrms.roles_sub_menu_mgmt set ?`,
            [insertDataMain],
            (err, result) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                if (Object.is(myarr.length - 1, index)) {
                  resolve(true);
                }
              }
            }
          );
        });
      }
    });

    res.status(200).json({ success: crSubMenu });
  } catch (error) {
    console.log(error);
  }
};

const roleWisePermission = async (req, res) => {
  try {
    const { role_code, cust_id } = req.params;

    try {
      const main_menu = await new Promise((resolve, reject) => {
        db.query(
          `SELECT * FROM ${cust_id}_myhrms.roles_menu_mgmt where emp_role_code = ?`,
          [Number(role_code)],
          (err, result) => {
            if (err) {
              reject(err);
              console.log(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      const sub_menu = await new Promise((resolve, reject) => {
        db.query(
          `SELECT * FROM ${cust_id}_myhrms.roles_sub_menu_mgmt where emp_role_code = ?`,
          [Number(role_code)],
          (err, result) => {
            if (err) {
              reject(err);
              console.log(err);
            } else {
              resolve(result);
            }
          }
        );
      });
      res.status(200).json({ success: true, main_menu, sub_menu });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {}
};
module.exports = {
  roleWisePermission,
  createPermissionTemp,
  getCustomersConfig,
  getActiveCustomers,
  getDefaultPermission,
  createPermission,
  getPermissionTable,
  createRolePid,
  getCustomerData,
  getRoles,
  getAllPermissions,
  updateSubMenu,
  updateMenu,
};
