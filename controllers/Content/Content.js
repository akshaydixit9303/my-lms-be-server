const db = require("../../config/db");
const user_file_path = require("../../usr_file_path/file_path");
const { Readable } = require("stream");
const unzipper = require("unzipper");
const path = require("path");
const { checkStudent } = require("./global");
const fs = require("fs");
const pdfUpload = async (req, res) => {
  try {
    const file = req.files.pdf;
    const { courseId, filename } = req.body;

    const fullFilePath = `${user_file_path}/${courseId}/pdf`;
    const bufferData = Buffer.from(file?.data);
    const pdfPath = path.join(fullFilePath, file?.name);

    const finalPromise = await new Promise((FinalResolve, FinalReject) => {
      async function eData() {
        const createFile = await new Promise((resolve, reject) => {
          if (file) {
            fs.writeFile(pdfPath, bufferData, (err) => {
              if (err) console.log(err);
              else {
                db.query(
                  "INSERT INTO `myveda-db`.pdf_mat (course_id,file_name)  VALUES(?,?)",
                  [courseId, file?.name],
                  (err, result) => {
                    if (err) {
                      reject(err);
                      console.log(err);
                    } else {
                      resolve({ success: true });
                    }
                  }
                );
              }
            });
          } else {
            console.log("err");
          }
        });
        const resData = await new Promise((resolve, reject) => {
          db.query("select * from `myveda-db`.add_courses", (err, result) => {
            if (err) console.log(err);
            else {
              result.forEach((item, index, myarr) => {
                db.query(
                  "select * from `myveda-db`.pdf_mat where course_id = ?",
                  [item.course_id],
                  (err1, result1) => {
                    if (err1) console.log(err1);
                    else {
                      db.query(
                        "update `myveda-db`.add_courses set tot_pdfs = ? where course_id = ?",
                        [result1.length, item.course_id],
                        (err2, result2) => {
                          if (err2) {
                            console.log(err2);
                            reject(err2);
                          } else {
                            resolve(result2);
                          }
                        }
                      );
                    }
                  }
                );
              });
            }
          });
        });

        Promise.all([createFile, resData])
          .then((result) => {
            FinalResolve(result);
          })
          .catch((err) => {
            FinalReject(err);
            console.log(err);
          });
      }
      eData();
    });

    if (finalPromise[0]?.success) {
      const getData = await checkStudent(courseId, file?.name, "PDF");

      if (getData.success) {
        res.status(200).send({ success: true });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const pptUpload = async (req, res) => {
  try {
    const file = req.files.ppt;
    const { courseId } = req.body;

    const fileName = (file?.name).replace(".zip", "");

    const fullFilePath = `${user_file_path}/${courseId}/ppt/${fileName}`;
    if (!fs.existsSync(fullFilePath)) {
      fs.mkdirSync(fullFilePath, { recursive: true });
    } else {
      console.log("bad");
    }
    const stream = Readable.from(file.data);

    stream.pipe(
      unzipper.Extract({
        path: fullFilePath,
      })
    );

    const pdfPath = path.join(fullFilePath, fileName);

    const finalPromise = await new Promise((FinalResolve, FinalReject) => {
      async function eData() {
        const createFile = await new Promise((resolve, reject) => {
          // Ensure the data is read before creating the file
          stream.on("end", async () => {
            try {
              // Check if the file already exists
              if (fs.existsSync(pdfPath)) {
                console.log("File already exists:", pdfPath);
                // Handle the existing file if needed
              } else {
                db.query(
                  "INSERT INTO `myveda-db`.ppt_mat (course_id, file_name) VALUES (?, ?)",
                  [courseId, fileName],
                  (err, result) => {
                    if (err) {
                      console.error(err);
                    } else {
                      resolve({ success: true });
                    }
                  }
                );
              }
            } catch (error) {
              console.error("Error:", error);
              // Reject with the error
              reject(error);
            }
          });
        });

        console.log(createFile);
        Promise.all([createFile])
          .then((result) => {
            FinalResolve(result);
          })
          .catch((err) => {
            FinalReject(err);
            console.log(err);
          });
      }
      eData();
    });

    console.log(finalPromise);
    if (finalPromise[0]?.success) {
      const getData = await checkStudent(courseId, fileName, "PPT");

      if (getData.success) {
        res.status(200).send({ success: true });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const videoUpload = async (req, res) => {
  try {
    const file = req.files.vdo;
    const { courseId, filename } = req.body;

    const fullFilePath = `${user_file_path}/${courseId}/video`;
    const bufferData = Buffer.from(file?.data);
    const videoPath = path.join(fullFilePath, file?.name);

    const finalPromise = await new Promise((FinalResolve, FinalReject) => {
      async function eData() {
        const createFile = await new Promise((resolve, reject) => {
          if (file) {
            fs.writeFile(videoPath, bufferData, (err) => {
              if (err) console.log(err);
              else {
                db.query(
                  "INSERT INTO `myveda-db`.vdo_mat (course_id,file_name)  VALUES(?,?)",
                  [courseId, file?.name],
                  (err, result) => {
                    if (err) {
                      reject(err);
                      console.log(err);
                    } else {
                      resolve({ success: true });
                    }
                  }
                );
              }
            });
          } else {
            console.log("err");
          }
        });
        const resData = await new Promise((resolve, reject) => {
          db.query("select * from `myveda-db`.add_courses", (err, result) => {
            if (err) console.log(err);
            else {
              result.forEach((item, index, myarr) => {
                db.query(
                  "select * from `myveda-db`.vdo_mat where course_id = ?",
                  [item.course_id],
                  (err1, result1) => {
                    if (err1) console.log(err1);
                    else {
                      db.query(
                        "update `myveda-db`.add_courses set tot_videos  = ? where course_id = ?",
                        [result1.length, item.course_id],
                        (err2, result2) => {
                          if (err2) {
                            console.log(err2);
                            reject(err2);
                          } else {
                            resolve(result2);
                          }
                        }
                      );
                    }
                  }
                );
              });
            }
          });
        });

        Promise.all([createFile, resData])
          .then((result) => {
            FinalResolve(result);
          })
          .catch((err) => {
            FinalReject(err);
            console.log(err);
          });
      }
      eData();
    });

    if (finalPromise[0]?.success) {
      const getData = await checkStudent(courseId, file?.name, "Video");

      if (getData.success) {
        res.status(200).send({ success: true });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  pdfUpload,
  pptUpload,
  videoUpload,
};
