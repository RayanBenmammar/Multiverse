const mongoose = require('mongoose');

const user = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
  },
  favs: [{
    type: String,
  }],
  likes: [{
    type: String,
  }],

});

module.exports = User = mongoose.model('user', user);
