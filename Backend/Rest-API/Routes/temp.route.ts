import { Temp } from "../controllers/temp.controller.ts";
import express, { Request, Response } from "express";

const router = express.Router();

router.route("/").get(Temp);

export default router;
