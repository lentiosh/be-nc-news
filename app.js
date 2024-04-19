const express = require('express')
const { getAllUsers } = require('./controllers/users.controllers')
const { getTopics, getAllAPI } = require('./controllers/topics.controllers')
const { getArticle, getAllArticles, getAllCommentsByArticle, postComment, patchArticle, deleteComment } = require('./controllers/articles.controllers')


const app = express()

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getAllAPI)

app.get('/api/articles/:article_id', getArticle)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getAllCommentsByArticle)

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', patchArticle)

app.delete("/api/comments/:comment_id", deleteComment)

app.get('/api/users', getAllUsers)

app.all("*", (req, res) => {
    res.status(404).send({ msg: "endpoint not found" });
  });
  
app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    }
    next(err)
  });

module.exports = app;

