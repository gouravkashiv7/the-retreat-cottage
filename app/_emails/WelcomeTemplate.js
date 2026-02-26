/**
 * Welcome Email Template
 *
 * @param {string} name - Guest's full name
 * @returns {object} - Object containing html and text versions of the email
 */
export function getWelcomeEmailTemplate(name) {
  const firstName = name.split(" ")[0];

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: 'Josefin Sans', sans-serif;
            line-height: 1.6;
            color: #1b2631;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #faf5f0;
          }
          .header {
            background-color: #141c24;
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            color: #c69963;
            margin: 0;
            font-size: 28px;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .content {
            padding: 40px 30px;
            background-color: #ffffff;
            border-radius: 8px;
            margin-top: -20px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          }
          .footer {
            text-align: center;
            padding: 30px;
            font-size: 12px;
            color: #7c99b6;
          }
          .button {
            display: inline-block;
            padding: 15px 35px;
            background-color: #c69963;
            color: #141c24 !important;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 25px;
          }
          .highlight {
            color: #c69963;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>The Retreat Cottage</h1>
          </div>
          <div class="content">
            <h2>Welcome to the Sanctuary, ${firstName}!</h2>
            <p>We're absolutely delighted to have you join our community of nature lovers and mountain explorers.</p>
            <p>At <span class="highlight">The Retreat Cottage</span>, we believe in the harmony of nature and mountain luxury. Your journey to serenity in Dharampur starts right here.</p>
            <p>You can now:</p>
            <ul>
              <li>Explore our exclusive wooden cabins and elegant rooms</li>
              <li>Check availability in real-time</li>
              <li>Manage your upcoming mountain retreats</li>
            </ul>
            <a href="https://retreatcottage.in/retreats" class="button">Book Your First Retreat</a>
            <p style="margin-top: 30px;">If you have any questions or need assistance planning your stay, simply reply to this email or call us at <span class="highlight">+91 99060 39157</span>.</p>
            <p>Warmly,<br>The Retreat Cottage Team</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} The Retreat Cottage. Dharampur, Himachal Pradesh, India.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Welcome to The Retreat Cottage, ${firstName}!

We're absolutely delighted to have you join our community of nature lovers and mountain explorers.

At The Retreat Cottage, we believe in the harmony of nature and mountain luxury. Your journey to serenity in Dharampur starts right here.

Explore our retreats and book your stay at: https://retreatcottage.in/retreats

If you have any questions, feel free to reply to this email or call us at +91 99060 39157.

Warmly,
The Retreat Cottage Team
  `;

  return { html, text };
}
