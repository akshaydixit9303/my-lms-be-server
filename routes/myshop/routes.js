const express = require("express");
const router = express();
const myhrms = require("../../controllers/myshop/myshop");

router.get("/get/all/customer/data", (req, res) => {
  myhrms.getCustomerData(req, res);
});

router.get("/get/customer/roles/:id", (req, res) => {
  myhrms.getRoles(req, res);
});

router.get("/get/all/permissions/:id/:role_code", (req, res) => {
  myhrms.getAllPermissions(req, res);
});
router.put("/update/sub/menu/data/role", (req, res) => {
  myhrms.updateSubMenu(req, res);
});
router.put("/update/menu/data/role", (req, res) => {
  myhrms.updateMenu(req, res);
});

module.exports = router;
