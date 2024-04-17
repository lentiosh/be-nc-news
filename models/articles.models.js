const db = require('../db/connection')

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
    console.log(rows)

    return rows;

  })
}

module.exports = { fetchArticle, fetchAllArticles }