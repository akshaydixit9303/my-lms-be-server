const db = require("../../config/db");

const BuyMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const checkMethod = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM main_admin_db.myvedait_config where id = ?",
        [2],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            if (id == 9) {
              const mshop = result[0]?.myshop_pay;
              resolve(mshop);
            } else if (id == 10) {
              const mhrms = result[0]?.myhrms_pay;
              resolve(mhrms);
            }
          }
        }
      );
    });

    res.status(200).send({ success: true, data: checkMethod });
  } catch (error) {
    console.log(error);
  }
};

const UpdateBuyMethod = async (req, res) => {
  try {
    const { id, status } = req.body;
    console.log(req.body);

    const updateSt = await new Promise((resolve, reject) => {
      switch (id) {
        case 9:
        case 10:
          const column = id === 9 ? "myshop_pay" : "myhrms_pay";
          db.query(
            `UPDATE main_admin_db.myvedait_config SET ${column} = ? WHERE id = ?`,
            [parseInt(status), 2],
            (err, result) => {
              if (err) {
                console.log(
                  `${err} : error while updating buy now method for ${
                    column === "myshop_pay" ? "myshop" : "myhrms"
                  }`
                );
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
          break;
        default:
          console.log("Id not found");
          break;
      }
    });

    res.status(200).send({ success: true, data: updateSt });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  BuyMethod,
  UpdateBuyMethod,
};
