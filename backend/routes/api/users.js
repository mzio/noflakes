const router = require("express").Router();
const userController = require("../../controllers/userController");

router
  .route("/")
  .get(userController.index)
  .post(userController.new);

router
  .route("/:username")
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);

router
  .route("/:username/friends")
  .get(userController.indexFriends)
  .post(userController.sendFriendRequest);

router
  .route("/:username/friends/:friendname")
  .get(userController.viewFriendRequest)
  .post(userController.acceptFriendRequest)
  .delete(userController.removeFriend);

router
  .route("/:username/score")
  .get(userController.viewScore)
  .post(userController.updateScore);
module.exports = router;
