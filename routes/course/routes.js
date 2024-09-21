const express = require("express");
const router = express();

const db = require("../../config/db");
const Course = require("../../controllers/Course/controllers");

//skkills
router.post("/add/skills", (req, res) => {
  Course.addSkills(req, res);
});

router.get("/skills/data/:course_id", (req, res) => {
  Course.getAllSkills(req, res);
});
router.delete("/del/skill/:id", (req, res) => {
  Course.delSkill(req, res);
});
// outcome
router.post("/add/outcome", (req, res) => {
  Course.addOutcome(req, res);
});

router.get("/outcome/data/:course_id", (req, res) => {
  Course.getAllOutomes(req, res);
});

router.delete("/del/outcome/:id", (req, res) => {
  Course.delOutcome(req, res);
});

// schdule
router.post("/add/schedule", (req, res) => {
  Course.addSchedule(req, res);
});

router.get("/schedule/data/:course_id", (req, res) => {
  Course.getAllSchedule(req, res);
});

router.delete("/del/schedule/:id", (req, res) => {
  Course.delSchedule(req, res);
});

// ex-list
router.put("/update/ex-list", (req, res) => {
  Course.updateExList(req, res);
});

router.put("/des/img", (req, res) => {
  Course.updateDesImg(req, res);
});
router.put("/outline/img", (req, res) => {
  Course.updateOutlineImg(req, res);
});
router.put("/publish", (req, res) => {
  Course.publishCourse(req, res);
});
router.get("/list/data/:cat_id", (req, res) => {
  // +
  // "JOIN `myveda-db`.course_skills_gain AS csg ON ac.course_id = csg.course_id " +
  // "JOIN `myveda-db`.course_skills_outcome AS cso ON ac.course_id = cso.course_id " +
  // "WHERE ac.stats = ? "

  const { cat_id } = req.params;
  db.query(
    `
    SELECT *
FROM
    \`myveda-db\`.add_courses 
    where 
    stats = 1 and cat_id = ?

`,
    [cat_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/skill/outcome/:id/:c_id", (req, res) => {
  Course.skillOutcome(req, res);
});
router.get("/categories", (req, res) => {
  Course.getCategories(req, res);
});
module.exports = router;
