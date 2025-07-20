const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (target) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/auth': '', // Par exemple, retire le préfixe /auth si besoin
    },
    onProxyReq: (proxyReq, req, res) => {
      // Tu peux ajouter ici des headers personnalisés si besoin
    },
    onError: (err, req, res) => {
      res.status(500).json({ message: 'Erreur de proxy', error: err.message });
    }
  });
};