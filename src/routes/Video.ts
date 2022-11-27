import express from 'express';
import controller from '../controllers/Video';
import { Schemas, ValidateSchema } from '../middleware/ValiateSchema';

const router = express.Router();

router.post('/', controller.createVideo);
router.get('/:videoId', controller.readVideo);
router.get('', controller.readAll);
router.put('/:videoId', ValidateSchema(Schemas.author.update), controller.updateVideo);
router.delete('/:videoId', controller.deleteVideo);

export = router;
