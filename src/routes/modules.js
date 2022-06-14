const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get("/", (request, response) => {
    db.query(
      `SELECT * FROM modules`
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  router.get("/:archive", (request, response) => {
    db.query(
      `SELECT * FROM modules WHERE archive = $1`, [request.params.archive]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  router.put("/", (request, response) => {
    const fields = Object.keys(request.body).join(", ");
    const values = Object.values(request.body);
    const ref = values.map((_, idx) => "$" + (idx + 1)).join(", ");
    db.query(
      `INSERT INTO modules (${fields}) VALUES (${ref})`, values
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });
  return router;
};