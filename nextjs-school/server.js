/* eslint-disable no-console */
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser')

const { createProxyMiddleware } = require('http-proxy-middleware');

const { auth, privateView, adminView } = require('./middleware.js');

const port = parseInt(process.env.PORT) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const proxyGraphql = createProxyMiddleware({
  target: process.env.GRAPHQL_PROXY_HOST,
  changeOrigin: true,
});
const proxyAuth = createProxyMiddleware({
  target: process.env.AUTH_PROXY_HOST,
  changeOrigin: true,
});

app.prepare().then(() => {
  const server = express();

  // Utils
  server.use(cookieParser());
  server.use(auth);

  // Proxy to auth
  server.use('/auth/*', proxyAuth);
  server.use('/graphql', privateView, proxyGraphql);

  server.get('/', (req, res, next) => {
    if (req.user) {
      const url = req.user.isAdmin ? '/admin/users' : '/user/students';
      res.redirect(url);
    } else {
      next();
    }
  })

  server.all('/admin/*', adminView, (req, res) => handle(req, res));

  server.all('/user/*', privateView, (req, res) => handle(req, res))

  server.all('*', (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on port ${port} [${env}]`)
  })
}).catch((err) => {
  console.log('An error occurred, unable to start the server')
  console.log(err)
})