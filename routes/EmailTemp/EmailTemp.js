const express = require("express");
const router = express();
const EmailTemp = require("../../controllers/EmailTemp/EmailTemp");

router.put("/meeting/:action", (req, res) => {
  EmailTemp.Meeting(req, res);
});
router.put("/buy/again/:action", (req, res) => {
  EmailTemp.buyAgain(req, res);
});
router.get("/get/meeting/data/:action", (req, res) => {
  EmailTemp.Meeting(req, res);
});
router.get("/get/buy/again/:action", (req, res) => {
  EmailTemp.buyAgain(req, res);
});
router.put("/training/material/:action", (req, res) => {
  EmailTemp.trainingMaterial(req, res);
});
router.get("/get/training/material/:action", (req, res) => {
  EmailTemp.trainingMaterial(req, res);
});

// trainer exercise upload
router.put("/exercise/upload/:action", (req, res) => {
  EmailTemp.ExerciseUpload(req, res);
});
router.get("/get/exercise/upload/:action", (req, res) => {
  EmailTemp.ExerciseUpload(req, res);
});
// leanrer exercise answer
router.put("/exercise/answer/:action", (req, res) => {
  EmailTemp.exerciseAnswer(req, res);
});
router.get("/get/exercise/answer/:action", (req, res) => {
  EmailTemp.exerciseAnswer(req, res);
});

// leanrer exercise answer
router.put("/online/proforma/inv/:action", (req, res) => {
  EmailTemp.ProformOnlineInv(req, res);
});
router.get("/get/online/proforma/inv/:action", (req, res) => {
  EmailTemp.ProformOnlineInv(req, res);
});

// myshop payement update
router.put("/myshop/pmt/:action", (req, res) => {
  EmailTemp.myShopPmtUpdate(req, res);
});
router.get("/get/myshop/pmt/:action", (req, res) => {
  EmailTemp.myShopPmtUpdate(req, res);
});
// myhrms payment update
router.put("/myhrms/pmt/:action", (req, res) => {
  EmailTemp.myHrmsPmtUpdate(req, res);
});
router.get("/get/myhrms/pmt/:action", (req, res) => {
  EmailTemp.myHrmsPmtUpdate(req, res);
});

// myshop order request
router.put("/myshop/ord/req/:action", (req, res) => {
  EmailTemp.myShopOrderReq(req, res);
});
router.get("/get/myshop/ord/req/:action", (req, res) => {
  EmailTemp.myShopOrderReq(req, res);
});
// myhrms order request
router.put("/myhrms/ord/req/:action", (req, res) => {
  EmailTemp.myHrmsOrderReq(req, res);
});
router.get("/get/myhrms/ord/req/:action", (req, res) => {
  EmailTemp.myHrmsOrderReq(req, res);
});
module.exports = router;
