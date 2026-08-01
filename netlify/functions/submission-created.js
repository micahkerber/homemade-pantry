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

  // We send confirmation emails for two forms: booking requests and bread orders.
  if (formName !== 'booking' && formName !== 'order') {
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

  // ── ORDER form → send a bread-order confirmation with payment instructions ──
  if (formName === 'order') {
    return await sendOrderConfirmation(data, guestEmail, apiKey);
  }

  // ── BOOKING form (original behavior) ──
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

// ── Bread-order confirmation email ──────────────────────────────
// Sent to the customer after a weekly-drop order. The order is a PREPAY
// model, so the whole point of this email is to (1) recap what they ordered
// and (2) tell them exactly how to pay by Venmo or Zelle to lock it in.
async function sendOrderConfirmation(data, guestEmail, apiKey) {
  const firstName    = escapeHtml(data['first-name']) || 'there';
  const orderSummary = escapeHtml(data['order-summary']) || 'your order';
  const orderTotal   = escapeHtml(data['order-total']) || '—';
  const fulfillment  = escapeHtml(data['fulfillment']) || '—';
  const deliveryAddr = escapeHtml(data['delivery-address']) || '';

  // Payment destinations — keep these in sync with order.html's success panel.
  const VENMO = '@Jaime-Kerber-1';
  const ZELLE = 'micahkerber@gmail.com';

  const html = `
<div style="font-family:Georgia,serif;background:#FAF6EF;padding:32px 16px;">
  <div style="max-width:560px;margin:0 auto;background:#FDF9F4;border-radius:8px;padding:40px 32px;color:#2A2520;">
    <p style="font-size:16px;line-height:1.6;margin:0 0 20px;">Hi ${firstName},</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 20px;">Thank you for your order from The Homemade Pantry! Here's a quick recap.</p>
    <p style="font-size:13px;font-weight:bold;color:#2C6E6A;letter-spacing:0.15em;text-transform:uppercase;margin:28px 0 12px;">Your order</p>
    <table style="width:100%;border-collapse:collapse;font-size:15px;">
      <tr><td style="padding:8px 0;color:#8A847C;width:130px;">Items</td><td style="padding:8px 0;">${orderSummary}</td></tr>
      <tr><td style="padding:8px 0;color:#8A847C;">Total</td><td style="padding:8px 0;font-weight:bold;">${orderTotal}</td></tr>
      <tr><td style="padding:8px 0;color:#8A847C;">Pickup / Delivery</td><td style="padding:8px 0;">${fulfillment}</td></tr>
      ${deliveryAddr ? `<tr><td style="padding:8px 0;color:#8A847C;">Address</td><td style="padding:8px 0;">${deliveryAddr}</td></tr>` : ''}
    </table>
    <div style="background:#E4F4F3;border:1px solid #A8D4D1;border-radius:8px;padding:22px 24px;margin:26px 0;">
      <p style="font-size:13px;font-weight:bold;color:#2C6E6A;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 12px;">To confirm your order, send ${orderTotal}</p>
      <p style="font-size:15px;margin:0 0 6px;"><strong>Venmo:</strong> ${VENMO}</p>
      <p style="font-size:15px;margin:0;"><strong>Zelle:</strong> ${ZELLE}</p>
      <p style="font-size:13px;color:#8A847C;margin:12px 0 0;line-height:1.5;">Your order is locked in once payment arrives. Orders close Tuesday night; everything is baked fresh Friday morning.</p>
    </div>
    <p style="font-size:16px;line-height:1.6;margin:0 0 20px;">Questions, changes, or a gift note? Just reply to this email or text us at <strong>832-546-6446</strong>.</p>
    <p style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-style:italic;color:#2C6E6A;margin:28px 0 8px;">Made slowly. Shared warmly.</p>
    <p style="font-size:16px;margin:0;">— Jaime &amp; Brittany<br><span style="color:#8A847C;">The Homemade Pantry</span></p>
    <div style="border-top:1px solid #EDE5D8;margin:28px 0 0;padding-top:20px;text-align:center;">
      <p style="font-size:14px;color:#2A2520;margin:0 0 6px;">Loved your bread? Come make your own.</p>
      <p style="font-size:13px;color:#8A847C;margin:0 0 10px;">Use code <strong style="color:#B87050;">FRESH10</strong> for $10 off an evening with us.</p>
      <a href="https://www.thehomemadepantryco.com/#evening" style="font-size:13px;color:#2C6E6A;text-decoration:none;letter-spacing:0.05em;">Book an experience →</a>
    </div>
  </div>
</div>
`.trim();

  const text = `Hi ${data['first-name'] || 'there'},

Thank you for your order from The Homemade Pantry! Here's a quick recap.

YOUR ORDER
  Items: ${data['order-summary'] || 'your order'}
  Total: ${data['order-total'] || '—'}
  Pickup / Delivery: ${data['fulfillment'] || '—'}${data['delivery-address'] ? `\n  Address: ${data['delivery-address']}` : ''}

TO CONFIRM YOUR ORDER, SEND ${data['order-total'] || 'your total'}:
  Venmo: ${VENMO}
  Zelle: ${ZELLE}

Your order is locked in once payment arrives. Orders close Tuesday night; everything is baked fresh Friday morning.

Questions, changes, or a gift note? Reply to this email or text us at 832-546-6446.

Made slowly. Shared warmly.
— Jaime & Brittany
The Homemade Pantry

Loved your bread? Come make your own — use code FRESH10 for $10 off an evening.
https://www.thehomemadepantryco.com/#evening`;

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
        subject: `We got your order — here's how to confirm it`,
        html,
        text,
      }),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error('Resend API error (order):', resp.status, errorText);
      return new Response('Failed to send order confirmation', { status: 500 });
    }

    const result = await resp.json();
    console.log('Order confirmation sent', { id: result.id, to: guestEmail });
    return new Response('Order confirmation sent', { status: 200 });
  } catch (err) {
    console.error('Error calling Resend (order)', err);
    return new Response('Failed to send order confirmation', { status: 500 });
  }
}
