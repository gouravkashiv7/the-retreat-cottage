import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendBookingEmail(bookingDetails) {
  const {
    guestName,
    guestEmail,
    packageName,
    startDate,
    endDate,
    totalPrice,
    numNights,
    numGuests,
  } = bookingDetails;

  const mailOptions = {
    from: `"The Retreat Cottage" <${process.env.EMAIL_USER}>`,
    to: guestEmail,
    subject: `Booking Unconfirmed - ${packageName} at The Retreat Cottage`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #c9a050; margin: 0; font-size: 28px;">The Retreat Cottage</h1>
          <p style="color: #666; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; margin-top: 5px;">Luxury Mountain Living</p>
        </div>

        <div style="background-color: #fff9f0; padding: 20px; border-radius: 8px; border-left: 4px solid #c9a050; margin-bottom: 30px;">
          <h2 style="margin-top: 0; color: #333;">Booking Receipt</h2>
          <p style="color: #dc2626; font-weight: bold;">Status: UNCONFIRMED</p>
          <p style="color: #555; line-height: 1.6;">
            Namaste ${guestName},<br><br>
            Thank you for choosing The Retreat Cottage. We have received your booking request for the <strong>${packageName}</strong>. 
            To secure your stay and confirm these dates, an advance payment is required.
          </p>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="border-bottom: 1px solid #eee; padding-bottom: 10px; color: #333;">Stay Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666;">Check-in:</td>
              <td style="padding: 8px 0; font-weight: bold; text-align: right;">${new Date(startDate).toLocaleDateString("en-IN", { dateStyle: "long" })}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Check-out:</td>
              <td style="padding: 8px 0; font-weight: bold; text-align: right;">${new Date(endDate).toLocaleDateString("en-IN", { dateStyle: "long" })}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Duration:</td>
              <td style="padding: 8px 0; font-weight: bold; text-align: right;">${numNights} Nights</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Guests:</td>
              <td style="padding: 8px 0; font-weight: bold; text-align: right;">${numGuests} People</td>
            </tr>
            <tr style="border-top: 2px solid #c9a050;">
              <td style="padding: 15px 0; color: #333; font-weight: bold; font-size: 18px;">Total Amount:</td>
              <td style="padding: 15px 0; font-weight: bold; text-align: right; color: #c9a050; font-size: 22px;">₹${totalPrice}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="margin-top: 0; color: #333; font-size: 16px;">What's Next?</h3>
          <p style="font-size: 14px; color: #666; line-height: 1.5;">
            1. Reach out to us at <strong>+91 99060 39157</strong> for payment details.<br>
            2. Share your payment confirmation via WhatsApp or Email.<br>
            3. Once verified, your status will be updated to "Confirmed" in your profile.
          </p>
        </div>

        <div style="text-align: center; color: #999; font-size: 12px; margin-top: 40px; border-top: 1px solid #eee; pt: 20px;">
          <p>You can view our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/refund-policy" style="color: #c9a050; text-decoration: none;">Refund & Cancellation Policy here</a>.</p>
          <p>&copy; ${new Date().getFullYear()} The Retreat Cottage. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Booking email sent successfully to:", guestEmail);
  } catch (error) {
    console.error("❌ Error sending booking email:", error);
  }
}
