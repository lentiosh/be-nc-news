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
      console.log(response.body)
      expect(response.body.endpoints).toEqual(endpoints)
    })
  })
})

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
  