const express = require('express')
const getTopics = require('./controllers/topics.controllers')

const app = express()

// app.use(express.json())

app.get('/api/topics', getTopics)

app.all("*", (req, res) => {
    res.status(404).send({ msg: "endpoint not found" });
  });
  
  app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    }
  });

module.exports = app;

