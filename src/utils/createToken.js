const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const createToken = (payload) => {
  const token = jwt.sign({ payload }, secret);
  return token;
};

module.exports = createToken;