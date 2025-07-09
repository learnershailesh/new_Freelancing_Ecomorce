// Simple script to run the JavaScript version of the server
process.env.NODE_ENV = 'development';

// Start the server
import('./server/index.js').catch(console.error);