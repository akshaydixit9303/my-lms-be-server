import { EngRevisit } from "../controllers/Email";

const express = require("express");

const router = express.Router();

router.get("/eng/revisit/data", EngRevisit);

export default router;
