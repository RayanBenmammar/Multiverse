const { Router } = require('express');
const { Paragraph } = require('../../models');


const router = new Router();


router.get('/', (req, res) => {
  Paragraph.find({ })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

router.get('/findById/:id', (req, res) => {
  Paragraph.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

router.get('/findParent/:id', (req, res) => {
  Paragraph.findOne({ _id: req.params.id })
    .then((data) => {
      Paragraph.findById(data.idParent)
        .then((data2) => {
          res.json(data2);
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

router.get('/findChildren/:id', (req, res) => {
  Paragraph.find({ idParent: req.params.id })
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
      description, text, idStory, idParent, author, endParagraph,
    } = req.body;
    const paragraph = {};
    paragraph.description = description;
    paragraph.text = text;
    paragraph.idStory = idStory;
    paragraph.idParent = idParent;
    paragraph.author = author;
    paragraph.endParagraph = endParagraph;
    const paragraphModel = new Paragraph(paragraph);
    await paragraphModel.save((err) => {
      if (err) {
        console.log('Ooops, something gone wrong');
      } else {
        console.log('Data has been saved! ');
      }
    });
    res.status(201).json(paragraphModel);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
