# Email Templates for Supabase Auth

## Email Confirmation Template

**Subject:** Welcome to PulseFlow - Please confirm your email

**Body:**
```html
<h2>Welcome to PulseFlow!</h2>

<p>Hi {{ .Name }},</p>

<p>Thank you for signing up for PulseFlow! We're excited to have you on board.</p>

<p>To complete your registration and start using your dashboard, please click the button below to confirm your email address:</p>

<p>
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
    Confirm Email Address
  </a>
</p>

<p>If the button doesn't work, you can copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p>This link will expire in 24 hours for security reasons.</p>

<p>Once confirmed, you'll be able to:</p>
<ul>
  <li>Access your personalized dashboard</li>
  <li>Set up your analytics workflows</li>
  <li>Integrate with your existing tools</li>
  <li>Start tracking your key metrics</li>
</ul>

<p>If you didn't create an account with PulseFlow, you can safely ignore this email.</p>

<p>Best regards,<br>
The PulseFlow Team</p>

<hr>
<p style="font-size: 12px; color: #666;">
  PulseFlow - Unified Analytics for Modern Teams<br>
  This email was sent to {{ .Email }}
</p>
```

## Password Reset Template

**Subject:** Reset your PulseFlow password

**Body:**
```html
<h2>Password Reset Request</h2>

<p>Hi there,</p>

<p>We received a request to reset the password for your PulseFlow account ({{ .Email }}).</p>

<p>Click the button below to set a new password:</p>

<p>
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
    Reset Password
  </a>
</p>

<p>If the button doesn't work, you can copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p>This link will expire in 1 hour for security reasons.</p>

<p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>

<p>Best regards,<br>
The PulseFlow Team</p>

<hr>
<p style="font-size: 12px; color: #666;">
  PulseFlow - Unified Analytics for Modern Teams<br>
  This email was sent to {{ .Email }}
</p>
```

## Magic Link Template

**Subject:** Sign in to PulseFlow

**Body:**
```html
<h2>Sign in to PulseFlow</h2>

<p>Hi there,</p>

<p>Click the button below to sign in to your PulseFlow account:</p>

<p>
  <a href="{{ .ConfirmationURL }}" 
     style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
    Sign In to PulseFlow
  </a>
</p>

<p>If the button doesn't work, you can copy and paste this link into your browser:</p>
<p>{{ .ConfirmationURL }}</p>

<p>This link will expire in 1 hour for security reasons.</p>

<p>If you didn't request this sign-in link, you can safely ignore this email.</p>

<p>Best regards,<br>
The PulseFlow Team</p>

<hr>
<p style="font-size: 12px; color: #666;">
  PulseFlow - Unified Analytics for Modern Teams<br>
  This email was sent to {{ .Email }}
</p>
```

## How to Apply These Templates

1. Go to your Supabase Dashboard
2. Navigate to Authentication > Email Templates
3. Select each template type (Confirm signup, Reset password, Magic Link)
4. Replace the default content with the templates above
5. Make sure to test the email delivery

## Customization Notes

- The templates use Supabase's template variables: `{{ .Name }}`, `{{ .Email }}`, `{{ .ConfirmationURL }}`
- Colors match PulseFlow's brand (#2563eb for primary blue)
- Professional tone suitable for B2B audience
- Clear call-to-action buttons
- Security reminders about link expiration
