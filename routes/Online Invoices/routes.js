const express = require("express");
const router = express();
const onlineInvoices = require("../../controllers/Online Invoices/Invoices");

router.post("/proforma", (req, res) => {
  onlineInvoices.createProforma(req, res);
});

router.put("/update/proforma/invoice", (req, res) => {
  onlineInvoices.updateProformaInv(req, res);
});

module.exports = router;
