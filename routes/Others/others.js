const express = require("express");
const getCustomer = require("../../controllers/Others/GetCustomer");
const buyMethods = require("../../controllers/Others/BuyMethod");
const router = express();

router.get("/customer/:id/:serv_id", (req, res) => {
  getCustomer.getCustomerData(req, res);
});
router.put("/update", (req, res) => {
  getCustomer.updateCustomerData(req, res);
});

router.put("/update/by", (req, res) => {
  getCustomer.updateCustomerData(req, res);
});

router.put("/delete/customer/:cust_type", (req, res) => {
  getCustomer.deleteCustomer(req, res);
});

router.get("/pay/method/service/data/:id", (req, res) => {
  buyMethods.BuyMethod(req, res);
});
router.put("/update/service/buy/method", (req, res) => {
  buyMethods.UpdateBuyMethod(req, res);
});
module.exports = router;
