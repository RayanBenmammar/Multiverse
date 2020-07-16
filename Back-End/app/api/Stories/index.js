const { Router } = require('express');
const { Story } = require('../../models');
const { Paragraph } = require('../../models');

const router = new Router();


router.get('/', (req, res) => {
  Story.find({ })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

router.get('/findById/:id', (req, res) => {
  Story.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

router.get('/findByAuthor/:author', (req, res) => {
  Story.find({ author: req.params.author })
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
      title, context, author, idFirstParagraph,
    } = req.body;
    const story = {};
    story.title = title;
    story.context = context;
    story.author = author;
    story.idFirstParagraph = idFirstParagraph;
    const storyModel = new Story(story);
    await storyModel.save((err) => {
      if (err) {
        console.log('Ooops, something gone wrong');
      } else {
        console.log('Data has been saved! ');
      }
    });
    res.status(201).json(storyModel);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});
router.put('/:id', (req, res) => {
  try {
    const ObjectID = require('mongodb').ObjectID;
    console.log(req.params.id);
    console.log(req.body.idFirstParagraph);
    Story.updateOne(
      { _id: ObjectID(req.params.id) }, // Filter
      { $set: { idFirstParagraph: req.body.idFirstParagraph } }, // Update
    )
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
    res.status(201);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err.toString());
    }
  }
});
router.put('/like/:id', (req, res) => {
  try {
    const ObjectID = require('mongodb').ObjectID;
    console.log(req.params.id);
    console.log(req.body.like);
    Story.updateOne(
      { _id: ObjectID(req.params.id) }, // Filter
      { $set: { like: req.body.like } }, // Update
    )
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
    res.status(201);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err.toString());
    }
  }
});

router.get('/findByStory/:id', (req, res) => {
  Paragraph.find({ idStory: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

module.exports = router;
