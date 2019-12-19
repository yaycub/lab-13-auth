const mongoose = require('mongoose');

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
  toJson: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
    }
  }
});

module.exports = mongoose.model('User', schema);
