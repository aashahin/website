import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "جميع الحقول مطلوبة",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "يرجى إدخال عنوان بريد إلكتروني صحيح",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST,
      port: parseInt(import.meta.env.SMTP_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${import.meta.env.SMTP_USER}>`,
      to: import.meta.env.SMTP_USER,
      replyTo: email,
      subject: `رسالة من الموقع: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
          <h2>رسالة جديدة من موقعك الشخصي</h2>
          <hr>
          <p><strong>الاسم:</strong> ${name}</p>
          <p><strong>البريد الإلكتروني:</strong> ${email}</p>
          <p><strong>الموضوع:</strong> ${subject}</p>
          <hr>
          <h3>الرسالة:</h3>
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, "<br>")}
          </p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            تم إرسال هذه الرسالة من نموذج الاتصال في موقعك الشخصي
          </p>
        </div>
      `,
      text: `
        رسالة جديدة من موقعك الشخصي
        
        الاسم: ${name}
        البريد الإلكتروني: ${email}
        الموضوع: ${subject}
        
        الرسالة:
        ${message}
        
        تم إرسال هذه الرسالة من نموذج الاتصال في موقعك الشخصي
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({
        success: true,
        message: "تم إرسال الرسالة بنجاح!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Email sending error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
