const { Router } = require('express');
const { CompleteStory } = require('../../models');


const router = new Router();


router.get('/', (req, res) => {
  CompleteStory.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

router.get('/findById/:id', (req, res) => {
  CompleteStory.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});
router.get('/findByStoryId/:id', (req, res) => {
  CompleteStory.find({ idStory: req.params.id })
    .then((data2) => {
      res.json(data2);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});


router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const {
      title, context, authors, paragraphs, rate, rateCount, idStory
    } = req.body;
    const completeStory = {};
    completeStory.title = title;
    completeStory.context = context;
    completeStory.authors = authors;
    completeStory.paragraphs = paragraphs;
    completeStory.rate = rate;
    completeStory.rateCount = rateCount;
    completeStory.idStory = idStory;
    const storyModel = new CompleteStory(completeStory);
    await storyModel.save((err) => {
      if (err) {
        console.log('Ooops, something gone wrong');
      } else {
        console.log('Data has been saved! ');
      }
    });
    res.status(201)
      .json(storyModel);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400)
        .json(err.extra);
    } else {
      res.status(500)
        .json(err);
    }
  }
});
router.put('/:id', (req, res) => {
  try {
    const ObjectID = require('mongodb').ObjectID;
    console.log(req.params.id);
    console.log(req.body.rate);
    CompleteStory.updateOne(
      {_id: ObjectID(req.params.id)}, // Filter
      {
        $set: {
          rate: req.body.rate,
          rateCount: req.body.rateCount
        }
      }, // Update
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

module.exports = router;
