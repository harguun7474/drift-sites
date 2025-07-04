'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Business {
  name: string;
  email: string;
  status: 'pending' | 'sent' | 'failed';
}

export default function EmailCampaign() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const lines = content.split('\n');
        const newBusinesses = lines
          .filter(line => line.trim())
          .map(line => {
            const [name, email] = line.split(',').map(item => item.trim());
            return { name, email, status: 'pending' as const };
          });
        setBusinesses(newBusinesses);
      } catch (error) {
        setStatus({
          type: 'error',
          message: 'Error parsing file. Please ensure it\'s a valid CSV with name and email columns.',
        });
      }
    };
    reader.readAsText(file);
  };

  const sendEmails = async () => {
    setIsSending(true);
    setStatus({ type: null, message: '' });

    const updatedBusinesses = [...businesses];
    let successCount = 0;
    let failCount = 0;
    let errorMessages: string[] = [];

    for (let i = 0; i < businesses.length; i++) {
      try {
        console.log('Sending email to:', businesses[i]);
        
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            businessName: businesses[i].name,
            email: businesses[i].email,
          }),
        });

        console.log('Response status:', response.status);
        
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`Expected JSON response but got ${contentType}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
          updatedBusinesses[i].status = 'sent';
          successCount++;
        } else {
          updatedBusinesses[i].status = 'failed';
          failCount++;
          if (data.error && !errorMessages.includes(data.error)) {
            errorMessages.push(data.error);
          }
        }
      } catch (error: any) {
        console.error('Error sending email:', error);
        updatedBusinesses[i].status = 'failed';
        failCount++;
        const errorMessage = error.message || 'Unknown error occurred';
        if (!errorMessages.includes(errorMessage)) {
          errorMessages.push(errorMessage);
        }
      }

      // Add a small delay between requests to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setBusinesses(updatedBusinesses);
    setIsSending(false);
    
    if (failCount === 0) {
      setStatus({
        type: 'success',
        message: `Sent ${successCount} emails successfully.`,
      });
    } else {
      setStatus({
        type: 'error',
        message: `Sent ${successCount} emails successfully. ${failCount} failed. ${errorMessages.length > 0 ? 'Error: ' + errorMessages.join('; ') : ''}`,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Email Campaign</h2>
          
          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Upload Business List (CSV)
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600"
            />
            <p className="text-sm text-gray-400 mt-1">
              Upload a CSV file with business names and email addresses (one per line, comma-separated)
            </p>
          </div>

          {/* Preview Template */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Email Template Preview
            </label>
            <div className="bg-gray-700 p-3 rounded border border-gray-600 h-48 overflow-auto">
              <div className="flex items-center justify-center h-full">
                <button 
                  onClick={() => setShowPreview(true)} 
                  className="text-purple-400 hover:text-purple-300 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview Email Template
                </button>
              </div>
            </div>
          </div>

          {/* Status Message */}
          {status.type && (
            <div
              className={`p-4 rounded mb-4 ${
                status.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Send Button */}
          <button
            onClick={sendEmails}
            disabled={isSending || businesses.length === 0}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? 'Sending...' : `Send to ${businesses.length} Businesses`}
          </button>
        </div>

        {/* Business List */}
        {businesses.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Business List</h3>
            <div className="space-y-2">
              {businesses.map((business, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded"
                >
                  <div>
                    <p className="font-medium">{business.name}</p>
                    <p className="text-sm text-gray-400">{business.email}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded text-sm ${
                      business.status === 'sent'
                        ? 'bg-green-500/20 text-green-200'
                        : business.status === 'failed'
                        ? 'bg-red-500/20 text-red-200'
                        : 'bg-yellow-500/20 text-yellow-200'
                    }`}
                  >
                    {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium">Email Template Preview</h3>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <iframe 
                  srcDoc={`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Email Preview</title>
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
                          
                          <p>Dear [Business Name],</p>
                          
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
                  `}
                  className="w-full h-[70vh] border-0"
                  title="Email Template Preview"
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
} 