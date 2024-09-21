const db = require("../../config/db");

const Meeting = (req, res) => {
  const { action } = req.params; // Assuming you have an 'action' parameter to specify the CRUD operation

  switch (action) {
    case "get":
      // Create a new meeting
      db.query(
        "SELECT * FROM `myveda-db`.email_temp_meeting",

        (err, result) => {
          if (err) {
            console.log(
              err,
              "Error while getting data meeting email templates"
            );
          } else {
            res.status(200).send({ success: true, data: result });
          }
        }
      );
      break;

    case "subject":
      const { subject } = req.body; // Example: { id: 1, subject: 'Template Subject' }
      db.query(
        "UPDATE `myveda-db`.email_temp_meeting SET subject = ? WHERE id = ?",
        [subject, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Subject.");
          } else {
            res.send({
              success: true,
              message: "! Subject Updated Successfully.",
            });
          }
        }
      );
      break;

    case "message":
      // Update an existing meeting
      const { message } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_meeting SET message = ? WHERE id = ?",
        [message, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Message.");
          } else {
            res.send({
              success: true,
              message: "! Message Updated Successfully.",
            });
          }
        }
      );
      break;
    case "url":
      // Update an existing meeting
      const { url } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_meeting SET url = ? WHERE id = ?",
        [url, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating URL.");
          } else {
            res.send({
              success: true,
              message: "! URL Updated Successfully.",
            });
          }
        }
      );
      break;
    case "caution":
      // Update an existing meeting
      const { caution } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_meeting SET caution = ? WHERE id = ?",
        [caution, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Caution.");
          } else {
            res.send({
              success: true,
              message: "! Caution Updated Successfully.",
            });
          }
        }
      );
      break;
    case "sign":
      // Update an existing meeting
      const { sign } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_meeting SET signature = ? WHERE id = ?",
        [sign, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating signature.");
          } else {
            res.send({
              success: true,
              message: "! signature Updated Successfully.",
            });
          }
        }
      );
      break;

    default:
      res.status(400).send({ message: "Invalid action" });
      break;
  }
};
const buyAgain = (req, res) => {
  const { action } = req.params; // Assuming you have an 'action' parameter to specify the CRUD operation

  switch (action) {
    case "data":
      // Create a new meeting
      db.query(
        "SELECT * FROM `myveda-db`.email_temp_course_buy_exist_learner",

        (err, result) => {
          if (err) {
            console.log(
              err,
              "Error while getting data meeting email templates"
            );
          } else {
            res.status(200).send({ success: true, data: result });
          }
        }
      );
      break;

    case "subject":
      const { subject } = req.body; // Example: { id: 1, subject: 'Template Subject' }
      db.query(
        "UPDATE `myveda-db`.email_temp_course_buy_exist_learner SET subject = ? WHERE id = ?",
        [subject, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Subject.");
          } else {
            res.send({
              success: true,
              message: "! Subject Updated Successfully.",
            });
          }
        }
      );
      break;

    case "message":
      // Update an existing meeting
      const { message } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_course_buy_exist_learner SET message = ? WHERE id = ?",
        [message, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Message.");
          } else {
            res.send({
              success: true,
              message: "! Message Updated Successfully.",
            });
          }
        }
      );
      break;
    case "url":
      // Update an existing meeting
      const { url } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_course_buy_exist_learner SET url = ? WHERE id = ?",
        [url, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating URL.");
          } else {
            res.send({
              success: true,
              message: "! URL Updated Successfully.",
            });
          }
        }
      );
      break;
    case "caution":
      // Update an existing meeting
      const { caution } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_course_buy_exist_learner SET caution = ? WHERE id = ?",
        [caution, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Caution.");
          } else {
            res.send({
              success: true,
              message: "! Caution Updated Successfully.",
            });
          }
        }
      );
      break;
    case "sign":
      // Update an existing meeting
      const { sign } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_course_buy_exist_learner SET signature = ? WHERE id = ?",
        [sign, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating signature.");
          } else {
            res.send({
              success: true,
              message: "! signature Updated Successfully.",
            });
          }
        }
      );
      break;

    default:
      res.status(400).send({ message: "Invalid action" });
      break;
  }
};
const trainingMaterial = (req, res) => {
  const { action } = req.params; // Assuming you have an 'action' parameter to specify the CRUD operation

  switch (action) {
    case "data":
      // Create a new meeting
      db.query(
        "SELECT * FROM `myveda-db`.email_temp_training_material",

        (err, result) => {
          if (err) {
            console.log(
              err,
              "Error while getting data meeting email templates"
            );
          } else {
            res.status(200).send({ success: true, data: result });
          }
        }
      );
      break;

    case "subject":
      const { subject } = req.body; // Example: { id: 1, subject: 'Template Subject' }
      db.query(
        "UPDATE `myveda-db`.email_temp_training_material SET subject = ? WHERE id = ?",
        [subject, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Subject.");
          } else {
            res.send({
              success: true,
              message: "! Subject Updated Successfully.",
            });
          }
        }
      );
      break;

    case "message":
      // Update an existing meeting
      const { message } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_training_material SET message = ? WHERE id = ?",
        [message, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Message.");
          } else {
            res.send({
              success: true,
              message: "! Message Updated Successfully.",
            });
          }
        }
      );
      break;
    case "url":
      // Update an existing meeting
      const { url } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_training_material SET url = ? WHERE id = ?",
        [url, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating URL.");
          } else {
            res.send({
              success: true,
              message: "! URL Updated Successfully.",
            });
          }
        }
      );
      break;
    case "caution":
      // Update an existing meeting
      const { caution } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_training_material SET caution = ? WHERE id = ?",
        [caution, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Caution.");
          } else {
            res.send({
              success: true,
              message: "! Caution Updated Successfully.",
            });
          }
        }
      );
      break;
    case "sign":
      // Update an existing meeting
      const { sign } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_training_material SET signature = ? WHERE id = ?",
        [sign, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating signature.");
          } else {
            res.send({
              success: true,
              message: "! signature Updated Successfully.",
            });
          }
        }
      );
      break;

    default:
      res.status(400).send({ message: "Invalid action" });
      break;
  }
};
const ExerciseUpload = (req, res) => {
  const { action } = req.params; // Assuming you have an 'action' parameter to specify the CRUD operation

  switch (action) {
    case "data":
      // Create a new meeting
      db.query(
        "SELECT * FROM `myveda-db`.email_temp_learner_exercise_mgmt",

        (err, result) => {
          if (err) {
            console.log(
              err,
              "Error while getting data meeting email templates"
            );
          } else {
            res.status(200).send({ success: true, data: result });
          }
        }
      );
      break;

    case "subject":
      const { subject } = req.body; // Example: { id: 1, subject: 'Template Subject' }
      db.query(
        "UPDATE `myveda-db`.email_temp_learner_exercise_mgmt SET subject = ? WHERE id = ?",
        [subject, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Subject.");
          } else {
            res.send({
              success: true,
              message: "! Subject Updated Successfully.",
            });
          }
        }
      );
      break;

    case "message":
      // Update an existing meeting
      const { message } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_learner_exercise_mgmt SET message = ? WHERE id = ?",
        [message, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Message.");
          } else {
            res.send({
              success: true,
              message: "! Message Updated Successfully.",
            });
          }
        }
      );
      break;
    case "url":
      // Update an existing meeting
      const { url } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_learner_exercise_mgmt SET url = ? WHERE id = ?",
        [url, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating URL.");
          } else {
            res.send({
              success: true,
              message: "! URL Updated Successfully.",
            });
          }
        }
      );
      break;
    case "caution":
      // Update an existing meeting
      const { caution } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_learner_exercise_mgmt SET caution = ? WHERE id = ?",
        [caution, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Caution.");
          } else {
            res.send({
              success: true,
              message: "! Caution Updated Successfully.",
            });
          }
        }
      );
      break;
    case "sign":
      // Update an existing meeting
      const { sign } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_learner_exercise_mgmt SET signature = ? WHERE id = ?",
        [sign, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating signature.");
          } else {
            res.send({
              success: true,
              message: "! signature Updated Successfully.",
            });
          }
        }
      );
      break;

    default:
      res.status(400).send({ message: "Invalid action" });
      break;
  }
};

const exerciseAnswer = (req, res) => {
  const { action } = req.params; // Assuming you have an 'action' parameter to specify the CRUD operation

  switch (action) {
    case "data":
      // Create a new meeting
      db.query(
        "SELECT * FROM `myveda-db`.email_temp_learner_submit_exercise",

        (err, result) => {
          if (err) {
            console.log(
              err,
              "Error while getting data meeting email templates"
            );
          } else {
            res.status(200).send({ success: true, data: result });
          }
        }
      );
      break;

    case "subject":
      const { subject } = req.body; // Example: { id: 1, subject: 'Template Subject' }
      db.query(
        "UPDATE `myveda-db`.email_temp_learner_submit_exercise SET subject = ? WHERE id = ?",
        [subject, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Subject.");
          } else {
            res.send({
              success: true,
              message: "! Subject Updated Successfully.",
            });
          }
        }
      );
      break;

    case "message":
      // Update an existing meeting
      const { message } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_learner_submit_exercise SET message = ? WHERE id = ?",
        [message, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Message.");
          } else {
            res.send({
              success: true,
              message: "! Message Updated Successfully.",
            });
          }
        }
      );
      break;
    case "url":
      // Update an existing meeting
      const { url } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_learner_submit_exercise SET url = ? WHERE id = ?",
        [url, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating URL.");
          } else {
            res.send({
              success: true,
              message: "! URL Updated Successfully.",
            });
          }
        }
      );
      break;
    case "caution":
      // Update an existing meeting
      const { caution } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_learner_submit_exercise SET caution = ? WHERE id = ?",
        [caution, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Caution.");
          } else {
            res.send({
              success: true,
              message: "! Caution Updated Successfully.",
            });
          }
        }
      );
      break;
    case "sign":
      // Update an existing meeting
      const { sign } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE `myveda-db`.email_temp_learner_submit_exercise SET signature = ? WHERE id = ?",
        [sign, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating signature.");
          } else {
            res.send({
              success: true,
              message: "! signature Updated Successfully.",
            });
          }
        }
      );
      break;

    default:
      res.status(400).send({ message: "Invalid action" });
      break;
  }
};

const ProformOnlineInv = (req, res) => {
  const { action } = req.params; // Assuming you have an 'action' parameter to specify the CRUD operation

  switch (action) {
    case "data":
      // Create a new meeting
      db.query(
        "SELECT * FROM main_admin_db.email_temp_online_proforma_invoices",

        (err, result) => {
          if (err) {
            console.log(
              err,
              "Error while getting data meeting email templates"
            );
          } else {
            res.status(200).send({ success: true, data: result });
          }
        }
      );
      break;

    case "subject":
      const { subject } = req.body; // Example: { id: 1, subject: 'Template Subject' }
      db.query(
        "UPDATE main_admin_db.email_temp_online_proforma_invoices SET subject = ? WHERE id = ?",
        [subject, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Subject.");
          } else {
            res.send({
              success: true,
              message: "! Subject Updated Successfully.",
            });
          }
        }
      );
      break;

    case "message":
      // Update an existing meeting
      const { message } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_online_proforma_invoices SET message = ? WHERE id = ?",
        [message, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Message.");
          } else {
            res.send({
              success: true,
              message: "! Message Updated Successfully.",
            });
          }
        }
      );
      break;
    case "url":
      // Update an existing meeting
      const { url } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_online_proforma_invoices SET url = ? WHERE id = ?",
        [url, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating URL.");
          } else {
            res.send({
              success: true,
              message: "! URL Updated Successfully.",
            });
          }
        }
      );
      break;
    case "caution":
      // Update an existing meeting
      const { caution } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_online_proforma_invoices SET caution = ? WHERE id = ?",
        [caution, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Caution.");
          } else {
            res.send({
              success: true,
              message: "! Caution Updated Successfully.",
            });
          }
        }
      );
      break;
    case "sign":
      // Update an existing meeting
      const { sign } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_online_proforma_invoices SET signature = ? WHERE id = ?",
        [sign, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating signature.");
          } else {
            res.send({
              success: true,
              message: "! signature Updated Successfully.",
            });
          }
        }
      );
      break;

    default:
      res.status(400).send({ message: "Invalid action" });
      break;
  }
};

const myShopPmtUpdate = (req, res) => {
  const { action } = req.params; // Assuming you have an 'action' parameter to specify the CRUD operation

  switch (action) {
    case "data":
      // Create a new meeting
      db.query(
        "SELECT * FROM main_admin_db.email_temp_myshop_pmt_update",

        (err, result) => {
          if (err) {
            console.log(
              err,
              "Error while getting data meeting email templates"
            );
          } else {
            res.status(200).send({ success: true, data: result });
          }
        }
      );
      break;

    case "subject":
      const { subject } = req.body; // Example: { id: 1, subject: 'Template Subject' }
      db.query(
        "UPDATE main_admin_db.email_temp_myshop_pmt_update SET subject = ? WHERE id = ?",
        [subject, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Subject.");
          } else {
            res.send({
              success: true,
              message: "! Subject Updated Successfully.",
            });
          }
        }
      );
      break;

    case "message":
      // Update an existing meeting
      const { message } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myshop_pmt_update SET message = ? WHERE id = ?",
        [message, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Message.");
          } else {
            res.send({
              success: true,
              message: "! Message Updated Successfully.",
            });
          }
        }
      );
      break;
    case "url":
      // Update an existing meeting
      const { url } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myshop_pmt_update SET url = ? WHERE id = ?",
        [url, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating URL.");
          } else {
            res.send({
              success: true,
              message: "! URL Updated Successfully.",
            });
          }
        }
      );
      break;
    case "caution":
      // Update an existing meeting
      const { caution } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myshop_pmt_update SET caution = ? WHERE id = ?",
        [caution, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Caution.");
          } else {
            res.send({
              success: true,
              message: "! Caution Updated Successfully.",
            });
          }
        }
      );
      break;
    case "sign":
      // Update an existing meeting
      const { sign } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myshop_pmt_update SET signature = ? WHERE id = ?",
        [sign, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating signature.");
          } else {
            res.send({
              success: true,
              message: "! signature Updated Successfully.",
            });
          }
        }
      );
      break;

    default:
      res.status(400).send({ message: "Invalid action" });
      break;
  }
};
const myHrmsPmtUpdate = (req, res) => {
  const { action } = req.params; // Assuming you have an 'action' parameter to specify the CRUD operation

  switch (action) {
    case "data":
      // Create a new meeting
      db.query(
        "SELECT * FROM main_admin_db.email_temp_myhrms_pmt_update",

        (err, result) => {
          if (err) {
            console.log(
              err,
              "Error while getting data meeting email templates"
            );
          } else {
            res.status(200).send({ success: true, data: result });
          }
        }
      );
      break;

    case "subject":
      const { subject } = req.body; // Example: { id: 1, subject: 'Template Subject' }
      db.query(
        "UPDATE main_admin_db.email_temp_myhrms_pmt_update SET subject = ? WHERE id = ?",
        [subject, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Subject.");
          } else {
            res.send({
              success: true,
              message: "! Subject Updated Successfully.",
            });
          }
        }
      );
      break;

    case "message":
      // Update an existing meeting
      const { message } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myhrms_pmt_update SET message = ? WHERE id = ?",
        [message, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Message.");
          } else {
            res.send({
              success: true,
              message: "! Message Updated Successfully.",
            });
          }
        }
      );
      break;
    case "url":
      // Update an existing meeting
      const { url } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myhrms_pmt_update SET url = ? WHERE id = ?",
        [url, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating URL.");
          } else {
            res.send({
              success: true,
              message: "! URL Updated Successfully.",
            });
          }
        }
      );
      break;
    case "caution":
      // Update an existing meeting
      const { caution } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myhrms_pmt_update SET caution = ? WHERE id = ?",
        [caution, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Caution.");
          } else {
            res.send({
              success: true,
              message: "! Caution Updated Successfully.",
            });
          }
        }
      );
      break;
    case "sign":
      // Update an existing meeting
      const { sign } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myhrms_pmt_update SET signature = ? WHERE id = ?",
        [sign, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating signature.");
          } else {
            res.send({
              success: true,
              message: "! signature Updated Successfully.",
            });
          }
        }
      );
      break;

    default:
      res.status(400).send({ message: "Invalid action" });
      break;
  }
};

//

const myShopOrderReq = (req, res) => {
  const { action } = req.params; // Assuming you have an 'action' parameter to specify the CRUD operation

  switch (action) {
    case "data":
      // Create a new meeting
      db.query(
        "SELECT * FROM main_admin_db.email_temp_myshop_order_request",

        (err, result) => {
          if (err) {
            console.log(
              err,
              "Error while getting data meeting email templates"
            );
          } else {
            res.status(200).send({ success: true, data: result });
          }
        }
      );
      break;

    case "subject":
      const { subject } = req.body; // Example: { id: 1, subject: 'Template Subject' }
      db.query(
        "UPDATE main_admin_db.email_temp_myshop_order_request SET subject = ? WHERE id = ?",
        [subject, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Subject.");
          } else {
            res.send({
              success: true,
              message: "! Subject Updated Successfully.",
            });
          }
        }
      );
      break;

    case "message":
      // Update an existing meeting
      const { message } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myshop_order_request SET message = ? WHERE id = ?",
        [message, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Message.");
          } else {
            res.send({
              success: true,
              message: "! Message Updated Successfully.",
            });
          }
        }
      );
      break;
    case "url":
      // Update an existing meeting
      const { url } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myshop_order_request SET url = ? WHERE id = ?",
        [url, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating URL.");
          } else {
            res.send({
              success: true,
              message: "! URL Updated Successfully.",
            });
          }
        }
      );
      break;
    case "caution":
      // Update an existing meeting
      const { caution } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myshop_order_request SET caution = ? WHERE id = ?",
        [caution, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Caution.");
          } else {
            res.send({
              success: true,
              message: "! Caution Updated Successfully.",
            });
          }
        }
      );
      break;
    case "sign":
      // Update an existing meeting
      const { sign } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myshop_order_request SET signature = ? WHERE id = ?",
        [sign, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating signature.");
          } else {
            res.send({
              success: true,
              message: "! signature Updated Successfully.",
            });
          }
        }
      );
      break;

    default:
      res.status(400).send({ message: "Invalid action" });
      break;
  }
};

const myHrmsOrderReq = (req, res) => {
  const { action } = req.params; // Assuming you have an 'action' parameter to specify the CRUD operation

  switch (action) {
    case "data":
      // Create a new meeting
      db.query(
        "SELECT * FROM main_admin_db.email_temp_myhrms_order_request",

        (err, result) => {
          if (err) {
            console.log(
              err,
              "Error while getting data meeting email templates"
            );
          } else {
            res.status(200).send({ success: true, data: result });
          }
        }
      );
      break;

    case "subject":
      const { subject } = req.body; // Example: { id: 1, subject: 'Template Subject' }
      db.query(
        "UPDATE main_admin_db.email_temp_myhrms_order_request SET subject = ? WHERE id = ?",
        [subject, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Subject.");
          } else {
            res.send({
              success: true,
              message: "! Subject Updated Successfully.",
            });
          }
        }
      );
      break;

    case "message":
      // Update an existing meeting
      const { message } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myhrms_order_request SET message = ? WHERE id = ?",
        [message, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Message.");
          } else {
            res.send({
              success: true,
              message: "! Message Updated Successfully.",
            });
          }
        }
      );
      break;
    case "url":
      // Update an existing meeting
      const { url } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myhrms_order_request SET url = ? WHERE id = ?",
        [url, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating URL.");
          } else {
            res.send({
              success: true,
              message: "! URL Updated Successfully.",
            });
          }
        }
      );
      break;
    case "caution":
      // Update an existing meeting
      const { caution } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myhrms_order_request SET caution = ? WHERE id = ?",
        [caution, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating Caution.");
          } else {
            res.send({
              success: true,
              message: "! Caution Updated Successfully.",
            });
          }
        }
      );
      break;
    case "sign":
      // Update an existing meeting
      const { sign } = req.body; // Example: { id: 1, name: 'Updated Meeting Name' }
      db.query(
        "UPDATE main_admin_db.email_temp_myhrms_order_request SET signature = ? WHERE id = ?",
        [sign, 1],
        (err, result) => {
          if (err) {
            console.log(err, " : Error While Updating signature.");
          } else {
            res.send({
              success: true,
              message: "! signature Updated Successfully.",
            });
          }
        }
      );
      break;

    default:
      res.status(400).send({ message: "Invalid action" });
      break;
  }
};
module.exports = {
  Meeting,
  buyAgain,
  trainingMaterial,
  ExerciseUpload,
  exerciseAnswer,
  myShopOrderReq,
  myHrmsOrderReq,
  ProformOnlineInv,
  myShopPmtUpdate,
  myHrmsPmtUpdate,
};
