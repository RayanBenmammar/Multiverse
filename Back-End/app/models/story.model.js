const mongoose = require('mongoose');

const story = new mongoose.Schema({
  title: {
    type: String,
  },
  context: {
    type: String,
  },
  author: {
    type: String,
  },
  idFirstParagraph: {
    type: String,
  },
  like: {
    type: Number,
  },
  literaryGenreList: [{
    type: String,
  }],
});

module.exports = Story = mongoose.model('story', story);
