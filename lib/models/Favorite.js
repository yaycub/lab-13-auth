const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  why: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Favorite', schema);
