const { Router } = require('express');
const { Message } = require('../../models');

const router = new Router();

router.get('/', (req, res) => {
  Message.find({ })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

router.get('/completeStoryId/:id', (req, res) => {
  Message.find({ completeStoryID: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

router.post('/', async (req, res) => {
  try {
    const {
       text, completeStoryID, author,
    } = req.body;
    const message = {};
    message.text = text;
    message.completeStoryID = completeStoryID;
    message.author = author;
    const messageModel = new Message(message);
    await messageModel.save((err) => {
      if (err) {
        console.log('Ooops, something gone wrong');
      } else {
        console.log('Data has been saved! ');
      }
    });
    res.status(201).json(messageModel);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
