const db = require('../db/connection')

function fetchArticle(article_id) {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
        .then(({ rows }) => {
            return rows[0];
        });
}

function fetchAllArticles(sort_by = "created_at", order = "desc") {
  const validSortByList = [ "created_at" ];
  const validOrderList = ["asc", "desc" ];

  let sqlQuery = `SELECT title, topic, author, body, created_at, votes, article_img_url comments.shop_name 
                      FROM articles 
                      LEFT JOIN comments
                      ON  =  `;

}

module.exports = { fetchArticle, fetchAllArticles }