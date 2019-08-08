const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decodedToken = await jwt.verify(token, process.env.JWT_PRIVATE_TOKEN);
    const user = await User.findOne({ _id: decodedToken.id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send('Lutfen giris yapiniz.');
  }

}

module.exports = auth;
