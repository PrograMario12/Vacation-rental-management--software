import {Router} from 'express'
import { deleteTask, getTask, updateTask, createTask, getAllTasks } from '../controllers/tasks.controller.js';

const router = Router();

router.get('/task', getAllTasks);
router.get('/task/:id', getTask);
router.post('/task', createTask);
router.put('/task/:id', updateTask);	
router.delete('/task:id', deleteTask);

export default router;