import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { sendMail } from '../utils/mailer';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sendEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, arrival, guests, package: packageName, message } = req.body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    throw new ApiError(400, 'Name, email, and message are required');
  }
  if (!EMAIL_RE.test(email.trim())) {
    throw new ApiError(400, 'Please provide a valid email address');
  }

  await sendMail({
    subject: `New enquiry from ${name.trim()}`,
    replyTo: email.trim(),
    html: `
      <p><strong>Name:</strong> ${name.trim()}</p>
      <p><strong>Email:</strong> ${email.trim()}</p>
      <p><strong>Arrival:</strong> ${arrival?.trim() || '—'}</p>
      <p><strong>Guests:</strong> ${guests?.trim() || '—'}</p>
      <p><strong>Interested in:</strong> ${packageName?.trim() || '—'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.trim().replace(/\n/g, '<br/>')}</p>
    `,
  });

  res.status(200).json({ success: true, data: { sent: true } });
});

export const subscribeNewsletter = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body as Record<string, string>;

  if (!email?.trim() || !EMAIL_RE.test(email.trim())) {
    throw new ApiError(400, 'Please provide a valid email address');
  }

  await sendMail({
    subject: 'New newsletter signup',
    replyTo: email.trim(),
    html: `<p><strong>Email:</strong> ${email.trim()}</p>`,
  });

  res.status(200).json({ success: true, data: { sent: true } });
});
