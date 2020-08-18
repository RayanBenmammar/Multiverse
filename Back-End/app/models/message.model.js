const mongoose = require('mongoose');

const message = new mongoose.Schema({
  text: {
    type: String,
  },
  completeStoryID: {
    type: String,
  },
  author: {
    type: String,
  },
  rate: {
    type: String,
  },
});

module.exports = Message = mongoose.model('message' , message);
