const db = require("../../config/db");
const nodemailer = require("nodemailer");
const uploadMail = async (item, course_id, batch_id, data) => {
  try {
    const getF = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM \`myveda-db\`.email_temp_learner_exercise_mgmt where id = 1`,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            const { subject, url, message, caution, signature } = result[0];

            db.query(
              `SELECT * FROM \`myveda-db\`.customer_reg where businessMail = ?`,
              [item],
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
                            to: item, // list of receivers
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
const checkStudent = async (batch_id, course_id, data, newLearners) => {
  try {
    const finalPromise = await new Promise((finalResolve, finalReject) => {
      async function fetchData() {
        try {
          // First query to get batch_id

          // Second query to get all students
          const getAllStudents = await new Promise((resolve, reject) => {
            newLearners.learners.forEach((item, index, myarr) => {
              db.query(
                `SELECT * FROM \`myveda-db\`.email_temp_learner_exercise_mgmt where id = 1`,
                (err, result) => {
                  if (err) {
                    console.log(err);
                    reject(err);
                  } else {
                    const { subject, url, message, caution, signature } =
                      result[0];

                    db.query(
                      `SELECT * FROM \`myveda-db\`.customer_reg where businessMail = ?`,
                      [item],
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
                                    to: item, // list of receivers
                                    subject: subject, // Subject line
                                    bcc: bccEmail,
                                    html: output, // html body
                                  })
                                  .then((res) => {
                                    if (Object.is(myarr.length - 1, index)) {
                                      resolve({ success: true });
                                    }
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

    console.log(finalPromise);
    if (finalPromise.success) {
      return { data: "Good", success: true };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkStudent,
};
