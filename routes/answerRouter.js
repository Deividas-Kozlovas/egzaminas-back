const express = require("express");
const router = express.Router();
const answerController = require("../controller/answerController");
const answerMiddleware = require("../middlewares/answerMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.param("id", answerMiddleware.validateParamId);

router
  .route("/")
  .get( answerController.getAnswer)
  .post(answerController.createAnswer);

router
  .route("/:id")
  .get(answerController.getAllAnswers)
  .patch(answerController.updateAnswer)
  .delete(answerController.deleteAnswer);

module.exports = router;