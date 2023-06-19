const express = require("express");
const userController = require("../controllers/usersController");
const authController = require("../controllers/authController");
const router = express.Router();
const toDoRouter = require("./toDoRoutes");

router.use("/:userId/toDo", toDoRouter);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use(authController.protect);

router.use(authController.restrictTo("admin"));

router.route("/").get(userController.getAllUsers, userController.getUser);
router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;
