const db = require("../../config/db");

const getPqbId = async (id) => {
  const checkPqbId = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM \`myveda-db\`.add_courses where course_id = ?`,
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          const p_qb_id = result[0]?.p_qb_id;
          resolve(p_qb_id);
        }
      }
    );
  });

  return checkPqbId;
};
const getScqsQuestions = async (req, res) => {
  try {
    const { course_id } = req.params;
    const p_qb_id = await getPqbId(course_id);

    const getQuesData = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM \`myveda-db\`.pract_scqs_qa where p_qb_id = ? ORDER BY RAND()`,
        [p_qb_id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    res.status(200).send({ success: true, data: getQuesData });
  } catch (error) {
    console.log(error);
  }
};

const getTfqsQuestions = async (req, res) => {
  try {
    const { course_id } = req.params;
    const p_qb_id = await getPqbId(course_id);

    const getQuesData = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM \`myveda-db\`.pract_tfqs_qa where p_qb_id = ? ORDER BY RAND()`,
        [p_qb_id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    res.status(200).send({ success: true, data: getQuesData });
  } catch (error) {
    console.log(error);
  }
};

const getMcqsQuestions = async (req, res) => {
  try {
    const { course_id } = req.params;
    const p_qb_id = await getPqbId(course_id);

    const getQuesData = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM \`myveda-db\`.pract_mcqs_qa where p_qb_id = ? ORDER BY RAND()`,
        [p_qb_id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    res.status(200).send({ success: true, data: getQuesData });
  } catch (error) {
    console.log(error);
  }
};

const getPracticeStatus = async (req, res) => {
  try {
    const { course_id } = req.params;
    const p_qb_id = await getPqbId(course_id);

    const getStatuus = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM \`myveda-db\`.p_qb_id where p_qb_id = ?`,
        [p_qb_id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        }
      );
    });

    res.status(200).send({ success: true, data: getStatuus });
  } catch (error) {
    console.log(error);
  }
};

const getPqbIds = async (req, res) => {
  try {
    const getStatuus = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM \`myveda-db\`.p_qb_id`,

        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    res.status(200).send({ success: true, data: getStatuus });
  } catch (error) {
    console.log(error);
  }
};

const updatePqbIds = async (req, res) => {
  try {
    const { formData } = req.body;
    const getStatuus = await new Promise((resolve, reject) => {
      db.query(
        `update \`myveda-db\`.p_qb_id set ? where p_qb_id = ?`,
        [formData, formData?.p_qb_id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    res.status(200).send({ success: true, data: getStatuus });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getScqsQuestions,
  updatePqbIds,
  getTfqsQuestions,
  getPqbIds,
  getMcqsQuestions,
  getPracticeStatus,
};
