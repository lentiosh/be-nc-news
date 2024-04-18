const db = require('../db/connection');

function fetchArticle(article_id) {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
        .then(({ rows }) => {
            return rows[0];
        });
}

function fetchAllArticles() {

  let sqlQuery = `SELECT articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) AS comment_count
                      FROM articles 
                      LEFT JOIN comments ON articles.article_id = comments.article_id
                      GROUP BY articles.article_id
                      ORDER BY articles.created_at DESC;`;

  return db.query(sqlQuery).then(({rows}) => {

    if (!rows.length) return Promise.reject({ status: 404, msg: "not found" });

    return rows;

  })
}

function fetchAllCommentsByArticle(article_id) {
    return db.query(`SELECT comment_id, votes, created_at, author, body, article_id FROM comments
    WHERE article_id=$1
    ORDER BY created_at DESC;`, [article_id])
    .then(({ rows: comments }) => {
        
        return comments;
    });
}
function checkArticleExists(article_id){
    return db.query(`SELECT * FROM articles WHERE article_id=$1`, [article_id])
    .then(({ rows: articles }) => {
        if(articles.length === 0) {
            return Promise.reject({ status: 404, msg: "article_id not found" })
        }
    })
}

function insertComment(article_id, username, body) {

    if (!body) {
        return Promise.reject({ status: 400, msg: "body not find" })
    }

    return db
      .query(
        `INSERT INTO comments
         (article_id, author, body)
         VALUES ($1, $2, $3) RETURNING *;`,
        [ article_id, username, body ]
      )
      .then(({ rows }) => {
        return rows[0];
      });
    }

function updateArticle(article_id, inc_votes) {
        return db.query(`UPDATE articles
                        SET votes = votes + $1
                        WHERE article_id = $2
                        RETURNING *;`, 
                        [inc_votes, article_id])
                        .then(({rows}) => {
                           return rows[0] 
                        })
        }

module.exports = { fetchArticle, fetchAllArticles, fetchAllCommentsByArticle, checkArticleExists, insertComment, updateArticle }