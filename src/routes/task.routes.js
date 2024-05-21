import Router from 'express-promise-router'
import { deleteTask, getTask, updateTask, createTask, getAllTasks } from '../controllers/tasks.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';
import {validateSchema} from '../middlewares/validate.middleware.js'
import {createRequestSchema, updateRequestSchema} from '../schemas/request.schema.js'

const router = Router();

router.get('/task', isAuth, getAllTasks);
router.get('/task/:id', isAuth, getTask);
router.post('/task', isAuth, validateSchema(createRequestSchema), createTask); 
router.put('/task/:id', isAuth, validateSchema(updateRequestSchema), updateTask);	
router.delete('/task/:id', isAuth, deleteTask);

export default router;