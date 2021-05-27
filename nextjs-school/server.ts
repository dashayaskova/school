/* eslint-disable no-console */
import express, { Response } from 'express';
import next from 'next';
import cookieParser from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { auth, privateView, adminView } from './middleware';
import { IGetUserRequest } from './src/utils/userReq';

const port = parseInt(process.env.PORT as string, 10) || 3000;
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

  server.get('/', (req: IGetUserRequest, res: Response) => {
    if (req.user) {
      const url = req.user.isAdmin ? '/users' : '/students';
      res.redirect(url);
    } else {
      return handle(req, res)
    }
  });

  server.all('/users*', adminView, (req, res) => handle(req, res));

  server.all('/_next*', (req, res) => handle(req, res));
  
  server.all('*', privateView, (req, res) => handle(req, res));

  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on port ${port} [${env}]`)
  })
}).catch((err) => {
  console.log('An error occurred, unable to start the server')
  console.log(err)
})