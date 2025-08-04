// src/lib/notifications.ts
// Utility for sending email notifications via Supabase Edge Functions or API

export async function sendCustomerNotification({
  to,
  subject,
  message,
}: {
  to: string;
  subject: string;
  message: string;
}) {
  // Example: call a Supabase Edge Function or external API
  // Replace with your actual implementation
  return fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to, subject, message }),
  });
}
