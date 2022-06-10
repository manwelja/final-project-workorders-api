const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (request, response) => {
    db.query(
      `SELECT * FROM users`
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  //Return user with a specified id
  router.get("/:id", (request, response) => {
    db.query(
      `SELECT * FROM users WHERE id = $1`, [request.params.id]
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
      `INSERT INTO users (${fields}) VALUES (${ref})`, values
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });
  
  return router;
};