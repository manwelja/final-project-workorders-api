const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get("/:user", (request, response) => {
    db.query(
      `SELECT * FROM users WHERE email = $1`, [request.params.user]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });
  return router;
};