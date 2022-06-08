const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get("/", (request, response) => {
    db.query(
      `
      SELECT * FROM categories
    `
    ).then(({ rows: res }) => {
      response.json(res);
    });
  });

  router.get("/:archive", (request, response) => {
    db.query(
      `
      SELECT * FROM cetegories WHERE archive = $1
    `, [request.params.archive]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => console.log(err));
  });

  router.put("/", (request, response) => {
    const fields = Object.keys(request.body).join(", ");
    const values = Object.values(request.body);
    const ref = values.map((_, idx) => "$" + (idx + 1)).join(", ");
    db.query(
      `INSERT INTO categories (${fields}) VALUES (${ref})`, values
    ).then(({ rows: res }) => {
      response.json(res);
    });
  });
  return router;
};