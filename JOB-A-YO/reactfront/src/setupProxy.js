// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'http://localhost:8090',	// 서버 URL or localhost:설정한포트번호
//       changeOrigin: true,
//       proxyTimeout: 60000,
//       timeout: 60000,
//     })
//   );
// };