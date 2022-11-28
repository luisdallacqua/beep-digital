import express from 'express';
import controller from '../controllers/Video';
import extractJWT from '../middleware/extractJWT';
import { Schemas, ValidateSchema } from '../middleware/ValiateSchema';

const router = express.Router();

router.post('/', extractJWT, ValidateSchema(Schemas.video.create), controller.createVideo);
router.get('/:videoId', extractJWT, controller.readVideo);
router.get('', extractJWT, controller.readAll);
router.put('/:videoId', extractJWT, ValidateSchema(Schemas.video.update), controller.updateVideo);
router.delete('/:videoId', extractJWT, controller.deleteVideo);

export = router;
