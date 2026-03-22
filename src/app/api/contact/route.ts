import { NextRequest, NextResponse } from "next/server";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactForm = await request.json();
    const { name, email, subject, message } = data;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    // ===========================================
    // 1. SEND EMAIL via Resend
    // ===========================================
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #f97316, #ea580c); border-radius: 12px; margin-bottom: 16px;">
              <div style="height: 100%; display: flex; align-items: center; justify-content: center; font-size: 24px;">📧</div>
            </div>
            <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 700;">New Contact Form Submission</h1>
            <p style="color: #71717a; font-size: 14px; margin-top: 8px;">From your portfolio website</p>
          </div>

          <!-- Main Card -->
          <div style="background: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
            <!-- Sender Info -->
            <div style="margin-bottom: 24px;">
              <h2 style="color: #f97316; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">Sender Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #71717a; font-size: 14px; width: 80px;">Name</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Email</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${email}" style="color: #f97316; text-decoration: none; font-size: 14px;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717a; font-size: 14px;">Subject</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px;">${subject}</td>
                </tr>
              </table>
            </div>

            <!-- Divider -->
            <div style="height: 1px; background: #27272a; margin-bottom: 24px;"></div>

            <!-- Message -->
            <div>
              <h2 style="color: #f97316; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">Message</h2>
              <div style="background: #09090b; border-radius: 12px; padding: 16px; border: 1px solid #27272a;">
                <p style="color: #d4d4d8; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>

          <!-- Reply Button -->
          <div style="text-align: center; margin-bottom: 32px;">
            <a href="mailto:${email}?subject=Re: ${subject}" style="display: inline-block; background: linear-gradient(135deg, #f97316, #ea580c); color: #000000; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">
              Reply to ${name}
            </a>
          </div>

          <!-- Footer -->
          <div style="text-align: center; padding-top: 24px; border-top: 1px solid #27272a;">
            <p style="color: #52525b; font-size: 12px; margin: 0;">
              Sent from <span style="color: #f97316;">Siddhesh Salve</span>'s Portfolio
            </p>
            <p style="color: #3f3f46; font-size: 11px; margin-top: 8px;">
              ${timestamp} (IST)
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || "siddhesh.salve77@gmail.com";

    if (resendApiKey && resendApiKey !== "your_resend_api_key_here") {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: contactEmail,
            subject: `[Portfolio] ${subject}`,
            html: emailHtml,
            reply_to: email,
          }),
        });

        if (emailResponse.ok) {
          emailSent = true;
          console.log("✅ Email sent successfully via Resend");
        } else {
          const errorData = await emailResponse.json();
          console.error("❌ Resend error:", errorData);
        }
      } catch (emailError) {
        console.error("❌ Email sending error:", emailError);
      }
    } else {
      console.log("⚠️ No RESEND_API_KEY configured - skipping email");
    }

    // ===========================================
    // 2. SEND TELEGRAM MESSAGE (Free & Direct)
    // ===========================================
    let telegramSent = false;
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramBotToken && telegramChatId && 
        telegramBotToken !== "your_telegram_bot_token_here" &&
        telegramChatId !== "your_telegram_chat_id_here") {
      try {
        // Format message for Telegram with HTML styling
        const telegramMessage = `
🔔 <b>New Portfolio Contact</b>

<b>👤 Name:</b> ${name}
<b>📧 Email:</b> <a href="mailto:${email}">${email}</a>
<b>📝 Subject:</b> ${subject}

<b>💬 Message:</b>
<pre>${message}</pre>

<i>📅 ${timestamp} (IST)</i>
`.trim();

        const telegramResponse = await fetch(
          `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: telegramMessage,
              parse_mode: "HTML",
              disable_web_page_preview: true,
            }),
          }
        );

        if (telegramResponse.ok) {
          telegramSent = true;
          console.log("✅ Telegram message sent successfully");
        } else {
          const errorData = await telegramResponse.json();
          console.error("❌ Telegram error:", errorData);
        }
      } catch (telegramError) {
        console.error("❌ Telegram sending error:", telegramError);
      }
    } else {
      console.log("⚠️ Telegram not configured - skipping Telegram notification");
      console.log("To enable: Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env");
    }

    // ===========================================
    // 3. LOG THE SUBMISSION
    // ===========================================
    console.log("📋 Contact Form Submission:", {
      name,
      email,
      subject,
      message: message.substring(0, 100) + "...",
      emailSent,
      telegramSent,
    });

    // Return success
    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      emailSent,
      telegramSent,
    });
  } catch (error) {
    console.error("❌ Contact form error:", error);
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}
