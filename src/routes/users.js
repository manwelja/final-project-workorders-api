const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get("/", (request, response) => {
    console.log("users");
    db.query(
      `
      SELECT * FROM users
    `
    ).then(({ rows: res }) => {
      response.json(res);
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
     });
  });
  return router;
};