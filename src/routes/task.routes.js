import {Router} from 'express'

const router = Router();

router.get('/task', (req, res) => res.send('Obteniendo tareas'));
router.get('/task/:id', (req, res) => res.send('Obteniendo tarea única'));
router.post('/task', (req, res) => res.send('Creando tarea'));
router.put('/task/:id', (req, res) => res.send('Actualizando tarea única'));	
router.delete('/task:id', (req, res) => res.send('Eliminando tarea única'));

export default router;