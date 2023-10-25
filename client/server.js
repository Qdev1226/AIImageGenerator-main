const cors_proxy = require('cors-anywhere');

let port = PORT || 8080;

cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, function() {
  console.log('Running CORS Anywhere on localhost:' + port);
});

cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
  timeout: 300000 // Increase timeout to 5 minutes
}).listen(port + 1, function() {
  console.log('Running CORS Anywhere on localhost:' + (port + 1));
});
