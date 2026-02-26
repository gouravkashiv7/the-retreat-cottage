import nodemailer from "nodemailer";
import { getWelcomeEmailTemplate } from "@/app/_emails/WelcomeTemplate";

/**
 * Send a welcome email to a new guest
 *
 * @param {string} email - Recipient email address
 * @param {string} name - Guest's full name
 */
export async function sendWelcomeEmail(email, name) {
  // Transporter configuration for Hostinger
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: true, // Use SSL/TLS for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { html, text } = getWelcomeEmailTemplate(name);

  try {
    const info = await transporter.sendMail({
      from: `"${process.env.NEXT_PUBLIC_SITE_NAME || "The Retreat Cottage"}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Welcome to The Retreat Cottage, ${name.split(" ")[0]}!`,
      text: text,
      html: html,
    });

    console.log("Welcome email sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error: error.message };
  }
}
