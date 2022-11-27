import express from 'express';
import controller from '../controllers/User';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.get('/validate', extractJWT, controller.validateToken);
router.get('/', controller.getAllUsers);
router.post('/', controller.register);
router.post('/login', controller.login);
export = router;
