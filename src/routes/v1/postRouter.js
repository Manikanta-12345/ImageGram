import express from "express";
import { s3uploader } from "../../config/multerConfig.js";
import { zodPostSchema } from "../../validators/post/zodPostSchema.js";
import { validateData } from "../../validators/zodValidator.js";
import {
  createPost,
  findAllPosts,
  updatePostById,
  deletePostById,
} from "../../controller/postController.js";

import { tokenValidationMiddleware } from "../../middleware/authMiddleWare.js";
import { isAdminCheck } from "../../middleware/isAdminMiddleWare.js";
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /posts:
 *  post:
 *      summary: Create a new post
 *      description: Create a new post
 *
 */

router.post(
  "/",
  tokenValidationMiddleware,
  isAdminCheck,
  s3uploader.single("image"),
  validateData(zodPostSchema),
  createPost
);

router.get("/", tokenValidationMiddleware, findAllPosts);

router.put("/", updatePostById);

router.delete("/", deletePostById);

export default router;
