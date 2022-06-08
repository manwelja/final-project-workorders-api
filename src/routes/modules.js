const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get("/", (request, response) => {
    console.log("users");
    db.query(
      `
      SELECT * FROM modules
    `
    ).then(({ rows: res }) => {
      response.json(res);
    });
  });

  router.get("/:archive", (request, response) => {
    db.query(
      `
      SELECT * FROM modules WHERE archive = $1
    `, [request.params.archive]
    ).then(({ rows: res }) => {
      response.json(res);
    });
  });

  router.put("/", (request, response) => {
    // console.log("request body", request.body.name)
    // db.query(
    //   `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [request.body.name, request.body.email, request.body.password]
    // ).then(({ rows: res }) => {
    //   response.json(res);
    // });
  });
  return router;
};