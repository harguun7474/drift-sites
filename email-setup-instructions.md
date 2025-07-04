# Email Campaign Setup Instructions

## Why Emails Are Failing

Your emails are failing to send because the application needs proper Gmail credentials. When using Gmail with nodemailer, you need to:

1. Set up an App Password (not your regular Gmail password)
2. Configure environment variables

## Step 1: Create a Gmail App Password

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select "Security" from the left navigation
3. Under "Signing in to Google," select "2-Step Verification" (you need to have this enabled)
4. At the bottom of the page, select "App passwords"
5. Click "Select app" and choose "Mail"
6. Click "Select device" and choose "Other"
7. Enter "Drift Sites Email Campaign" and click "Generate"
8. Google will display a 16-character app password - **copy this password**

## Step 2: Create Environment Variables

Create a file named `.env.local` in the root of your project with the following content:

```
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASSWORD=your_app_password_here
```

Replace:
- `your_gmail_address@gmail.com` with your actual Gmail address
- `your_app_password_here` with the 16-character app password you generated

## Step 3: Restart Your Development Server

After creating the `.env.local` file, restart your Next.js development server:

```
npm run dev
```

## Additional Notes

- Make sure your Gmail account has less secure app access enabled or is properly configured for SMTP
- If you're deploying to a hosting service, you'll need to add these environment variables in their dashboard
- Never commit your `.env.local` file to version control

## Troubleshooting

If emails still fail to send:
1. Check your Gmail account for any security notifications
2. Verify that the app password is correct
3. Try using a different Gmail account
4. Check if your Gmail has any sending limits or restrictions 