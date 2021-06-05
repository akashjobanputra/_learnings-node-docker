const express = require("express");

const postController = require("../controllers/postController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(protect, postController.getAllPosts)
  .post(protect, postController.createPost);

router
  .route("/:id")
  .get(protect, postController.getOnePost)
  .delete(protect, postController.deletePost)
  .patch(protect, postController.updatePost);

module.exports = router;
