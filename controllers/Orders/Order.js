const db = require("../../config/db");

const getMyVeda = async (req, res) => {
  try {
    const newCompbinedData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * from main_admin_db.tax_invoice_order_myvedait where service_id = 1 and order_id is not null",
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

    console.log(newCompbinedData, "data");
    res.status(200).send({ success: true, data: newCompbinedData });
  } catch (error) {
    console.log(error);
  }
};

const getItSupport = async (req, res) => {
  try {
    const newCompbinedData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * from main_admin_db.tax_invoice_order_myvedait where service_id = 2 and order_id is not null",
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

    console.log(newCompbinedData, "data");
    res.status(200).send({ success: true, data: newCompbinedData });
  } catch (error) {
    console.log(error);
  }
};
const getMyItShop = async (req, res) => {
  try {
    const newCompbinedData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * from main_admin_db.tax_invoice_order_myvedait where service_id = 3 and order_id is not null",
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

    console.log(newCompbinedData, "data");
    res.status(200).send({ success: true, data: newCompbinedData });
  } catch (error) {
    console.log(error);
  }
};
const getManagedIt = async (req, res) => {
  try {
    const newCompbinedData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * from main_admin_db.tax_invoice_order_myvedait where service_id = 4 and order_id is not null",
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

    console.log(newCompbinedData, "data");
    res.status(200).send({ success: true, data: newCompbinedData });
  } catch (error) {
    console.log(error);
  }
};
const getMyWeb = async (req, res) => {
  try {
    const newCompbinedData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * from main_admin_db.tax_invoice_order_myvedait where service_id = 5 and order_id is not null",
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

    console.log(newCompbinedData, "data");
    res.status(200).send({ success: true, data: newCompbinedData });
  } catch (error) {
    console.log(error);
  }
};
const getMyCompliance = async (req, res) => {
  try {
    const newCompbinedData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * from main_admin_db.tax_invoice_order_myvedait where service_id = 6 and order_id is not null",
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

    console.log(newCompbinedData, "data");
    res.status(200).send({ success: true, data: newCompbinedData });
  } catch (error) {
    console.log(error);
  }
};
const getLms = async (req, res) => {
  try {
    const newCompbinedData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * from main_admin_db.tax_invoice_order_myvedait where service_id = 7 and order_id is not null",
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

    console.log(newCompbinedData, "data");
    res.status(200).send({ success: true, data: newCompbinedData });
  } catch (error) {
    console.log(error);
  }
};
const getPraxis = async (req, res) => {
  try {
    const newCompbinedData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * from main_admin_db.tax_invoice_order_myvedait where service_id = 8 and order_id is not null",
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

    console.log(newCompbinedData, "data");
    res.status(200).send({ success: true, data: newCompbinedData });
  } catch (error) {
    console.log(error);
  }
};
const getMyShop = async (req, res) => {
  try {
    const newCompbinedData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * from main_admin_db.tax_invoice_order_myvedait where service_id = 9 and order_id is not null",
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

    res.status(200).send({ success: true, data: newCompbinedData });
  } catch (error) {
    console.log(error);
  }
};

const getMyHrms = async (req, res) => {
  try {
    const newCompbinedData = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * from main_admin_db.tax_invoice_order_myvedait where service_id = 10 and order_id is not null",
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

    res.status(200).send({ success: true, data: newCompbinedData });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMyShop,
  getMyCompliance,
  getItSupport,
  getManagedIt,
  getMyHrms,
  getPraxis,
  getMyWeb,
  getMyItShop,
  getMyVeda,
  getLms,
};
