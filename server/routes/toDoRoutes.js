const express = require("express");
const authController = require("../controllers/authController");
const toDoController = require("../controllers/toDoController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .get(toDoController.getAllToDo)
  .post(
    authController.restrictTo("user"),
    toDoController.setUserId,
    toDoController.createToDo
  );

router
  .route("/:id")
  .get(toDoController.getToDo)
  .patch(toDoController.updateToDo)
  .delete(toDoController.deleteToDo);

module.exports = router;
