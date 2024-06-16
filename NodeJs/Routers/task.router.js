
import express from 'express';
import {createTask,getAllTasks,deleteTask,editTask} from '../Controllers/task.controller.js'
import {userJWTValidation} from '../middlewares/user.middleware.js'
export const router=express.Router();

router.post('/create',createTask);
router.get('/get-all',getAllTasks);
router.delete('/delete',deleteTask);
router.put('/edit',editTask);

