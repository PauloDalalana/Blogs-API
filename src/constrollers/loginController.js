const userService = require('../services/userService');
const createToken = require('../utils/createToken');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.findUserByEmail(email);
    
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  const userInfo = {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    image: user.image,
  };
  const token = createToken(userInfo);

  return res.status(200).json({ token });
};

module.exports = {
  login,
};