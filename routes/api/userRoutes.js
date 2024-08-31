// const router = require('express').Router();

// const {
//     getUsers,
//     getSingleUser,
//     createUser,
//     updateUser,
//     deleteUser,
//     addFriend,
//     removeFriend
// } = require('../../controllers/userController');

// router.route('/').get(getUsers).post(createUser);

// router.route('/:userId/:friendId').post(addFriend).delete(removeFriend);

// router 
// .route('/:userId')
// .get(getSingleUser)
// .put(updateUser)
// .delete(deleteUser);

// module.exports = router;

const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

router.route('/:userId/:friendId').post(addFriend).delete(removeFriend);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;