import express from 'express'
import "dotenv/config"
import nodemailer from 'nodemailer'
const router = express.Router();



router.post("/", async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // 1️⃣ Email to YOU (admin)
    const adminMail = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_TO, // your inbox
      subject: `📩 New message from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // 2️⃣ Confirmation Email to CUSTOMER
    const customerMail = {
      from: `"Marine Services" <${process.env.EMAIL_USER}>`, // shows your brand
      to: email, // customer's email
      subject: "✅ We received your message!",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out to <strong>Marine Services</strong>. We have received your message and our team will get back to you within 24 hours.</p>
        <hr/>
        <p><strong>Your Message:</strong></p>
        <blockquote>${message}</blockquote>
        <p style="margin-top:20px;">Best regards,<br/>Marine Services Team</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMail);
    await transporter.sendMail(customerMail);

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("❌ Email Error:", err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});


export default router
