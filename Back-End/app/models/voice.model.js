const mongoose = require('mongoose');

const voice = new mongoose.Schema({
  author: {
    type: String,
  },
  title: {
    type: String,
  },
  idParagraph: {
    type: String,
  },
  filename: {
    type: String,
  },

});

module.exports = Voice = mongoose.model('voice', voice);