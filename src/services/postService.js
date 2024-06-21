const { BlogPost, PostCategory, sequelize } = require('../models');

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

module.exports = {
  createPost,
};