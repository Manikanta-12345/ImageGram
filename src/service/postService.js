import {
  createPostRepository,
  findAllPostsRepository,
  countAllPosts,
  updatePostByIdRepository,
  deletePostByIdRepository,
  findByPostNameRepository,
} from "../repositories/postRepository.js";

export const createPostService = async (createPostObject) => {
  const caption = createPostObject.caption;
  const image = createPostObject.image;
  const userName = createPostObject.userName;
  const isPostExist = await findByPostNameRepository(createPostObject.caption);
  console.log("ispost exisits" + isPostExist);
  if (!isPostExist) {
    const post = await createPostRepository(caption, image, userName);
    return post;
  } else {
    throw Error("Post already exisits");
  }
};

export const findAllPostsService = async (offset, limit) => {
  let totalDocs = 0;
  let totalPages = 0;
  let posts = [];
  try {
    totalDocs = await countAllPosts();
    totalPages = Math.ceil(totalDocs / limit);
    posts = await findAllPostsRepository(offset, limit);
  } catch (error) {
    throw error;
  }
  return { totalDocs, totalPages, posts };
};

export const updatePostByIdService = async (updatePostObject) => {
  try {
    const updatedPost = await updatePostByIdRepository(updatePostObject);
    return updatedPost;
  } catch (error) {
    throw error;
  }
};

export const deletePostByIdService = async (id) => {
  try {
    const updatedPost = await deletePostByIdRepository(id);
    return updatedPost;
  } catch (error) {
    throw error;
  }
};
