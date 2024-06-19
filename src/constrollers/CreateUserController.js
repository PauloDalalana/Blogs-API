const userService = require('../services/userService');
const createToken = require('../utils/createToken');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userExists = await userService.findUserByEmail(email);
  if (userExists) {
    return res.status(409).json({ message: 'User already registered' });
  }

  const newUser = await userService.createUser({ displayName, email, password, image });

  const infoNewUser = {
    id: newUser.id,
    displayName,
    email,
    image,
  };

  const token = createToken(infoNewUser);

  return res.status(201).json({ token });
};

module.exports = { createUser };