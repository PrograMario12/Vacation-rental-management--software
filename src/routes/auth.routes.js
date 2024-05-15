//Rutas de la autenticación

import {Router} from 'express';

const router = Router();

router.post('/signup', (req, res) => res.send('Registro de usuario'));
router.post('/signin', (req, res) => res.send('Inicio de sesión'));
router.post('/signout', (req, res) => res.send('Cerradno sesión'));
router.get('/profile', (req, res) => res.send('Perfil de usuario'));

export default router;