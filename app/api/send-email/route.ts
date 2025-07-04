export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  // Check environment variables first
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Email configuration missing. Please set EMAIL_USER and EMAIL_PASSWORD in .env.local' 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  try {
    const body = await request.json();
    const { businessName, email } = body;

    if (!businessName || !email) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Missing required fields: businessName and email are required' 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Email template HTML
    const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Drift Sites - Professional Web Design for Matamata Businesses</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #ffffff;
          background-color: #000000;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #0a0a0a;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(107, 70, 193, 0.3);
        }
        .header {
          background: linear-gradient(135deg, #6B46C1 0%, #2D1B69 100%);
          padding: 35px 30px;
          text-align: center;
          border-bottom: 1px solid rgba(107, 70, 193, 0.3);
        }
        .logo-container {
          display: inline-block;
          background-color: rgba(0, 0, 0, 0.2);
          padding: 18px 28px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }
        .logo-text {
          color: white;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 1.5px;
        }
        .logo-text span {
          color: #9F7AEA;
          font-weight: 800;
        }
        .content {
          padding: 45px 35px;
          background-color: #0a0a0a;
          position: relative;
        }
        .content::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            linear-gradient(rgba(107, 70, 193, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(107, 70, 193, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
          z-index: 0;
        }
        .content > * {
          position: relative;
          z-index: 1;
        }
        h1 {
          color: #ffffff;
          margin-top: 0;
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 28px;
          letter-spacing: 0.5px;
        }
        h2 {
          color: #9F7AEA;
          font-size: 24px;
          margin-top: 35px;
          letter-spacing: 0.3px;
        }
        p {
          line-height: 1.8;
          margin-bottom: 22px;
          color: #e0e0e0;
          font-size: 16px;
        }
        .benefits {
          background-color: rgba(107, 70, 193, 0.1);
          border-left: 4px solid #6B46C1;
          padding: 22px 28px;
          margin: 35px 0;
          border-radius: 0 10px 10px 0;
        }
        .benefits li {
          margin-bottom: 14px;
          color: #e0e0e0;
          line-height: 1.7;
        }
        .benefits li strong {
          color: #9F7AEA;
        }
        .cta-button {
          display: inline-block;
          background-color: #6B46C1;
          color: white;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: bold;
          margin: 30px 0;
          font-size: 16px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(107, 70, 193, 0.3);
          transition: all 0.3s ease;
        }
        .cta-button:hover {
          background-color: #805AD5;
          transform: translateY(-2px);
        }
        .footer {
          background-color: #0a0a0a;
          padding: 30px;
          text-align: center;
          font-size: 13px;
          color: #888888;
          border-top: 1px solid rgba(107, 70, 193, 0.3);
        }
        .signature {
          margin-top: 35px;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .contact-info {
          margin-top: 25px;
          padding: 20px;
          background-color: rgba(107, 70, 193, 0.1);
          border-radius: 8px;
          font-size: 15px;
        }
        .website-link {
          display: block;
          margin-top: 15px;
          color: #9F7AEA;
          text-decoration: underline;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo-container">
            <div class="logo-text">DRIFT<span>SITES</span></div>
          </div>
        </div>
        
        <div class="content">
          <h1>Transform Your Business's Digital Presence</h1>
          
          <p>Dear ${businessName},</p>
          
          <p>In today's digital world, <strong>76% of consumers</strong> research a business online before visiting in person. We've noticed that your business could benefit from an enhanced online presence to attract more local customers in Matamata.</p>
          
          <h2>Why Your Business Needs a Professional Website</h2>
          
          <div class="benefits">
            <ul>
              <li><strong>Attract Local Customers</strong> - Be found when Matamata residents search for your services</li>
              <li><strong>Build Credibility</strong> - Showcase your expertise and customer testimonials</li>
              <li><strong>24/7 Availability</strong> - Provide information and services even when you're closed</li>
              <li><strong>Compete Effectively</strong> - Stand out from competitors who don't have a strong online presence</li>
              <li><strong>Mobile-Friendly Design</strong> - Reach customers on any device</li>
            </ul>
          </div>
          
          <p>At Drift Sites, we specialize in creating beautiful, functional websites for local Matamata businesses. Our designs are tailored to your specific industry and customer base, ensuring you get maximum return on your investment.</p>
          
          <p>We're offering a <strong>free consultation</strong> to discuss how we can help your business grow online. No obligation, just practical advice on improving your digital presence.</p>
          
          <div class="contact-info">
            To schedule your free consultation, please reply to this email or call us at <strong>027 429 9713</strong>.
            <a href="https://driftsites.com" class="website-link">Visit our website: driftsites.com</a>
          </div>
          
          <div class="signature">
            <p>Looking forward to helping your business thrive online,</p>
            <p><strong>The Drift Sites Team</strong></p>
          </div>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Drift Sites. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    try {
      const info = await transporter.sendMail({
        from: `"Drift Sites" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Transform Your Business with a Professional Website',
        html: emailTemplate,
      });
      
      return new NextResponse(
        JSON.stringify({ success: true, messageId: info.messageId }),
        { 
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (emailError: any) {
      return new NextResponse(
        JSON.stringify({ error: `Email sending failed: ${emailError.message}` }),
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: `Failed to process request: ${error.message}` }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 