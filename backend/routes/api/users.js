const router = require("express").Router();
const userController = require("../../controllers/userController");

router
  .route("/")
  .get(userController.index)
  .post(userController.new);

router
  .route("/:user_id")
  .get(userController.view)
  .patch(userController.update)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
