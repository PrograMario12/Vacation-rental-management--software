//Rutas de la autenticación

import {Router} from 'express';
import { profile, signin, signout, signup } from '../controllers/auth.controller';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/profile', profile);

export default router;