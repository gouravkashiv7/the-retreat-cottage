import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import nodemailer from "npm:nodemailer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { guestName, guestEmail } = await req.json();

    if (!guestEmail) {
      throw new Error("Guest email is required.");
    }

    const transporter = nodemailer.createTransport({
      host: Deno.env.get("EMAIL_HOST"),
      port: Number(Deno.env.get("EMAIL_PORT")),
      secure: false, // true for 465, false for others
      auth: {
        user: Deno.env.get("EMAIL_USER"),
        pass: Deno.env.get("EMAIL_PASSWORD"),
      },
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to The Retreat</title>
    <style>
        body {
            font-family: 'Josefin Sans', 'Segoe UI', serif;
            line-height: 1.6;
            color: #1a232e;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            border: 1px solid #e2e8f0;
        }
        .header {
            background-color: #141c24;
            color: #ffffff;
            padding: 60px 40px;
            text-align: center;
            border-bottom: 4px solid #c69963;
        }
        .header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 300;
            letter-spacing: 4px;
            text-transform: uppercase;
        }
        .content {
            padding: 50px 40px;
        }
        .greeting {
            font-size: 24px;
            font-weight: 400;
            margin-bottom: 24px;
            color: #141c24;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 16px;
        }
        .message {
            font-size: 16px;
            color: #475569;
            margin-bottom: 24px;
            font-weight: 300;
        }
        .cta-container {
            text-align: center;
            margin: 48px 0;
        }
        .btn {
            background-color: #c69963;
            color: #ffffff !important;
            padding: 18px 40px;
            text-decoration: none;
            border-radius: 0px;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 2px;
            display: inline-block;
            transition: all 0.3s ease;
        }
        .activities {
            background-color: #141c24;
            padding: 40px;
            border-radius: 0;
            margin-top: 40px;
            color: #d4dee7;
        }
        .activities h3 {
            margin-top: 0;
            color: #c69963;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 24px;
            font-weight: 400;
        }
        .activities ul {
            padding-left: 0;
            list-style: none;
            margin: 0;
        }
        .activities li {
            margin-bottom: 20px;
            border-left: 2px solid #c69963;
            padding-left: 20px;
        }
        .activities li strong {
            display: block;
            color: #ffffff;
            margin-bottom: 4px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .activities li span {
            font-size: 14px;
            color: #94a3b8;
        }
        .footer {
            padding: 40px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            background-color: #f8fafc;
        }
        .footer p {
            margin: 8px 0;
            letter-spacing: 1px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>The Retreat Cottage</h1>
        </div>
        <div class="content">
            <div class="greeting">Welcome, ${guestName}</div>
            <div class="message">
                We are honored to welcome you to <strong>The Retreat Cottage</strong> family. Your registration is complete, marking the beginning of a bespoke journey into the heart of the mountains.
            </div>
            
            <div class="message">
                Experience the perfect blend of rustic charm and modern luxury. Manage your upcoming stay and explore our curated services through your personal dashboard.
            </div>

            <div class="cta-container">
                <a href="https://retreatcottage.in/login" class="btn">Access Dashboard</a>
            </div>

            <div class="activities">
                <h3>The Mountain Experience</h3>
                <ul>
                    <li>
                        <strong>Mountain & Outdoor Dining</strong>
                        <span>Experience the magic of dining under the stars, nestled below the whispering pine trees.</span>
                    </li>
                    <li>
                        <strong>Barbeque & Camp Fire</strong>
                        <span>Cozy evenings with gourmet grills and the warmth of a crackling mountain hearth.</span>
                    </li>
                    <li>
                        <strong>Toy Train Trek nearby</strong>
                        <span>Discover the historic Kalka-Shimla rail trails and breathtaking mountain paths just steps away.</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer">
            <p>&copy; 2026 THE RETREAT COTTAGE. ALL RIGHTS RESERVED.</p>
            <p>ELEGANCE IN THE WILD</p>
        </div>
    </div>
</body>
</html>
    `;

    const info = await transporter.sendMail({
      from: `"The Retreat Cottage" <${Deno.env.get("EMAIL_USER")}>`,
      to: guestEmail,
      subject: `Your Journey Begins at The Retreat Cottage`,
      html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId);

    return new Response(JSON.stringify({ success: true, messageId: info.messageId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
