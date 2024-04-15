const request = require('supertest')
const db = require('../db/connection')
const app = require('../app')
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

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
  