const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  passwordHash:{
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

schema.virtual('password').set(function(password){
  this.passwordHash = bcrypt.hashSync(password, 14);
});

schema.statics.authenticate = async function({ email, password }){
  const user = await this.findOne({ email });
  if(!user){
    const err = new Error('Invalid Email/Password');
    err.status = 403;
    throw err;
  }

  const correctPass = bcrypt.compareSync(password, user.passwordHash);
  if(!correctPass){
    const err = new Error('Invalid Email/Password');
    err.status = 403;
    throw err;
  }

  return user;
};

module.exports = mongoose.model('User', schema);
