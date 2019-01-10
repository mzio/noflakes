const router = require("express").Router();
const pactController = require("../../controllers/pactController");

router
  .route("/")
  .get(pactController.index)
  .post(pactController.new);

router
  .route("/:pactId")
  .get(pactController.view)
  .patch(pactController.update)
  .put(pactController.update)
  .delete(pactController.delete);

router
  .route("/:pactId/users")
  .get(pactController.indexUsers)
  .post(pactController.addUser);

router
  .route("/:pactId/users/:username")
  .get(pactController.viewUserStatus)
  .patch(pactController.updateUserStatus)
  .put(pactController.updateUserStatus)
  .delete(pactController.removeUser);

module.exports = router;
