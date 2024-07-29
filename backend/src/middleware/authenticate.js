const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).send('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');
    const verifyToken = jwt.verify(token, process.env.MY_SECRET_KEY);

    const user = await User.findOne({
      _id: verifyToken._id,
      'tokens.token': token,
    });

    if (!user) {
      return res.status(401).send('Unauthorized: Invalid token');
    }

    req.token = token;
    req.user = user;
    req.userID = user._id;

    next();
  } catch (error) {
    res.status(401).send('Unauthorized: Invalid token');
    console.error(error);
  }
};

module.exports = authenticate;
