import {schema} from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const task = await schema.create(req.body);
    res.status(200).json({
      success: true,
      responseData: task,
      message: "Task Created Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      responseData: err,
      message: err.message,
    });
  }
};
export const getAllTasks=async (req,res)=>
{
  try
  {
     let tasks=await schema.find();
     return res.status(200).json({
      tasks
     })
  }
  catch(err)
  {
     return res.status(400).json({
      err
     })
  }
}
export const deleteTask= async(req,res)=>
{
    try
    {
     
      const deletedTask=await schema.findByIdAndDelete(req.query.id);
      return res.status(200).json({
        success:true,
        responseData:deletedTask,
        message:"Task deleted successfully"
      })
    }
    catch(error)
    {
      return res.status(400).json({
        success:false,
        responseData:error,
        message:error.message
      })
    }
}
export const editTask=async(req,res)=>
{
  try
  {
     const editedTask=await schema.findByIdAndUpdate(req.query.id,req.body)
     return res.status(200).json({
      success:true,
      message:'Task edited successfully',
      responseData:editedTask
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

