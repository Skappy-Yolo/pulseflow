// =============================================================================
// SUPABASE EDGE FUNCTION: SEND ACTIVATION EMAIL
// =============================================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'noreply@pulseflow.app'
const FROM_NAME = Deno.env.get('FROM_NAME') || 'PulseFlow by Nolum'
const APP_URL = Deno.env.get('APP_URL') || 'https://pulseflow.netlify.app'


interface EmailRequest {
  to: string
  firstName: string
  companyName: string
  temporaryPassword: string
  activationUrl: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, firstName, companyName, temporaryPassword, activationUrl }: EmailRequest = await req.json()

    // Validate required fields
    if (!to || !firstName || !temporaryPassword || !activationUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Build the email HTML
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to PulseFlow</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 8px 8px 0 0;">
              <img src="https://pulseflow.app/images/Heartbeat.svg" alt="PulseFlow" style="width: 50px; height: 50px; margin-bottom: 10px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Welcome to PulseFlow!</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hi ${firstName},
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Great news! Your PulseFlow account${companyName ? ` for <strong>${companyName}</strong>` : ''} has been approved. 
                You're all set to start managing your data more intelligently.
              </p>
              
              <!-- Credentials Box -->
              <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <h3 style="color: #0369a1; margin: 0 0 16px; font-size: 16px;">Your Login Credentials</h3>
                <table style="width: 100%;">
                  <tr>
                    <td style="color: #64748b; padding: 4px 0; font-size: 14px;">Email:</td>
                    <td style="color: #1e293b; padding: 4px 0; font-size: 14px; font-weight: 600;">${to}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; padding: 4px 0; font-size: 14px;">Temporary Password:</td>
                    <td style="color: #1e293b; padding: 4px 0; font-size: 14px; font-weight: 600; font-family: monospace;">${temporaryPassword}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Important Note -->
              <div style="background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px; margin: 24px 0;">
                <p style="color: #92400e; font-size: 14px; margin: 0;">
                  <strong>⚠️ Important:</strong> This temporary password will expire in 7 days. 
                  Please activate your account and set a new password as soon as possible.
                </p>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${activationUrl}" 
                   style="display: inline-block; padding: 16px 32px; background-color: #2563eb; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                  Activate Your Account →
                </a>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 24px 0 0;">
                If the button above doesn't work, copy and paste this link into your browser:
              </p>
              <p style="color: #2563eb; font-size: 12px; word-break: break-all; margin: 8px 0 0;">
                ${activationUrl}
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8fafc; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0 0 8px;">
                Need help? Contact us at <a href="mailto:support@pulseflow.app" style="color: #2563eb;">support@pulseflow.app</a>
              </p>
              <p style="color: #94a3b8; font-size: 11px; text-align: center; margin: 0;">
                © ${new Date().getFullYear()} PulseFlow by Nolum. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

    const textContent = `
Welcome to PulseFlow!

Hi ${firstName},

Great news! Your PulseFlow account${companyName ? ` for ${companyName}` : ''} has been approved.

YOUR LOGIN CREDENTIALS:
Email: ${to}
Temporary Password: ${temporaryPassword}

IMPORTANT: This temporary password will expire in 7 days.
Please activate your account and set a new password as soon as possible.

Click here to activate your account:
${activationUrl}

Need help? Contact us at support@pulseflow.app

© ${new Date().getFullYear()} PulseFlow by Nolum. All rights reserved.
`

    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [to],
        subject: '🎉 Welcome to PulseFlow - Activate Your Account',
        html: htmlContent,
        text: textContent,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Resend API error:', errorData)
      throw new Error('Failed to send email')
    }

    const data = await response.json()

    return new Response(
      JSON.stringify({ success: true, messageId: data.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    console.error('Error sending activation email:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: 'Failed to send email', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
