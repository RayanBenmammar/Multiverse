const mongoose = require('mongoose');

const paragraph = new mongoose.Schema({
  description: {
    type: String,
  },
  text: {
    type: String,
  },
  idStory: {
    type: String,
  },
  idParent: {
    type: String,
  },
  author: {
    type: String,
  },
  endParagraph: {
    type: Boolean,
  },
  tagsList: [{
    type: String,
  }],
});

module.exports = Paragraph = mongoose.model('paragraph', paragraph);
