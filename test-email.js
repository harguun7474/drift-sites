// Simple script to test email configuration
require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

// Check environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.error('\x1b[31m%s\x1b[0m', 'ERROR: Missing EMAIL_USER or EMAIL_PASSWORD in .env.local file');
  console.log('\nPlease create a .env.local file with the following content:');
  console.log('\nEMAIL_USER=your_gmail_address@gmail.com');
  console.log('EMAIL_PASSWORD=your_app_password_here\n');
  process.exit(1);
}

// Configure transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  debug: true // Enable debug output
});

// Test connection
console.log('\x1b[33m%s\x1b[0m', 'Testing connection to email server...');
transporter.verify()
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', '✓ Connection successful!');
    console.log('\x1b[36m%s\x1b[0m', `Using email account: ${process.env.EMAIL_USER}`);
    
    // Ask if user wants to send a test email
    console.log('\n\x1b[33m%s\x1b[0m', 'Would you like to send a test email? (y/n)');
    process.stdin.once('data', (data) => {
      const answer = data.toString().trim().toLowerCase();
      
      if (answer === 'y' || answer === 'yes') {
        // Prompt for test recipient
        console.log('\x1b[36m%s\x1b[0m', 'Enter recipient email address:');
        process.stdin.once('data', async (emailData) => {
          const testEmail = emailData.toString().trim();
          
          console.log('\x1b[33m%s\x1b[0m', `Sending test email to ${testEmail}...`);
          
          try {
            const info = await transporter.sendMail({
              from: `"Drift Sites Test" <${process.env.EMAIL_USER}>`,
              to: testEmail,
              subject: 'Email Configuration Test',
              text: 'If you received this email, your email configuration is working correctly!',
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                  <h2 style="color: #6B46C1;">Email Configuration Test</h2>
                  <p>If you received this email, your email configuration is working correctly!</p>
                  <p>You can now use the Drift Sites email campaign system.</p>
                  <hr style="border: 1px solid #eee; margin: 20px 0;">
                  <p style="color: #666; font-size: 12px;">This is an automated test message.</p>
                </div>
              `
            });
            
            console.log('\x1b[32m%s\x1b[0m', '✓ Test email sent successfully!');
            console.log('\x1b[36m%s\x1b[0m', `Message ID: ${info.messageId}`);
            process.exit(0);
          } catch (error) {
            console.error('\x1b[31m%s\x1b[0m', 'ERROR sending test email:');
            console.error(error);
            process.exit(1);
          }
        });
      } else {
        console.log('\x1b[36m%s\x1b[0m', 'Email configuration verified but no test email sent.');
        process.exit(0);
      }
    });
  })
  .catch((error) => {
    console.error('\x1b[31m%s\x1b[0m', 'ERROR: Could not connect to email server');
    console.error(error);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n\x1b[33m%s\x1b[0m', 'TROUBLESHOOTING TIPS:');
      console.log('1. Make sure you\'re using an App Password, not your regular Gmail password');
      console.log('2. Verify that 2-Step Verification is enabled on your Google account');
      console.log('3. Check that you created the App Password correctly in your Google Account settings');
      console.log('4. Make sure your EMAIL_USER is your complete Gmail address');
    }
    
    process.exit(1);
  }); 