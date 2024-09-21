const express = require("express");
const router = express();
const myhrms = require("../../controllers/MYHRMS/myhrms");

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

router.post("/role-code/pid", (req, res) => {
  myhrms.createRolePid(req, res);
});

router.get("/permission/table", (req, res) => {
  myhrms.getPermissionTable(req, res);
});
router.post("/create/permission", (req, res) => {
  myhrms.createPermission(req, res);
});

router.get("/default/permission", (req, res) => {
  myhrms.getDefaultPermission(req, res);
});

// get active customers
router.get("/active/customer", (req, res) => {
  myhrms.getActiveCustomers(req, res);
});
router.get("/get/emp/roles/:cust_id", (req, res) => {
  myhrms.getCustomersConfig(req, res);
});

// permissions
router.post("/create/permission/template", (req, res) => {
  myhrms.createPermissionTemp(req, res);
});
router.get("/role/wise/permission/:role_code/:cust_id", (req, res) => {
  myhrms.roleWisePermission(req, res);
});
module.exports = router;
