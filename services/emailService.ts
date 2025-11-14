// services/emailService.ts

/**
 * Simulates sending an official email receipt.
 * In a real application, this would integrate with an email API (e.g., SendGrid, Nodemailer).
 * @param subject - The subject line of the email.
 * @param body - The HTML or text body of the email.
 * @param recipient - The email address of the recipient.
 * @returns A promise that resolves with a success message.
 */
export const sendOfficialReceipt = async (subject: string, body: string, recipient: string): Promise<{ success: boolean; message: string }> => {
  console.log('--- SIMULATING EMAIL DISPATCH ---');
  console.log(`Recipient: ${recipient}`);
  console.log(`Subject: ${subject}`);
  console.log('Body:', body);
  console.log('---------------------------------');

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 750));

  // In a real scenario, you would handle potential errors from the email API.
  // For this simulation, we will always assume success.
  return {
    success: true,
    message: `Official receipt successfully sent to ${recipient}.`
  };
};
