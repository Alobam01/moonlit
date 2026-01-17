import nodemailer from "nodemailer";

// Email configuration from environment variables
const emailPort = parseInt(process.env.EMAIL_PORT || "465", 10);
const emailConfig = {
  host: process.env.EMAIL_HOST || "s12.my-control-panel.com",
  port: emailPort,
  // Port 465 always uses SSL, otherwise check environment variable
  secure: emailPort === 465 || process.env.EMAIL_USE_SSL === "True" || process.env.EMAIL_USE_SSL === "true",
  auth: {
    user: process.env.EMAIL_HOST_USER || "info@grandfortunion.hqmngtt.com",
    pass: process.env.EMAIL_HOST_PASSWORD || "",
  },
};

// Create reusable transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify transporter configuration
export async function verifyEmailConnection() {
  try {
    await transporter.verify();
    console.log("Email server is ready to send messages");
    return true;
  } catch (error) {
    console.error("Email server connection failed:", error);
    return false;
  }
}

// Send inquiry email to admin
export async function sendInquiryEmail(data: {
  name: string;
  email: string;
  phone?: string;
  breed?: string;
  message: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_HOST_USER || "info@grandfortunion.hqmngtt.com";
  const fromEmail = process.env.DEFAULT_FROM_EMAIL || process.env.EMAIL_HOST_USER || "info@grandfortunion.hqmngtt.com";

  const mailOptions = {
    from: `"Moonlit Elegance Kittens" <${fromEmail}>`,
    to: adminEmail,
    replyTo: data.email,
    subject: `New Kitten Inquiry from ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f8b4b4 0%, #f5a5a5 100%); padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; margin-bottom: 5px; display: block; }
            .value { color: #333; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #f8b4b4; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0; color: white;">New Kitten Inquiry</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <span class="value">${data.name}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
              </div>
              ${data.phone ? `
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
              </div>
              ` : ""}
              ${data.breed ? `
              <div class="field">
                <span class="label">Breed Interest:</span>
                <span class="value">${data.breed}</span>
              </div>
              ` : ""}
              <div class="field">
                <span class="label">Message:</span>
                <div class="message-box">
                  <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
                </div>
              </div>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 12px; color: #888; margin: 0;">
                This inquiry was submitted through the Moonlit Elegance Kittens website.<br>
                You can reply directly to this email to respond to ${data.name}.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Kitten Inquiry from ${data.name}

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ""}
${data.breed ? `Breed Interest: ${data.breed}` : ""}

Message:
${data.message}

---
This inquiry was submitted through the Moonlit Elegance Kittens website.
You can reply directly to this email to respond to ${data.name}.
    `.trim(),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
