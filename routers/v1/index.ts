import express from "express";
import commonRouter from "./common";

const router = express.Router();

module.exports = router;

router.use("/common", commonRouter);

export default router;
