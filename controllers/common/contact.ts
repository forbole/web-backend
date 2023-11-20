import type { NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer";

// mailgun secrets for making POST requests via Mailgun
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

export const contact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (process.env.NODE_ENV === "production") {
      await transporter.sendMail(req.body);
    }
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
