// Netlify auto-runs this file after every form submission on the site because
// of its filename. We use it to send a confirmation email to the guest via Resend.

const escapeHtml = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export default async (req) => {
  let payload;
  try {
    payload = await req.json();
  } catch (err) {
    console.error('Could not parse submission payload', err);
    return new Response('Invalid payload', { status: 400 });
  }

  const data = payload?.payload?.data || {};
  const formName = payload?.payload?.form_name || 'unknown';

  if (formName !== 'booking') {
    return new Response(`Skipping form: ${formName}`, { status: 200 });
  }

  const guestEmail = data.email;
  if (!guestEmail) {
    console.error('No guest email in submission, skipping autoresponder');
    return new Response('No email to send to', { status: 200 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return new Response('Email service not configured', { status: 500 });
  }

  const firstName = escapeHtml(data['first-name']) || 'there';
  const experienceType = escapeHtml(data['experience-type']) || 'An evening with us';
  const guestCount = escapeHtml(data['guest-count']) || '—';
  const locationPref = escapeHtml(data['location-preference']) || '—';
  const preferredDates = escapeHtml(data['preferred-dates']) || '—';

  const html = `
<div style="font-family:Georgia,serif;background:#FAF6EF;padding:32px 16px;">
  <div style="max-width:560px;margin:0 auto;background:#FDF9F4;border-radius:8px;padding:40px 32px;color:#2A2520;">
    <p style="font-size:16px;line-height:1.6;margin:0 0 20px;">Hi ${firstName},</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 20px;">Thank you for reaching out — we're so glad you'd like to gather with us at The Homemade Pantry.</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 20px;">We've received your request and your host will be in touch shortly — usually within 24 hours — to confirm your date and walk you through the next steps.</p>
    <p style="font-size:13px;font-weight:bold;color:#2C6E6A;letter-spacing:0.15em;text-transform:uppercase;margin:32px 0 12px;">Here's what you shared</p>
    <table style="width:100%;border-collapse:collapse;font-size:15px;">
      <tr><td style="padding:8px 0;color:#8A847C;width:160px;">Experience</td><td style="padding:8px 0;">${experienceType}</td></tr>
      <tr><td style="padding:8px 0;color:#8A847C;">Number of guests</td><td style="padding:8px 0;">${guestCount}</td></tr>
      <tr><td style="padding:8px 0;color:#8A847C;">Where</td><td style="padding:8px 0;">${locationPref}</td></tr>
      <tr><td style="padding:8px 0;color:#8A847C;">Preferred dates</td><td style="padding:8px 0;">${preferredDates}</td></tr>
    </table>
    <p style="font-size:16px;line-height:1.6;margin:32px 0 20px;">If anything urgent comes up before we reach out, just reply to this email or call/text us at <strong>832-546-6446</strong>.</p>
    <p style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-style:italic;color:#2C6E6A;margin:32px 0 8px;">Made slowly. Shared warmly.</p>
    <p style="font-size:16px;margin:0;">— Jaime &amp; Brittany<br><span style="color:#8A847C;">The Homemade Pantry</span></p>
    <div style="border-top:1px solid #EDE5D8;margin:32px 0 0;padding-top:20px;text-align:center;">
      <a href="https://www.thehomemadepantryco.com" style="font-size:13px;color:#2C6E6A;text-decoration:none;letter-spacing:0.05em;">www.thehomemadepantryco.com</a>
    </div>
  </div>
</div>
`.trim();

  const text = `Hi ${data['first-name'] || 'there'},

Thank you for reaching out — we're so glad you'd like to gather with us at The Homemade Pantry.

We've received your request and your host will be in touch shortly (usually within 24 hours) to confirm your date and walk you through the next steps.

Here's what you shared:
  Experience: ${data['experience-type'] || '—'}
  Number of guests: ${data['guest-count'] || '—'}
  Where: ${data['location-preference'] || '—'}
  Preferred dates: ${data['preferred-dates'] || '—'}

If anything urgent comes up before we reach out, just reply to this email or call/text us at 832-546-6446.

Made slowly. Shared warmly.

— Jaime & Brittany
The Homemade Pantry
www.thehomemadepantryco.com`;

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'The Homemade Pantry <hello@thehomemadepantryco.com>',
        to: guestEmail,
        reply_to: 'thehomemadepantryco@gmail.com',
        subject: "We got your request — we'll be in touch shortly",
        html,
        text,
      }),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error('Resend API error:', resp.status, errorText);
      return new Response('Failed to send autoresponder', { status: 500 });
    }

    const result = await resp.json();
    console.log('Autoresponder sent', { id: result.id, to: guestEmail });
    return new Response('Autoresponder sent', { status: 200 });
  } catch (err) {
    console.error('Error calling Resend', err);
    return new Response('Failed to send autoresponder', { status: 500 });
  }
};
