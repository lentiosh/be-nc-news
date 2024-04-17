const { fetchArticle, fetchAllArticles, fetchAllCommentsByArticle, checkArticleExists } = require('../models/articles.models')

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
    fetchAllArticles()
    .then(articles => {
        res.status(200).send({ articles : articles })
    })
    .catch((err) => { 
        next(err);
      })
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

module.exports = { getArticle, getAllArticles, getAllCommentsByArticle }