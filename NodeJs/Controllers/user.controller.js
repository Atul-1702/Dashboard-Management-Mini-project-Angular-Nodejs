
import {User} from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
export const signup=async(req,res)=>
{
    try
    {
       const newUser=await User.create(req.body);
       const token=newUser.JWT();
       const cookie_options={
         httpOnly:true,
         maxAge:24*60*1000,
         
       }
       res.cookie("user",token,cookie_options);
       return res.status(200).json({
         suceess:true,
         message:"User Created Successfully",
         responseData:newUser,
         token:token
       })
    }
    catch(error)
    {
       return res.status(400).json({
        suceess:false,
        message:error.message,
        responseData:error
       })
    }
}
export const login=async(req,res)=>
{
   try
   {
       var verifiedUser=await User.findOne({email:req.body.email}).select('+password');
       if(verifiedUser==null)
       {
         return res.status(400).json({
            success:false,
            message:"Email id does not exist",
          })
       }
       if(!await bcrypt.compare(req.body.password,verifiedUser.password))
       {
         return res.status(400).json({
            success:false,
            message:"Invalid Password",
          })
       }
       let token=verifiedUser.JWT();
       const cookie_options={
         httpOnly:true,
         maxAge:24*60*1000,
       }
       res.cookie("user",token,cookie_options);
       verifiedUser=JSON.parse(JSON.stringify(verifiedUser));
       delete verifiedUser.password;
       return res.status(200).json({
         success:true,
         message:"User verfication successfull",
         responseData:verifiedUser,
         token:token
       })
   }
   catch(error)
   {
      return res.status(400).json({
         success:false,
         message:"User verification failed",
         responseData:error
      })
   }
}
export const tokenVerify=(req,res)=>
{
   try
   {
     if(!req.headers.user)
     {
        return res.status(200).json({
         message:"Token does not exist",
         success:false
        })
     }
     let verification=jsonwebtoken.verify(req.headers.user,process.env.SECRET_KEY);
      if(!verification)
      {
         return res.status(200).json({
            message:"Token does not exist",
            success:false
           })
      }
      return res.status(200).json({
         message:"Token exist",
         success:true
        })
   }
   catch(error)
   {
      return res.status(400).json({
         success:false,
         message:error.message,
         responseData:error
      })
   }
}