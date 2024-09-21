const db = require("../../config/db");
const nodemailer = require("nodemailer");
const uploadMail = async (item, file_name, typess, course_id) => {
  try {
    const getF = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM \`myveda-db\`.email_temp_training_material where id = 1`,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            const { subject, url, message, caution, signature } = result[0];

            db.query(
              `SELECT * FROM \`myveda-db\`.customer_reg where businessMail = ?`,
              [item.uid],
              (errS, resultS) => {
                if (errS) console.log(errS);
                else {
                  const { firstName, lastName } = resultS[0];
                  const output = `
                            <h3>Dear ${firstName} ${lastName}</h3>
                            <p>${message}:</p>
                            <br />
                            <p><b>URL : </b> ${url}</p>
                            <p><b>Course_ID : </b> ${course_id}</p>
                            <p><b>Upload Type : </b> ${typess}</p>
                            <p><b>Upload Title : </b> ${file_name}</p>

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
                            to: item.uid, // list of receivers
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
        }
      );
    });

    return getF;
  } catch (error) {}
};
const checkStudent = async (course_id, file_name, typess) => {
  try {
    const finalPromise = await new Promise((finalResolve, finalReject) => {
      async function fetchData() {
        try {
          // First query to get batch_id
          const batch_id = await new Promise((resolve, reject) => {
            db.query(
              `SELECT * FROM \`myveda-db\`.batch_ids_la where course_id = ? and status = ?`,
              [course_id, 1],
              (err, result) => {
                if (err) {
                  console.log(err + " : error while getting batch_id");
                  reject(err);
                } else {
                  if (result.length) {
                    resolve(result[0]?.batch_ids);
                  } else {
                    finalResolve({ success: true });
                  }
                }
              }
            );
          });

          // Second query to get all students
          const getAllStudents = await new Promise((resolve, reject) => {
            db.query(
              `SELECT uid FROM \`myveda-db\`.user_course_map_table_la where batch_code = ?`,
              [batch_id],
              (err, result) => {
                if (err) {
                  console.log(
                    err,
                    " : error while getting all student data from course_id with batch_id"
                  );
                  reject(err);
                } else {
                  if (result.length) {
                    resolve(result);
                  } else {
                    finalResolve({ success: true });
                  }
                }
              }
            );
          });

          return getAllStudents;
        } catch (error) {
          throw error;
        }
      }

      // Using the fetchData function
      fetchData()
        .then((students) => {
          finalResolve(students);
        })
        .catch((error) => {
          console.error("Error:", error);
          finalReject(error);
        });
    });

    // Check if there are students
    if (finalPromise.length) {
      const promises = finalPromise.map(async (item) => {
        const result = await uploadMail(item, file_name, typess, course_id);
        return { data: result, success: true };
      });

      const results = await Promise.all(promises);

      // Find the result where success is true (if needed)
      const successResult = results.find((result) => result && result.success);

      // Log or handle the success result
      return successResult || { success: true };
    } else {
      return { success: true };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

module.exports = {
  checkStudent,
};
