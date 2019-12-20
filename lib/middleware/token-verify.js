require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.cookies;
  try {
    jwt.verify(token, process.env.APP_SECRET || 'A_SECRET');
    next();
  } 
  catch(err){
    next(err);
  }
};
