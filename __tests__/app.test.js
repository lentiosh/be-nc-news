const request = require('supertest')
const db = require('../db/connection')
const app = require('../app')
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const endpoints = require('../endpoints.json')

afterAll(() => {
    db.end();
});
  
beforeEach(() => {
    return seed(data);
});

describe('/api/topics', () => {
    test('GET 200: Responds with all topics', () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(Array.isArray(topics)).toBe(true);
        expect(topics).toHaveLength(3);
        topics.forEach(
            ({ description, slug }) => {
              expect(typeof description).toBe("string");
              expect(typeof slug).toBe("string");
            }
          );
      })
    })
})

describe('/api', () => {
  test('sends the updated endpints object', () => {
    return request(app)
    .get('/api')
    .then((response) => {
      expect(response.body.endpoints).toEqual(endpoints)
    })
  })
})

describe('/api/articles/:article_id', () => {
  test('GET 200: Responds with an article when we query by id', () => {
  return request(app)
    .get("/api/articles/1")
    .expect(200)
    .then(({ body }) => {
      const { article } = body;
      expect(article).toMatchObject({
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 100,
        article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
    });
    });
  })

  

  test('GET 404: article not found for non-existing article_id', () => {
    return request(app)
        .get('/api/articles/123456')
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
            expect( msg ).toBe('we dont find yor article');
        });
});
})

describe('/api/articles', () => {
  test('GET 200: Responds with an articles array of article objects', () => {
  return request(app)
    .get("/api/articles")
    .expect(200)
    .then(({ body }) => {
      const { articles } = body;
      expect(articles.length).toBe(13)
      articles.forEach((article) => {
        expect(article).toMatchObject({
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(String),
          article_img_url: expect.any(String)
      });
      expect(article.body).toBe(undefined)
      })
      expect(Array.isArray(articles)).toBe(true);

    });
  });
})

describe('/api/articles/1/comments', () => {
  test('GET 200: Respons with an array of comments associated with the article_id', () => {
    return request(app)
    .get('/api/articles/1/comments')
    .expect(200)
    .then(({ body: { comments } }) => {
      expect(comments).toHaveLength(11)
    })
  })
  test('GET 200: Respons with an empty array when comments has not articles', () => {
    return request(app)
    .get('/api/articles/4/comments')
    .expect(200)
    .then(({ body: { comments } }) => {
      expect(comments).toHaveLength(0)
    })
  })
  test('GET 404: Responds with an error when article_id is valid but non-existent', () => {
    return request(app)
    .get('/api/articles/12345/comments')
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).toBe('article_id not found')
    })
  })
})

describe('POST /api/articles/:article_id/comments', () => {
  test('201: Responds  when posted a new comment', () => {
      return request(app)
          .post('/api/articles/1/comments')
          .send({ username: 'user_lentio', body: 'add a new comment' })
          .expect(201)
          .then(({ body }) => {
            const { comment } = body;
            console.log(comment)
              expect(comment).toMatchObject({
                  author: 'user_lentio',
                  body: 'add a new comment',
                  article_id: 1
              });
          });
  });
});

describe("NOT RECOGNISED", () => {
    test("GET 404: Responds with an appropriate status and error message when given an unrecognised endpoint", () => {
      return request(app)
        .get("/api/topicsss")
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("endpoint not found");
        });
    });
    
  });
  