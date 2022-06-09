const express = require('express');
const router = express.Router();

module.exports = db => {
  //Return list of all users by role
  router.get("/:role", (request, response) => {
    db.query(
      `SELECT * FROM users where role = $1`, [request.params.role]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  return router;
};