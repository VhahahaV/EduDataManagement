const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/rmp-resource-service/project/663ae0718562cc0015aaf2cc/resource',
    createProxyMiddleware({
      target: 'http://202.120.40.86:14642',
      changeOrigin: true,
    })
  );
};