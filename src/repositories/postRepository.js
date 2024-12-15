import Post from "../schema/post.js";

export const createPostRepository = async (caption, image, userName) => {
  try {
    const newPost = await Post.create({ caption, image, userName });
    // const newPost = new Post({ caption, image, user });
    // await newPost.save();
    return newPost;
  } catch (error) {
    console.log(error);
  }
};

export const findByPostNameRepository = async (postName) => {
  const post = await Post.findOne({ caption: postName }).exec();
  return post;
};

export const findAllPostsRepository = async (offset, limit) => {
  try {
    const posts = await Post.find().skip(offset).limit(limit);
    //.populate("user", "email");
    return posts;
  } catch (error) {
    throw error;
  }
};

export const countAllPosts = async () => {
  const count = await Post.countDocuments();
  return count;
};

export const findByPostId = async (id) => {
  try {
    const post = await Post.findById({ id });
    return newPost;
  } catch (error) {
    throw error;
  }
};

export const deletePostByIdRepository = async (id) => {
  const post = await Post.findByIdAndDelete(id, { returnOriginal: false });
  return post;
};

export const updatePostByIdRepository = async (updatePostObject) => {
  console.log("updating post with id" + updatePostObject._id);
  const post = await Post.findByIdAndUpdate(
    updatePostObject._id,
    updatePostObject,
    { new: true }
  );
  return post;
};
