import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 },
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    // Fallback/Mock mode if SMTP credentials are not configured in environment
    if (!emailUser || !emailPass) {
      console.warn("SMTP credentials not configured. Running in MOCK mode.");
      return NextResponse.json({
        success: true,
        message:
          "Message processed successfully (MOCK mode). Please set EMAIL_USER and EMAIL_PASS in .env.local for live SMTP delivery.",
        mock: true,
      });
    }

    // Configure Nodemailer with Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass, // Must be a 16-digit App Password, not normal account password
      },
    });

    const mailOptions = {
      from: `"${name}" <${emailUser}>`, // Must send from the authenticated email
      replyTo: email, // Direct replies back to the sender's actual email
      to: emailUser, // Send message to the authenticated receiver
      subject: `Portfolio: ${subject || "Collaboration Opportunity"}`,
      text: `You received a new message from your portfolio website:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #61DAFB; border-bottom: 2px solid #61DAFB; padding-bottom: 10px;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #7C3AED; border-radius: 4px;">
            <p style="white-space: pre-wrap; margin: 0; font-size: 14px; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully via SMTP!",
    });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { error: "Failed to transmit message through server SMTP." },
      { status: 500 },
    );
  }
}
