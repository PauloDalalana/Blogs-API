const { BlogPost, PostCategory, sequelize } = require('../models');
const includePost = require('../utils/includePost');

const createPost = async (title, content, userId, categoryIds) => {
  let newPost;
  await sequelize.transaction(async (t) => {
    const createdPost = await BlogPost.create({
      title,
      content,
      userId,
      published: new Date(),
      updated: new Date(),
    }, { transaction: t });

    const postCategories = categoryIds.map((categoryId) => ({
      postId: createdPost.id,
      categoryId,
    }));

    await PostCategory.bulkCreate(postCategories, { transaction: t });
    newPost = createdPost;
  });

  return newPost;
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({ include: includePost });
  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({ where: { id }, include: includePost });
  return post;
};

const updatePost = async (id, userId, title, content) => {
  const post = await BlogPost.findOne({ where: { id } });

  if (!post) {
    return null;
  }

  if (post.userId !== userId) {
    return 'Unauthorized';
  }

  await BlogPost.update(
    { title, content, updated: new Date() },
    { where: { id } },
  );

  return getPostById(id);
};

module.exports = { createPost, getPosts, getPostById, updatePost };