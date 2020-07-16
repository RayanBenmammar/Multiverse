/* const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://PnsInnov:pnsinnov@pnsinnov-teamw-pfi12.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  console.log('Database connected ...!');
  client.close();
});


module.exports = client;
*/

const mongoose = require('mongoose');

const uri = 'mongodb+srv://PnsInnov:pnsinnov@pnsinnov-teamw-pfi12.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Database connected ...!');
};

module.exports = connectDB;
