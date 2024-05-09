const { fetchArticle, fetchAllArticles, fetchAllCommentsByArticle, checkArticleExists, insertComment, updateArticle, removeComment } = require('../models/articles.models')

function getArticle(req, res, next) {
    const { article_id } = req.params;

    fetchArticle(article_id)
    .then((article) => {

        if(!article) {
            return res.status(404).send({ msg : 'we dont find yor article' })
        }

        res.status(200).send({ article });
      })
      .catch((err) => {
        next(err);
      })
  }

function getAllArticles(req, res, next) {
    const { topic, sort_by, order } = req.query;

    fetchAllArticles(topic, sort_by, order)
        .then(articles => {
            res.status(200).send({ articles: articles });
        })
        .catch((err) => {
            next(err);
        });
}

  function getAllCommentsByArticle(req, res, next){
    const { article_id } = req.params;

    Promise.all([fetchAllCommentsByArticle(article_id), checkArticleExists(article_id) ])

    .then(([comments]) => {
        res.status(200).send({ comments })
    })
    .catch((err) => { 
        next(err);
      })
  }

  function postComment(req, res, next) {
    const { article_id } = req.params;
    const { username, body } = req.body;

    insertComment(article_id, username, body)
    .then((comment) => {
        res.status(201).send({ comment });
    })
    .catch((err) => { 
        next(err);
      })
  }

  function patchArticle(req, res, next) {
    const { article_id } = req.params;
    const { inc_votes } = req.body;

    updateArticle( article_id, inc_votes )
    .then((article) => {
        if(!article) {
            return res.status(404).send({ msg : 'article not found' })
        }
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
  }

  function deleteComment(req, res, next) {
    const { comment_id } = req.params;
    return removeComment(comment_id)
    .then((comment) => {
      res.status(204).send({comment})
    })
    .catch((err) => {
      console.log(err)
      if(err.code === '22P02') {
        res.status(400).send({ msg : 'bad request'})
      }
      next(err);
    });
  }

module.exports = { getArticle, getAllArticles, getAllCommentsByArticle, postComment, patchArticle, deleteComment }