const { fetchArticle } = require('../models/articles.models')

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

module.exports = { getArticle }