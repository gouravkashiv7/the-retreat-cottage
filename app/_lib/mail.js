/**
 * Send a welcome email to a new guest via Supabase Edge Function
 *
 * @param {string} email - Recipient email address
 * @param {string} name - Guest's full name
 */
export async function sendWelcomeEmail(email, name) {
  const edgeFunctionUrl = `${process.env.SUPABASE_URL}/functions/v1/send-welcome-email`;

  try {
    const response = await fetch(edgeFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`,
      },
      body: JSON.stringify({
        guestName: name,
        guestEmail: email,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Edge function failed: ${errorText}`);
    }

    const data = await response.json();
    console.log("Welcome email sent via Edge Function: %s", data.messageId);
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error("Error sending welcome email via Edge Function:", error);
    return { success: false, error: error.message };
  }
}
