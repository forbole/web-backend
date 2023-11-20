import express from "express";

import commonRouter from "./common";

const router = express.Router();

router.use("/common", commonRouter);

export default router;
