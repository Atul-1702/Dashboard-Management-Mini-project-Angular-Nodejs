
import jsonwebtoken from 'jsonwebtoken';

export const userJWTValidation=(req,res,next)=>
{
   if(!req.headers.user)
   {
     return res.status(400).json({
        success:false,
        message:'Token does not exist'
     })
   }
   const verification=jsonwebtoken.verify(req.headers.user,process.env.SECRET_KEY);
   if(verification==null)
   {
    return res.status(400).json({
        success:false,
        message:'Token does not exist'
     })
   }
   next();
}
