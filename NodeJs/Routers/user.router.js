
import express from 'express';
import {signup,login,tokenVerify} from '../Controllers/user.controller.js'
export const userRouter=express.Router();

userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.get('/verify',tokenVerify);