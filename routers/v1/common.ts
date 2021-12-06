import express from "express"
import { commonController } from "../../controllers";

const router = express.Router();

router.post("/", commonController.v1.contact);

export default router;
