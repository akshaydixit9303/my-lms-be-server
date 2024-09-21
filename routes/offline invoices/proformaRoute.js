const express = require("express");
const ProformaInvoice = require("../../controllers/Offline Invoices/Proforma");
const router = express();

router.get("/corp/customer/data/:cust_id", (req, res) => {
  ProformaInvoice.getCorporateCustData(req, res);
});

router.post("/corp/cust/create/invoice", (req, res) => {
  ProformaInvoice.createCorpProformaInv(req, res);
});
// get all invoices of a custoer in corporate

router.get("/get/all/invoices/customer/:cust_id", (req, res) => {
  ProformaInvoice.getAllInvoiceCust(req, res);
});
router.put("/update/corp/cust/create/invoice", (req, res) => {
  ProformaInvoice.updatePaidInvoice(req, res);
});
router.get("/all/part/pay/order/id/:cust_id/:id", (req, res) => {
  ProformaInvoice.checkOrders(req, res);
});
router.get("/get/prv/invoice/data/order/:cust_id/:order_id", (req, res) => {
  ProformaInvoice.getOrderDetails(req, res);
});
router.get("/view/inoices/:file_name", (req, res) => {
  const { file_name } = req.params;
  res.sendFile(file_name, { root: "./offline_invoices/" });
});

router.get("/get/all/order/invoice/data", (req, res) => {
  ProformaInvoice.getOrderInvoices(req, res);
});
module.exports = router;
