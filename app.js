const express = require('express')
const {getTopics, getAllAPI} = require('./controllers/topics.controllers')


const app = express()

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getAllAPI)

app.all("*", (req, res) => {
    res.status(404).send({ msg: "endpoint not found" });
  });
  
  app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else {
        res.status(500).send({ msg: 'Server error' })
    }
  });

module.exports = app;

