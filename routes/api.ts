// import * as express from "express";
// const express = require("express");
import express from "express"
const router = express.Router();


import { postMailgun } from "../controllers/api";

router.post("/contact", postMailgun);

module.exports = router;
