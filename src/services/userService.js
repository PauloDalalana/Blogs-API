const { User } = require('../models');

const findUserByEmail = async (email) => User.findOne({ where: { email } });

const createUser = async (userData) => User.create(userData);

module.exports = {
  findUserByEmail,
  createUser,
};