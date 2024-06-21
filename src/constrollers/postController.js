const postService = require('../services/postService');
const validatePostCreation = require('../middlewares/validatePostCreation');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;

  const newPost = await postService.createPost(title, content, userId, categoryIds);
  return res.status(201).json(newPost);
};

const getPosts = async (req, res) => {
  const posts = await postService.getPosts();
  res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  res.status(200).json(post);
};
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const result = await postService.updatePost(id, userId, title, content);

  if (result === 'Unauthorized') {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  
  res.status(200).json(result);
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  validatePostCreation,
  updatePost,
};