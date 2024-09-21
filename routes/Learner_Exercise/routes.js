const express = require("express");
const router = express();
const path = require("path");
const app = express();

const learnerExercise = require("../../controllers/Learner_Exercise/Exercise");

router.post("/create", (req, res) => {
  learnerExercise.addLearnerExercise(req, res);
});
router.get("/data/:batch_id/:course_id", (req, res) => {
  learnerExercise.getData(req, res);
});
router.post("/submit", (req, res) => {
  learnerExercise.submitExercise(req, res);
});
router.get("/submitted/data/:ex_id/:batch_id/:course_id", (req, res) => {
  learnerExercise.getSubmittedData(req, res);
});

router.get("/view/:file_name", (req, res) => {
  try {
    const { file_name } = req.params;
    const newPAth = path.join(
      __dirname,
      "../../Exercise_MGMT/Submitted_Exercises"
    );

    res.sendFile(file_name, {
      root: newPAth,
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/learner/data/:uid", (req, res) => {
  learnerExercise.getLearnerData(req, res);
});
router.put("/update/answer", (req, res) => {
  learnerExercise.updateAnswer(req, res);
});
module.exports = router;
