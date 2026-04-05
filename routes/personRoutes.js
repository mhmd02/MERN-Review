import {Router} from 'express';
import {getAllPersons} from '../controllers/personController.js';

const router = Router();

router.get('/', getAllPersons);

export default router;