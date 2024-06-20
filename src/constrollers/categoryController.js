const Joi = require('joi');
const { Category } = require('../models');

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const createCategory = async (req, res) => {
  const { name } = req.body;

  const { error } = categorySchema.validate({ name });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newCategory = await Category.create({ name });

  return res.status(201).json(newCategory);
};

const getAllCategories = async (req, res) => {
  const categories = await Category.findAll({
    attributes: ['id', 'name'],
  });
  return res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};