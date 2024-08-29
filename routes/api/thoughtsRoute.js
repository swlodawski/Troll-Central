const router = require('express').Router();
const {
    getThoughts,
    getSingleThoughts,
    createThoughts,
    deleteThoughts,
    addReaction,
    removeReaction
} = require('../../controllers');

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtId').get(getSingleThoughts).delete(deleteThoughts).put(updateThought);

router.route('./:thoughtId/reactions').post(addReaction);

router.route('/thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;