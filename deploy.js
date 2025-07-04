const fs = require('fs');
const path = require('path');

// Function to copy _redirects file to the out directory
function copyRedirectsFile() {
  try {
    // Create _redirects file with fallback for Next.js routing
    const redirectsContent = `
# Netlify redirects file
# Handle Next.js client-side routing
/*    /index.html   200

# Redirect domain aliases to primary domain if needed
# https://www.example.com/* https://example.com/:splat 301!
`;

    fs.writeFileSync(path.join(__dirname, 'out', '_redirects'), redirectsContent);
    console.log('✅ Created _redirects file for Netlify');
  } catch (error) {
    console.error('Error creating _redirects file:', error);
  }
}

// Function to create a Netlify-specific _headers file
function createHeadersFile() {
  try {
    const headersContent = `
# Netlify headers file
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
`;

    fs.writeFileSync(path.join(__dirname, 'out', '_headers'), headersContent);
    console.log('✅ Created _headers file for Netlify');
  } catch (error) {
    console.error('Error creating _headers file:', error);
  }
}

// Function to verify the build output
function verifyBuildOutput() {
  try {
    const outDir = path.join(__dirname, 'out');
    
    if (!fs.existsSync(outDir)) {
      console.error('❌ The "out" directory does not exist. Run "npm run build" first.');
      return false;
    }
    
    const indexFile = path.join(outDir, 'index.html');
    if (!fs.existsSync(indexFile)) {
      console.error('❌ index.html not found in the "out" directory. Build may be incomplete.');
      return false;
    }
    
    console.log('✅ Build output verified successfully');
    return true;
  } catch (error) {
    console.error('Error verifying build output:', error);
    return false;
  }
}

// Main function
function prepareForDeployment() {
  console.log('🚀 Preparing for Netlify deployment...');
  
  if (verifyBuildOutput()) {
    copyRedirectsFile();
    createHeadersFile();
    console.log('🎉 Deployment preparation complete! You can now deploy the "out" directory to Netlify.');
  }
}

// Run the script
prepareForDeployment(); 