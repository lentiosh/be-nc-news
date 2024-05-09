const db = require('../db/connection');

function fetchArticle(article_id) {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
        .then(({ rows }) => {
            return rows[0];
        });
}

function fetchAllArticles(topic, sort_by = 'created_at', order = 'desc') {
    let sqlQuery = `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) AS comment_count
                    FROM articles 
                    LEFT JOIN comments ON articles.article_id = comments.article_id`;

    const queryParams = [];

    if (topic) {
        sqlQuery += ` WHERE articles.topic = $1`;
        queryParams.push(topic);
    }

    switch (sort_by) {
        case 'date':
            sqlQuery += ' ORDER BY articles.created_at';
            break;
        case 'comment_count':
            sqlQuery += ' ORDER BY comment_count';
            break;
        case 'votes':
            sqlQuery += ' ORDER BY articles.votes';
            break;
        default:
            sqlQuery += ' ORDER BY articles.created_at';
    }

    sqlQuery += ` ${order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'}`;

    sqlQuery += ' GROUP BY articles.article_id';

    return db.query(sqlQuery, queryParams).then(({ rows }) => {
        if (!rows.length) return Promise.reject({ status: 404, msg: "No articles found" });
        return rows;
    });
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

function removeComment (comment_id) {
            return db.query(`DELETE FROM comments WHERE comment_id=$1 RETURNING *`,
          [comment_id]).then(({rows})=> {
            if(!rows.length) {
              return Promise.reject({ status: 404, msg: "comment does not exist"} )
            }
            return rows[0]
          })
            
          }

module.exports = { fetchArticle, fetchAllArticles, fetchAllCommentsByArticle, checkArticleExists, insertComment, updateArticle, removeComment }