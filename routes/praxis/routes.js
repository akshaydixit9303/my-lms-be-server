const db = require("../../config/db");
const express = require("express");
const router = express.Router();
const readXlsxFile = require("read-excel-file/node");
const fs = require("fs");

const controllers = require("../../controllers/praxis/controller");
router.get("/questions/problem/solutions", (req, res) => {
  try {
    db.query(
      "SELECT problems FROM `myveda-db`.`pract_p&s_qa`  group by problems  ORDER BY RAND()",

      (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.put("/check/solution", (req, res) => {
  const { question } = req.body;
  try {
    db.query(
      "SELECT  pos_solutions as value, pos_solutions as label FROM `myveda-db`.`pract_p&s_qa` WHERE  problems= ?",
      [question],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.put("/problem/solution", (req, res) => {
  const { probs } = req.body;

  try {
    db.query(
      "SELECT c_solutions FROM  `myveda-db`.`pract_p&s_qa`  WHERE problems= ?",
      [probs],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.put("/image/question", (req, res) => {
  const { p_qb_id, question } = req.body;
  try {
    db.query(
      "SELECT pos_solutions as value, pos_solutions as label FROM  `myveda-db`.pract_img_qa WHERE p_qb_id=? and img_name= ?",
      [p_qb_id, question],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.put("/image/answer", (req, res) => {
  const { p_qb_id, img_name } = req.body;

  try {
    db.query(
      "SELECT c_solutions FROM `myveda-db`.pract_img_qa  WHERE p_qb_id=? and img_name= ?",
      [p_qb_id, img_name],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.post("/upload", (req, res) => {
  const file = req.files.file;
  fs.writeFileSync(`./practice/${file?.name}`, file?.data);

  const { pqbId, type } = req.body;
  // const buf = Buffer.from(file?.data, "utf8");

  console.log(type);
  importFileToDb("./practice/" + file?.name);

  function importFileToDb(exFile) {
    readXlsxFile(exFile).then((rows) => {
      rows.shift();

      var items = Object.keys(rows);

      const checkRsponse = new Promise((resolve, reject) => {
        items.forEach(function (item, index, myarr) {
          console.log(rows[item]);
          switch (type) {
            case "1":
              db.query(
                "INSERT INTO `myveda-db`.add_qa(p_qb_id,question,answer) VALUES (?,?)",
                [pqbId, rows[item]],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    reject(err);
                  } else {
                    if (Object.is(myarr.length - 1, index)) {
                      resolve({ success: true });
                    }
                  }
                }
              );
              break;
            case "2":
              db.query(
                "INSERT INTO `myveda-db`.pract_tfqs_qa(p_qb_id,question,opt1,opt2,c_ans) VALUES (?,?)",
                [pqbId, rows[item]],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    reject(err);
                  } else {
                    if (Object.is(myarr.length - 1, index)) {
                      resolve({ success: true });
                    }
                  }
                }
              );

              break;
            case "3":
              db.query(
                "INSERT INTO `myveda-db`.pract_scqs_qa(p_qb_id,question,opt1,opt2,opt3,opt4,c_ans) VALUES (?,?)",
                [pqbId, rows[item]],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    reject(err);
                  } else {
                    if (Object.is(myarr.length - 1, index)) {
                      resolve({ success: true });
                    }
                  }
                }
              );

              break;
            case "4":
              db.query(
                "INSERT INTO `myveda-db`.pract_mcqs_qa(p_qb_id,question,opt1,opt2,opt3,opt4,c_ans) VALUES (?,?)",
                [pqbId, rows[item]],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    reject(err);
                  } else {
                    if (Object.is(myarr.length - 1, index)) {
                      resolve({ success: true });
                    }
                  }
                }
              );

              break;

            default:
              console.log("not found");
              break;
          }
        });
      });

      res.status(200).send(checkRsponse);
    });
  }
});

router.get("/scqs/:course_id", (req, res) => {
  controllers.getScqsQuestions(req, res);
});

router.get("/tfqs/:course_id", (req, res) => {
  controllers.getTfqsQuestions(req, res);
});
router.get("/mcqs/:course_id", (req, res) => {
  controllers.getMcqsQuestions(req, res);
});

router.get("/status/:course_id", (req, res) => {
  controllers.getPracticeStatus(req, res);
});

router.get("/qb-ids", (req, res) => {
  controllers.getPqbIds(req, res);
});

router.put("/pqb-ids", (req, res) => {
  controllers.updatePqbIds(req, res);
});
module.exports = router;
