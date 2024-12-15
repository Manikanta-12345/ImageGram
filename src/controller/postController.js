import {
  createPostService,
  findAllPostsService,
  updatePostByIdService,
  deletePostByIdService,
} from "../service/postService.js";

export const createPost = async (req, res) => {
  console.log("logger user information", req.user);
  try {
    const post = await createPostService({
      caption: req.body.caption,
      image: req.file.location,
      userName: req.user.username,
    });
    return res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const findAllPosts = async (req, res) => {
  const offset = req.query.offset || 0;
  const limit = req.query.limit || 10;

  const response = await findAllPostsService(offset, limit);

  return res.status(200).json({ success: true, data: response });
};

export const updatePostById = async (req, res) => {
  try {
    console.log("logger user information", req.user);
    const updatedObject = req.body;

    const response = await updatePostByIdService(updatedObject);

    console.log(response);

    return res.status(200).json({
      message: "Post updated successfully",
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deletePostById = async (req, res) => {
  try {
    const id = req.body._id;

    const response = await deletePostByIdService(id);

    console.log(response);
    if (response) {
      return res.status(200).json({
        message: "Post deleted successfully",
        success: true,
        data: response,
      });
    } else {
      return res.status(400).json({
        message: "Post not found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
