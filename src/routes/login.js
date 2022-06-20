const express = require('express');
const router = express.Router();

//These routes relate to data in the users table
module.exports = db => {
  //Get all information for the specified user
  //Input: user email
  //Output - json object with query results
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