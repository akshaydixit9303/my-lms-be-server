const db = require("../../config/db");
const user_file_path = require("../../usr_file_path/file_path");
const { Readable } = require("stream");
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const express = require("express");

const app = express();

app.use(fileUpload());

const readXlsxFile = require("read-excel-file/node");

const addSkills = async (req, res) => {
  try {
    const { course_id } = req.body;
    const file = req.files.file;

    const delItems = await new Promise((resolve, reject) => {
      db.query(
        "delete from `myveda-db`.course_skills_gain where course_id = ?",
        [course_id],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({ success: true });
          }
        }
      );
    });
    const updateData = await new Promise((resolve, reject) => {
      if (delItems.success) {
        fs.writeFileSync(`./excel/${file?.name}`, file?.data);
        importFileToDb("./excel/" + file?.name);

        function importFileToDb(exFile) {
          readXlsxFile(exFile).then((rows) => {
            rows.shift();
            var items = Object.keys(rows);
            items.forEach(function (item, index, myarr) {
              db.query(
                "insert into `myveda-db`.course_skills_gain(course_id,skills) values(?)",
                [rows[item]],
                (err, result) => {
                  if (err) {
                    console.log(
                      err,
                      " : error while updating skills of courses."
                    );
                    reject(err);
                  } else {
                    if (Object.is(myarr.length - 1, index)) {
                      resolve({ success: true });
                    }
                  }
                }
              );
            });
          });
        }
      }
    });

    res.status(200).json(updateData);
  } catch (error) {
    console.log(error);
  }
};

const getAllSkills = async (req, res) => {
  try {
    const { course_id } = req.params;
    const getData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `myveda-db`.course_skills_gain where course_id = ?",
        [course_id],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    res.status(200).json(getData);
  } catch (error) {
    console.log(error);
  }
};
const delSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const getData = await new Promise((resolve, reject) => {
      db.query(
        "delete FROM `myveda-db`.course_skills_gain where id = ?",
        [parseInt(id)],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({ success: true });
          }
        }
      );
    });
    res.status(200).json(getData);
  } catch (error) {
    console.log(error);
  }
};

// Outcomes

const addOutcome = async (req, res) => {
  try {
    const { course_id } = req.body;
    const file = req.files.file;

    const delItems = await new Promise((resolve, reject) => {
      db.query(
        "delete from `myveda-db`.course_skills_outcome where course_id = ?",
        [course_id],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({ success: true });
          }
        }
      );
    });
    const updateData = await new Promise((resolve, reject) => {
      if (delItems.success) {
        fs.writeFileSync(`./excel/${file?.name}`, file?.data);
        importFileToDb("./excel/" + file?.name);

        function importFileToDb(exFile) {
          readXlsxFile(exFile).then((rows) => {
            rows.shift();
            var items = Object.keys(rows);
            items.forEach(function (item, index, myarr) {
              db.query(
                "insert into `myveda-db`.course_skills_outcome(course_id,outcome) values(?)",
                [rows[item]],
                (err, result) => {
                  if (err) {
                    console.log(
                      err,
                      " : error while updating outcome of courses."
                    );
                    reject(err);
                  } else {
                    if (Object.is(myarr.length - 1, index)) {
                      resolve({ success: true });
                    }
                  }
                }
              );
            });
          });
        }
      }
    });

    res.status(200).json(updateData);
  } catch (error) {
    console.log(error);
  }
};

const getAllOutomes = async (req, res) => {
  try {
    const { course_id } = req.params;
    const getData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `myveda-db`.course_skills_outcome where course_id = ?",
        [course_id],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    res.status(200).json(getData);
  } catch (error) {
    console.log(error);
  }
};

const delOutcome = async (req, res) => {
  try {
    const { id } = req.params;
    const getData = await new Promise((resolve, reject) => {
      db.query(
        "delete FROM `myveda-db`.course_skills_outcome where id = ?",
        [parseInt(id)],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({ success: true });
          }
        }
      );
    });
    res.status(200).json(getData);
  } catch (error) {
    console.log(error);
  }
};

// What you' ll learn

const addSchedule = async (req, res) => {
  try {
    const { course_id } = req.body;
    const file = req.files.file;

    const delItems = await new Promise((resolve, reject) => {
      db.query(
        "delete from `myveda-db`.course_weekly_learning_schedule where course_id = ?",
        [course_id],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({ success: true });
          }
        }
      );
    });
    const updateData = await new Promise((resolve, reject) => {
      if (delItems.success) {
        fs.writeFileSync(`./excel/${file?.name}`, file?.data);
        importFileToDb("./excel/" + file?.name);

        function importFileToDb(exFile) {
          readXlsxFile(exFile).then((rows) => {
            rows.shift();
            var items = Object.keys(rows);
            items.forEach(function (item, index, myarr) {
              db.query(
                "insert into `myveda-db`.course_weekly_learning_schedule(course_id,session_name,learned_by,week) values(?)",
                [rows[item]],
                (err, result) => {
                  if (err) {
                    console.log(
                      err,
                      " : error while updating learning shedule of courses."
                    );
                    reject(err);
                  } else {
                    if (Object.is(myarr.length - 1, index)) {
                      resolve({ success: true });
                    }
                  }
                }
              );
            });
          });
        }
      }
    });

    res.status(200).json(updateData);
  } catch (error) {
    console.log(error);
  }
};

const getAllSchedule = async (req, res) => {
  try {
    const { course_id } = req.params;
    const getData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `myveda-db`.course_weekly_learning_schedule where course_id = ?",
        [course_id],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    res.status(200).json(getData);
  } catch (error) {
    console.log(error);
  }
};

const delSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const getData = await new Promise((resolve, reject) => {
      db.query(
        "delete FROM `myveda-db`.course_weekly_learning_schedule where id = ?",
        [parseInt(id)],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({ success: true });
          }
        }
      );
    });
    res.status(200).json(getData);
  } catch (error) {
    console.log(error);
  }
};

const updateExList = async (req, res) => {
  try {
    const file = req.files.file;
    const { course_id } = req.body;
    console.log(file);

    const fullFilePath = `${user_file_path}/${course_id}/ex-list`;
    const bufferData = Buffer.from(file?.data);
    const exPath = path.join(fullFilePath, "list.pdf");

    const newD = await new Promise((resolve, reject) => {
      if (file) {
        fs.writeFile(exPath, bufferData, (err) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({ success: true });
          }
        });
      } else {
        console.log("file not found");
      }
    });

    res.status(200).json(newD);
  } catch (error) {
    console.error(error);
  }
};
const ddDat = async (req, res) => {
  try {
    console.log(req.files);
  } catch (error) {
    console.log(error);
  }
};

const updateDesImg = async (req, res) => {
  try {
    const file = req.files.file;
    const { course_id } = req.body;
    console.log(file);

    const fullFilePath = `${user_file_path}/service_img/myveda-courses/description`;
    const bufferData = Buffer.from(file?.data);
    const exPath = path.join(fullFilePath, file?.name);

    const newD = await new Promise((resolve, reject) => {
      if (file) {
        fs.writeFile(exPath, bufferData, (err) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            db.query(
              "update `myveda-db`.add_courses set img_name = ? where course_id = ?",
              [file?.name, course_id],
              (err, result) => {
                if (err) console.log(err);
                else resolve({ success: true });
              }
            );
          }
        });
      } else {
        console.log("file not found");
      }
    });

    res.status(200).json(newD);
  } catch (error) {
    console.error(error);
  }
};
const updateOutlineImg = async (req, res) => {
  try {
    const file = req.files.file;
    const { course_id } = req.body;

    const fullFilePath = `${user_file_path}/service_img/myveda-courses/outline`;
    const bufferData = Buffer.from(file?.data);
    const exPath = path.join(fullFilePath, file?.name);

    const newD = await new Promise((resolve, reject) => {
      if (file) {
        fs.writeFile(exPath, bufferData, (err) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            db.query(
              "update `myveda-db`.add_courses set image_name = ? where course_id = ?",
              [file?.name, course_id],
              (err, result) => {
                if (err) console.log(err);
                else resolve({ success: true });
              }
            );
          }
        });
      } else {
        console.log("file not found");
      }
    });

    res.status(200).json(newD);
  } catch (error) {
    console.error(error);
  }
};
const publishCourse = async (req, res) => {
  try {
    const { course_id } = req.body;

    const newD = await new Promise((resolve, reject) => {
      db.query(
        "update `myveda-db`.add_courses set stats = ? where course_id = ?",
        [1, course_id],
        (err, result) => {
          if (err) console.log(err);
          else resolve({ success: true });
        }
      );
    });

    res.status(200).json(newD);
  } catch (error) {
    console.error(error);
  }
};

const skillOutcome = async (req, res) => {
  try {
    const { id, c_id } = req.params;
    const getData = await new Promise((resolve, reject) => {
      if (c_id.toLowerCase().includes("skill")) {
        db.query(
          "SELECT *,skills as c_data FROM `myveda-db`.course_skills_gain where course_id = ?",
          [id],
          (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else {
        db.query(
          "SELECT *,outcome as c_data FROM `myveda-db`.course_skills_outcome where course_id = ?",
          [id],
          (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      }
    });

    res.status(200).send({ success: true, data: getData });
  } catch (error) {
    console.log(error);
  }
};
const getCategories = async (req, res) => {
  try {
    const getData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `myveda-db`.course_categories where status = 1",
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    res.status(200).send({ success: true, data: getData });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getCategories,
  skillOutcome,
  publishCourse,
  updateOutlineImg,
  updateDesImg,
  addSchedule,
  delSchedule,
  getAllSchedule,
  delSkill,
  ddDat,
  updateExList,
  delOutcome,
  addOutcome,
  getAllOutomes,
  addSkills,
  getAllSkills,
};
