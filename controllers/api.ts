import "dotenv-defaults/config";
import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";

// mailgun secrets for POST request via Mailgun
const transporter = nodemailer.createTransport({
  service: "Mailgun",
  host: "smtp.mailgun.org",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_GUN_USER,
    pass: process.env.MAIL_GUN_PW,
  },
});

export const postMailgun = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (process.env.NODE_ENV === "production") {
      await transporter.sendMail(req.body);
    }
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    next(e);
  }
};
