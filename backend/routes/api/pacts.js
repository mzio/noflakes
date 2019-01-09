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

module.exports = router;
