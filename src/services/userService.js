const { User } = require('../models');

const findUserByEmail = async (email) => User.findOne({ where: { email } });

const createUser = async (userData) => User.create(userData);

const findAllUsers = async () => User.findAll({
  attributes: ['id', 'displayName', 'email', 'image'],
});

const findUserById = async (id) => User.findByPk(id);

module.exports = {
  findUserByEmail,
  createUser,
  findAllUsers,
  findUserById,
};