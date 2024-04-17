const express = require('express')
const { getTopics, getAllAPI } = require('./controllers/topics.controllers')
const { getArticle, getAllArticles, getAllCommentsByArticle } = require('./controllers/articles.controllers')


const app = express()

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getAllAPI)

app.get('/api/articles/:article_id', getArticle)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getAllCommentsByArticle)

app.all("*", (req, res) => {
    res.status(404).send({ msg: "endpoint not found" });
  });
  
  app.use((err, req, res, next) => {

    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    }
  });

module.exports = app;

