import { Router } from 'express';
import {
    LoginContact,
    RegisterContact
} from '../controllers/authController';

const router = Router();

router.route('/auth/login').post(LoginContact);
router.route('/auth/register').post(RegisterContact);

export default router;