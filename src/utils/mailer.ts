import nodemailer from 'nodemailer';
import config from '../config/env';

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  secure: config.smtpPort === 465,
  auth: config.smtpUser ? { user: config.smtpUser, pass: config.smtpPass } : undefined,
});

export async function sendMail(opts: { subject: string; html: string; replyTo?: string }) {
  await transporter.sendMail({
    from: config.mailFrom,
    to: config.adminEmail,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
  });
}
