import express from 'express';
import controller from '../controllers/Tag';

const router = express.Router();

router.post('/', controller.createTag);
router.get('/:title_tag/videos', controller.getVideosWithNameTag);
router.get('/', controller.readAll);
router.put('/:tagId', controller.updateTag);
router.delete('/:tagId', controller.deleteTag);

export = router;
