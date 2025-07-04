console.log('Script started');

// Set environment variables manually since dotenv isn't working
process.env.EMAIL_USER = 'contact@driftsites.com';
process.env.EMAIL_PASSWORD = 'lbek mzcs meomuair';

console.log('Loaded env:', process.env.EMAIL_USER, process.env.EMAIL_PASSWORD ? '[HIDDEN]' : undefined);
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Check environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.error('Missing EMAIL_USER or EMAIL_PASSWORD in .env.local');
  process.exit(1);
}

// Read CSV
const csvPath = path.join(__dirname, 'matamata-businesses-real.csv');
console.log('Looking for CSV at:', csvPath);
if (!fs.existsSync(csvPath)) {
  console.error('CSV file not found:', csvPath);
  process.exit(1);
}
const csv = fs.readFileSync(csvPath, 'utf-8');
const lines = csv.split('\n').filter(line => line.trim());
const businesses = lines.map(line => {
  const [name, email] = line.split(',').map(x => x.trim());
  return { name, email };
});
console.log('Loaded businesses:', businesses.length);

// Email template
function getEmailTemplate(businessName) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Drift Sites - Professional Web Design for Matamata Businesses</title>
    </head>
    <body style="background:#000;color:#fff;font-family:sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#0a0a0a;padding:40px;border-radius:12px;">
        <h1 style="color:#fff;">Transform Your Business's Digital Presence</h1>
        <p>Dear ${businessName},</p>
        <p>In today's digital world, <strong>76% of consumers</strong> research a business online before visiting in person. We've noticed that your business could benefit from an enhanced online presence to attract more local customers in Matamata.</p>
        <h2 style="color:#9F7AEA;">Why Your Business Needs a Professional Website</h2>
        <ul>
          <li><strong>Attract Local Customers</strong> - Be found when Matamata residents search for your services</li>
          <li><strong>Build Credibility</strong> - Showcase your expertise and customer testimonials</li>
          <li><strong>24/7 Availability</strong> - Provide information and services even when you're closed</li>
          <li><strong>Compete Effectively</strong> - Stand out from competitors who don't have a strong online presence</li>
          <li><strong>Mobile-Friendly Design</strong> - Reach customers on any device</li>
        </ul>
        <p>At Drift Sites, we specialize in creating beautiful, functional websites for local Matamata businesses. Our designs are tailored to your specific industry and customer base, ensuring you get maximum return on your investment.</p>
        <p>We're offering a <strong>free consultation</strong> to discuss how we can help your business grow online. No obligation, just practical advice on improving your digital presence.</p>
        <div style="margin-top:25px;padding:20px;background:#1a1a1a;border-radius:8px;">
          To schedule your free consultation, please reply to this email or call us at <strong>027 429 9713</strong>.<br>
          <a href="https://driftsites.com" style="color:#9F7AEA;">Visit our website: driftsites.com</a>
        </div>
        <div style="margin-top:35px;padding-top:15px;border-top:1px solid #333;">
          <p>Looking forward to helping your business thrive online,</p>
          <p><strong>The Drift Sites Team</strong></p>
        </div>
        <div style="margin-top:30px;color:#888;font-size:13px;">
          © ${new Date().getFullYear()} Drift Sites. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
}

// Configure transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

(async () => {
  let sent = 0, failed = 0;
  for (const { name, email } of businesses) {
    if (!email || !name) continue;
    try {
      const info = await transporter.sendMail({
        from: `"Drift Sites" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Transform Your Business with a Professional Website',
        html: getEmailTemplate(name),
      });
      sent++;
      console.log(`✓ Sent to ${email} (${name}) [${info.messageId}]`);
    } catch (err) {
      failed++;
      console.error(`✗ Failed to send to ${email} (${name}):`, err.message);
    }
    // Optional: wait 1 second between emails to avoid rate limits
    await new Promise(res => setTimeout(res, 1000));
  }
  console.log(`\nDone! Sent: ${sent}, Failed: ${failed}`);
})();