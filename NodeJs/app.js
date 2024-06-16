
import  dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connection} from './config/taskdatabse.js';
import {router} from './Routers/task.router.js';
import { userRouter } from './Routers/user.router.js';
import { userJWTValidation } from './middlewares/user.middleware.js';
export const app=express();

dotenv.config();
connection();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/task',userJWTValidation,router);
app.use('/user',userRouter);




