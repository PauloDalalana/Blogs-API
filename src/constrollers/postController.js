const postService = require('../services/postService');
const validatePostCreation = require('../middlewares/validatePostCreation');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;

  const newPost = await postService.createPost(title, content, userId, categoryIds);
  return res.status(201).json(newPost);
};

module.exports = {
  createPost,
  validatePostCreation,
};