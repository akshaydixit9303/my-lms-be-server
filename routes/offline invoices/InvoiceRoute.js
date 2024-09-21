const express = require("express");
const offlineInvoices = require("../../controllers/Offline Invoices/OfflineInvoice");
const router = express();

router.get("/customer/invoices/:id/:cust_id", (req, res) => {
  offlineInvoices.getAllInvoicesCustomer(req, res);
});
router.get("/invoice/file/:id/:file_name", (req, res) => {
  const { id, file_name } = req.params;
  if (parseInt(id) === 1) {
    res.sendFile(file_name, { root: "./invoices/" });
  } else if (parseInt(id) === 8) {
    res.sendFile(file_name, { root: "./praxis_invoices/" });
  } else if (parseInt(id) === 9) {
    res.sendFile(file_name, { root: "./myshop_invoices/" });
  } else if (parseInt(id) === 10) {
    res.sendFile(file_name, { root: "./myhrms_invoices/" });
  } else {
    res.sendFile(file_name, { root: "./other_invoices/" });
  }
});
router.get("/get/orders/invoice/data/gst", (req, res) => {
  offlineInvoices.getAllDataGraph(req, res);
});
router.get("/get/all/success/inoice/order/dashboard",(req,res)=>{
  offlineInvoices.getAllDashGraphData(req,res)
})
module.exports = router;
