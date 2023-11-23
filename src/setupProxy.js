const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/tooit', {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }),
  );
  // app.use(
  //   createProxyMiddleware({
  //     target: 'https://tooit-icon.s3.ap-northeast-2.amazonaws.com',
  //     changeOrigin: true,
  //   }),
  // );
};
