'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {DATABASE_URL, PORT} = require('./config');
// const {SpentMin, PlannedMin} = require('./models');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

mongoose.promise = global.promise;
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.use('*', (req, res) => {
  return res.status(404).json({message: 'Not Found'});
});

// Public files
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/public/index.html');
});

let server;
// connects mongoose and starts server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    // identifies the server url to connect to for mongoDB database server.
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      // begins accepting connections on the specified port.
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        // node method that binds event handlers to events by their string name ('error'), identical jquery method.
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}
if (require.main === module) {
  runServer().catch(err => console.error(err));
}
module.exports = {
  app,
  runServer,
  closeServer
};