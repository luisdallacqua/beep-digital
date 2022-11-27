import express from 'express';
import controller from '../controllers/Tag';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.post('/', extractJWT, controller.createTag);
router.get('/:title_tag/videos', extractJWT, controller.getVideosWithNameTag);
router.get('/', extractJWT, controller.readAll);
router.put('/:tagId', extractJWT, controller.updateTag);
router.delete('/:tagId', extractJWT, controller.deleteTag);

export = router;
