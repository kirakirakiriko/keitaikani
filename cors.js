const cp = require('cors-anywhere');

cp.createServer({
  originWhitelist: [],
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
}).listen(1337, 'localhost', () => {
  console.log('Listening...');
});
