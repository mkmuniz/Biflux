import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import logger from 'morgan';
import authRouter from './modules/auth/auth.routes';
import userRouter from './modules/user/user.routes';

const express = require('express');
const app = express();
const cors = require('cors');

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: "Api is working, good job :)"
  });
});

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(authRouter);

export default app;