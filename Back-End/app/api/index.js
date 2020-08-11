const { Router } = require('express');
const TicketRouter = require('./tickets');
const ParagraphRouter = require('./paragraphs');
const StoryRouter = require('./Stories');
const CompleteStory = require('./completeStory');
const Voice = require('./voice');
const User = require('./users');
const Message = require('./messages');

const router = new Router();
router.get('/status', (req, res) => res.status(200).json('ok'));
router.use('/tickets', TicketRouter);
router.use('/paragraphs', ParagraphRouter);
router.use('/stories', StoryRouter);
router.use('/completeStories', CompleteStory);
router.use('/audio', Voice);
router.use('/users', User);
router.use('/messages', Message);

module.exports = router;
