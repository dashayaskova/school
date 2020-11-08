import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

import api from './src/api';

const port = parseInt(process.env.PORT) || 3001;
const env = process.env.NODE_ENV;

const app = express();

// Logging
if (env === 'developement') {
    app.use((req, res, next) => {
        next();
        console.log(req.method, req.path, res.statusCode, '-', new Date())
    });
}

// Utils
app.use(cookieParser());
app.use(bodyParser.json());

// API
app.use('/auth', api);

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on port ${port} [env: ${env}]`)
});
