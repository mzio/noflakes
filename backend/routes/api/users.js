const router = require("express").Router();
const userController = require("../../controllers/userController");

router
  .route("/")
  .get(userController.index)
  .post(userController.new);

router.route("/currentId").get(userController.currentId);

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
module.exports = router;
