
import mongoose from 'mongoose';
import jsonwebtoken  from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:
    {
      type:String,
      required:[true,"Password is required"],
      minLength:[6,"Minlength Should not be less than 6"],
      maxLength:[8,"Maxlength should not be greater than 8"],
      select:false
    }
    
})
UserSchema.pre('save',async function(next)
{
   if(!this.isModified('password'))
   {
     return next();
   }
   this.password=await bcrypt.hash(this.password,10); 
   return next();
}
)
UserSchema.methods={
   JWT()
   {
      return jsonwebtoken.sign(
        {email:this.email,password:this.password},
        process.env.SECRET_KEY
      )
   }
}
export const User=mongoose.model("User",UserSchema);