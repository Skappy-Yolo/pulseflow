// =============================================================================
// SUPABASE EDGE FUNCTION: SEND ADMIN INVITATION EMAIL
// =============================================================================
// Deploy with: supabase functions deploy send-admin-invitation --no-verify-jwt

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') || 'noreply@pulseflow.app'
const FROM_NAME = Deno.env.get('FROM_NAME') || 'PulseFlow by Nolum'

interface AdminInvitationRequest {
  to: string
  firstName: string
  lastName: string
  role: string
  tempPassword: string
  loginUrl: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Format role for display
function formatRole(role: string): string {
  const roleMap: Record<string, string> = {
    'super_admin': 'Super Administrator',
    'admin': 'Administrator',
    'sales': 'Sales Representative',
    'viewer': 'Viewer'
  }
  return roleMap[role] || role
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, firstName, lastName, role, tempPassword, loginUrl }: AdminInvitationRequest = await req.json()

    // Validate required fields
    if (!to || !firstName || !tempPassword || !loginUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const formattedRole = formatRole(role)

    // Build the email HTML
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to PulseFlow Admin</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-radius: 8px 8px 0 0;">
              <div style="display: inline-block; padding: 12px; background: rgba(255,255,255,0.2); border-radius: 12px; margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Welcome to PulseFlow Admin!</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">You've been invited as ${formattedRole}</p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hi ${firstName},
              </p>
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                You've been invited to join the PulseFlow admin team as a <strong>${formattedRole}</strong>. 
                Your account has been created and is ready to use.
              </p>
              
              <!-- Credentials Box -->
              <div style="background-color: #f0f4ff; border: 1px solid #c7d2fe; border-radius: 8px; padding: 24px; margin: 24px 0;">
                <h3 style="color: #4338ca; margin: 0 0 16px; font-size: 16px;">🔐 Your Login Credentials</h3>
                <table style="width: 100%;">
                  <tr>
                    <td style="color: #64748b; padding: 8px 0; font-size: 14px; width: 140px;">Email:</td>
                    <td style="color: #1e293b; padding: 8px 0; font-size: 14px; font-weight: 600;">${to}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; padding: 8px 0; font-size: 14px;">Temporary Password:</td>
                    <td style="color: #1e293b; padding: 8px 0; font-size: 14px; font-weight: 600; font-family: monospace; background: #e0e7ff; padding: 4px 8px; border-radius: 4px;">${tempPassword}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; padding: 8px 0; font-size: 14px;">Role:</td>
                    <td style="color: #1e293b; padding: 8px 0; font-size: 14px; font-weight: 600;">${formattedRole}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Security Note -->
              <div style="background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px; margin: 24px 0;">
                <p style="color: #92400e; font-size: 14px; margin: 0;">
                  <strong>🔒 Security Tip:</strong> For your security, we recommend changing your password after your first login.
                </p>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${loginUrl}" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Sign In to Admin Dashboard
                </a>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 24px 0 0;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${loginUrl}" style="color: #4f46e5; word-break: break-all;">${loginUrl}</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; margin: 0; text-align: center;">
                This is an automated message from PulseFlow Admin System.<br>
                If you didn't expect this invitation, please contact your administrator.
              </p>
              <p style="color: #9ca3af; font-size: 11px; margin: 16px 0 0; text-align: center;">
                © ${new Date().getFullYear()} Nolum. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    // Plain text version
    const textContent = `
Welcome to PulseFlow Admin!

Hi ${firstName},

You've been invited to join the PulseFlow admin team as a ${formattedRole}.

Your Login Credentials:
- Email: ${to}
- Temporary Password: ${tempPassword}
- Role: ${formattedRole}

Sign in at: ${loginUrl}

Security Tip: For your security, we recommend changing your password after your first login.

---
This is an automated message from PulseFlow Admin System.
If you didn't expect this invitation, please contact your administrator.

© ${new Date().getFullYear()} Nolum. All rights reserved.
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
        subject: `🔐 You've been invited to PulseFlow Admin`,
        html: htmlContent,
        text: textContent,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Resend API error:', result)
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: result }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in send-admin-invitation:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
