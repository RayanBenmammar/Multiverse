const mongoose = require('mongoose');

const completeStory = new mongoose.Schema({
  title: {
    type: String,
  },
  context: {
    type: String,
  },
  idStory: {
    type: String,
  },
  authors: [{
    type: String,
  }],
  paragraphs: [{
    type: String,
  }],
  rate: {
    type: Number,
  },
  rateCount: {
    type: Number,
  },
});

module.exports = CompleteStory = mongoose.model('completeStory', completeStory);
