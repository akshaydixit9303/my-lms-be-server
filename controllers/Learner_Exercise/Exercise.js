const db = require("../../config/db");
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const { checkStudent } = require("./Global");
const nodemailer = require("nodemailer");

app.use(fileUpload());

const addLearnerExercise = async (req, res) => {
  try {
    const new_ex_id = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM \`myveda-db\`.learner_exercise_mgmt`,
        (err, result) => {
          if (err) {
            console.log(
              err,
              " : error while getting all data learner_exercise_mgmt for exercise_id"
            );
            reject(err);
          } else {
            const newNo = result.length + 1;
            const exp_vid =
              newNo.toString().length < 4
                ? "0".repeat(4 - newNo.toString().length) + newNo
                : newNo;

            resolve(exp_vid);
          }
        }
      );
    });
    console.log(req.body);
    const { formData, learners, batch_id, course_id } = req.body;
    const newLearners = JSON.parse(learners);
    const { ex_title, ex_des, ex_due_date } = formData;
    const insertData = {
      batch_id,
      course_id,
      exercise_id: "EX" + new_ex_id,
      ex_title,
      ex_des,
      ex_due_date,
      learners,
    };
    const addExercise = await new Promise((resolve, reject) => {
      db.query(
        `insert into \`myveda-db\`.learner_exercise_mgmt set ?`,
        [insertData],
        (err, result) => {
          if (err) {
            reject(err);
            console.log(err);
          } else resolve({ success: true });
        }
      );
    });

    if (addExercise.success) {
      const getData = await checkStudent(
        batch_id,
        course_id,
        insertData,
        newLearners
      );

      if (getData.success) {
        res.status(200).send({ success: true });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getData = async (req, res) => {
  try {
    const { batch_id, course_id } = req.params;
    const getData = await new Promise((resolve, reject) => {
      db.query(
        `select * from \`myveda-db\`.learner_exercise_mgmt where batch_id = ? and course_id = ?`,
        [batch_id, course_id],
        (err, result) => {
          if (err) {
            console.log(
              err,
              " : error while getting learner_exercise_mgmt data"
            );
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    res.status(200).send({ success: true, data: getData });
  } catch (error) {
    console.log(error, " : error while getting learner_exercise_mgmt data");
  }
};

const trainerEmail = async (batch_id, course_id, data, uid) => {
  try {
    const tempEmail = await new Promise((finalResolve, finalReject) => {
      async function getData() {
        const trainerData = await new Promise((resolve, reject) => {
          db.query(
            `SELECT * FROM \`myveda-db\`.batch_ids_la as t1 
            left join \`myveda-db\`.trainer_reg_table_la as t2 on t1.trainer = t2.uid 
            where t1.batch_ids = ?`,
            [batch_id],
            (err, result) => {
              if (err) {
                console.log(
                  err,
                  " : Error while getting data learner exercise submission"
                );
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });

        const { trainer, name, surname } = trainerData[0];
        const sendEmail = await new Promise((resolve, reject) => {
          if (trainer) {
            db.query(
              `SELECT * FROM \`myveda-db\`.email_temp_learner_submit_exercise where id = 1`,
              (err, result) => {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  const { subject, url, message, caution, signature } =
                    result[0];

                  const output = `
                      <h3>Dear ${name} ${surname}</h3>
                      <p>${message}:</p>
                      <br />
                      <p><b>URL : </b> ${url}</p>
                      <p><b>Submitted By : </b> ${uid}</p>

                      <p><b>Course_ID : </b> ${course_id}</p>
                      <p><b>Exercise Title : </b> ${data?.ex_title}</p>
                      <p><b>Description : </b> ${data?.ex_des}</p>
                      <p><b>Due Date : </b> ${data?.ex_due_date}</p>

                      <p><b>${caution}</b></p>
                      <br />
                      <p>Thanks & Regards</p>
                      <p>${signature}</p>
                      `;

                  db.query(
                    "SELECT * FROM `myveda-db`.email_srv",
                    (errSrv, resultSrv) => {
                      if (errSrv) {
                        console.log(errSrv);
                      } else {
                        let host1 = resultSrv[0]?.host;
                        let port1 = resultSrv[0]?.port;
                        let user1 = resultSrv[0]?.auth_uid;
                        let pass1 = resultSrv[0]?.auth_pass;
                        let fromEmail = resultSrv[0]?.from_email;
                        let bccEmail = resultSrv[0]?.bcc_email;
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
                            to: trainer, // list of receivers
                            subject: subject, // Subject line
                            bcc: bccEmail,
                            html: output, // html body
                          })
                          .then((res) => {
                            resolve({ success: true });
                          })
                          .catch((err) => console.log(err));
                      }
                    }
                  );
                }
              }
            );
          }
        });

        Promise.all([trainerData, sendEmail])
          .then((data) => {
            if (data[1].success) {
              finalResolve({ success: true });
            }
          })
          .catch((err) => {
            console.log(err);
            finalReject(err);
          });
      }
      getData();
    });
    if (tempEmail.success) {
      return { success: true };
    }
  } catch (error) {
    console.log(error);
  }
};
const submitExercise = async (req, res) => {
  try {
    const { file } = req.files;
    const { row_data, uid } = req.body;
    const data = JSON.parse(row_data);
    const folderPath = "./Exercise_MGMT/Submitted_Exercises";
    const file_name = uid + "_" + data?.exercise_id + "_" + file?.name;
    const filePath = path.join(folderPath, file_name);
    const fileData = Buffer.from(file?.data);

    const createRow = await new Promise((resolve, reject) => {
      const insertData = {
        course_id: data?.course_id,
        batch_id: data?.batch_id,
        exercise_id: data?.exercise_id,
        uid,
        file_name,
        submit_timestamp: new Date(),
      };

      const updateData = {
        course_id: data?.course_id,
        batch_id: data?.batch_id,
        exercise_id: data?.exercise_id,
        uid,
        file_name,
        submit_timestamp: new Date(),
        tr_review_status: null,
        tr_remark: null,
        tr_update_date: null,
      };
      if (data?.tr_review_status == 2) {
        db.query(
          `update \`myveda-db\`.learner_submitted_exercises set ? where id = ?`,
          [updateData, data?.id],
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
          `insert into \`myveda-db\`.learner_submitted_exercises set ?`,
          [insertData],
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

    const getExericseData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `myveda-db`.learner_exercise_mgmt where exercise_id = ?",
        [data?.exercise_id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
    console.log(getExericseData);
    if (createRow) {
      fs.writeFile(filePath, fileData, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("hello");
          async function dd() {
            const finalData = await trainerEmail(
              data?.batch_id,
              data?.course_id,
              getExericseData[0],
              uid
            );
            console.log(finalData);
            if (finalData.success) {
              res.status(200).send({ success: true });
            }
          }
          dd();
        }
      });
    }
  } catch (error) {
    console.log(error, " : error while submitting exercise");
  }
};
const getSubmittedData = async (req, res) => {
  try {
    const { ex_id, batch_id, course_id } = req.params;
    const getData = await new Promise((resolve, reject) => {
      db.query(
        `select *,DATE_FORMAT(\`submit_timestamp\`, '%m-%d-%Y %h:%i %p') AS formatted_timestamp from \`myveda-db\`.learner_submitted_exercises where exercise_id = ? and course_id = ? and batch_id = ?`,
        [ex_id, course_id, batch_id],
        (err, result) => {
          if (err) {
            console.log(
              err,
              " : error while getting all submitted exercise data."
            );
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    res.status(200).send({ success: true, data: getData });
  } catch (error) {}
};
const getLearnerData = async (req, res) => {
  try {
    const { uid } = req.params;
    const getExData = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM \`myveda-db\`.learner_submitted_exercises where uid = ?`,
        [uid],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
            console.log(result);
          }
        }
      );
    });

    res.status(200).send({ success: true, data: getExData });
  } catch (error) {}
};

const updateAnswer = async (req, res) => {
  try {
    const { data, formData } = req.body;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "-" + mm + "-" + yyyy;
    const updateD = await new Promise((resolve, reject) => {
      const updatedData = {
        ...data,
        tr_review_status: parseInt(formData.tr_review_status),
        tr_remark: formData.tr_remark,
        tr_update_date: today,
      };

      const { formatted_timestamp, submit_timestamp, ...updateNew } =
        updatedData;
      db.query(
        `update \`myveda-db\`.learner_submitted_exercises set ? where id = ?`,
        [updateNew, data?.id],
        (err, result) => {
          if (err) {
            console.log(err, " : error while updating answer by trainer");
            reject(err);
          } else resolve(result);
        }
      );
    });

    res.status(200).send({ success: true, data: updateD });
  } catch (error) {
    console.log(error, ": error while updating answer by trainer ");
  }
};
module.exports = {
  addLearnerExercise,
  getData,
  submitExercise,
  getSubmittedData,
  getLearnerData,
  updateAnswer,
};
