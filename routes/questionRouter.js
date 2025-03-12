const express = require("express");
const router = express.Router();
const questionController = require("../controller/questionController");
const questionMiddleware = require("../middlewares/questionMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.param("id", questionMiddleware.validateParamId);

router
  .route("/")
  .get( questionController.getAllQuestions)
  .post(questionController.cerateQuestion);

router
  .route("/:id")
  .get(questionController.getQuestion)
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

module.exports = router;