const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ws.bus.go.kr/api',
      changeOrigin: true,
    })
  );
};
