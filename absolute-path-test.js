const path = require('path');
console.log('Current directory:', __dirname);
console.log('Files in directory:', require('fs').readdirSync(__dirname));

// Try with absolute path
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });
console.log('Using absolute path:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '[PASSWORD EXISTS]' : 'undefined');

// Try with direct env file
require('dotenv').config();
console.log('\nUsing default .env:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '[PASSWORD EXISTS]' : 'undefined');

// Try with manual setting
console.log('\nSetting variables manually:');
process.env.EMAIL_USER = 'contact@driftsites.com';
process.env.EMAIL_PASSWORD = 'lbek mzcs meomuair';
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '[PASSWORD EXISTS]' : 'undefined'); 