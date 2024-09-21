const express = require("express");
const router = express();
const Orders = require("../../controllers/Orders/Order");

router.get("/myitshop", (req, res) => {
  Orders.getMyItShop(req, res);
});

router.get("/myhrms", (req, res) => {
  Orders.getMyHrms(req, res);
});
router.get("/myshop", (req, res) => {
  Orders.getMyShop(req, res);
});

router.get("/myveda", (req, res) => {
  Orders.getMyVeda(req, res);
});
router.get("/praxis", (req, res) => {
  Orders.getPraxis(req, res);
});
router.get("/myweb", (req, res) => {
  Orders.getMyWeb(req, res);
});
router.get("/mylms", (req, res) => {
  Orders.getLms(req, res);
});
router.get("/compliance", (req, res) => {
  Orders.getMyCompliance(req, res);
});
router.get("/managed-it", (req, res) => {
  Orders.getManagedIt(req, res);
});
module.exports = router;
