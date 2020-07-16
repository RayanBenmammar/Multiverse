const { Router } = require('express');
const mongoose = require('mongoose');
const gridfs = require('gridfs-stream');
const fs = require('fs');
const formidable = require('formidable');

const { Voice } = require('../../models');

const media_path = '../../media';
const audio_path = `${media_path}/audio`;

if (!fs.existsSync(media_path)) {
  fs.mkdirSync(media_path);
  fs.mkdirSync(audio_path);
} else if (!fs.existsSync(audio_path)) {
  fs.mkdirSync(audio_path);
}

const audioRouter = new Router();

mongoose.Promise = global.Promise;
gridfs.mongo = mongoose.mongo;
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  const gfs = gridfs(connection.db);
  // var bucket = mongoose.mongo.GridFSBucket(connection.db);

  // Writing a file from local to MongoDB
  audioRouter.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm();

    form.uploadDir = audio_path;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (!err) {
        const narration = {};
        const fname = files.file.name;
        narration.author = fields.author;
        narration.title = fields.title;
        narration.idParagraph = fields.idParagraph;
        narration.filename = fname;
        const writestream = gfs.createWriteStream({
          filename: fname,
        });
        // var writestream = bucket.openUploadStream(files.file.name);
        fs.createReadStream(files.file.path).pipe(writestream)
          .on('finish', () => {
            console.log(`File ${fname} uploaded`);
            try {
              const voiceModel = new Voice(narration);
              voiceModel.save((err) => {
                if (err) {
                  console.log('Ooops, something gone wrong');
                } else {
                  console.log('Data has been saved! ');
                }
                res.status(201).json(voiceModel);
              });
            } catch (err) {
              if (err.name === 'ValidationError') {
                res.status(400).json(err.extra);
              } else {
                res.status(500).json(err);
              }
            }
          });
      }
    });
  });

  audioRouter.get('/get/:filename', (req, res) => {
    // Check file exist on MongoDB
    gfs.exist({ filename: req.params.filename }, (err, file) => {
      if (err || !file) {
        res.send('File Not Found');
      } else {
        const gridFSBucket = new mongoose.mongo.GridFSBucket(connection.db);
        const downloadStream = gridFSBucket.openDownloadStreamByName(req.params.filename);
        downloadStream.on('data', (chunk) => {
          res.write(chunk);
        });
        downloadStream.on('error', () => {
          res.sendStatus(404);
        });
        downloadStream.on('end', () => {
          res.end();
        });
        // var readstream = gfs.createReadStream({ filename: "upload_847c6075c14e5293aa2f5150d982a9aa.mp3.mp3" });
        // readstream.pipe(res);
      }
    });
  });

  audioRouter.get('/findByParagraph/:id', (req, res) => {
    Voice.find({ idParagraph: req.params.id })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  });

  // Delete a file from MongoDB
  audioRouter.get('/delete', (req, res) => {
    gfs.exist({ filename: db_filename }, (err, file) => {
      if (err || !file) {
        res.send('File Not Found');
      } else {
        gfs.remove({ filename: db_filename }, (err) => {
          if (err) res.send(err);
          res.send('File Deleted');
        });
      }
    });
  });

  // Get file information(File Meta Data) from MongoDB
  audioRouter.get('/meta', (req, res) => {
    gfs.exist({ filename: 'upload_847c6075c14e5293aa2f5150d982a9aa.mp3.mp3' }, (err, file) => {
      if (err || !file) {
        res.send('File Not Found');
      } else {
        gfs.files.find({ filename: 'upload_847c6075c14e5293aa2f5150d982a9aa.mp3.mp3' }).toArray((err, files) => {
          if (err) res.send(err);
          res.send(files);
        });
      }
    });
  });
});

module.exports = audioRouter;
