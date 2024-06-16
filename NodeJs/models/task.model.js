
import mongoose from 'mongoose';

const TaskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"],
        trim:true,
        minlength:[4,"title length should have minimum 4 length"]
    },
    description:
    {
        type:String,
        required:true,
    },
    assignedTo:
    {
        type:String,
        required:true
    },
    createdAt:
    {
        type:String,
        required:true
    },
    priority:
    {
        type:String,
        required:true
    },
    status:
    {
        type:String,
        required:true
    }
})
export const schema=mongoose.model('task',TaskSchema);
