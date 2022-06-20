const express = require('express');
const router = express.Router();

//These routes relate to data in the users table
module.exports = db => {
  //Get all users with a specified role (student, mentor...) in the database
  //Input: user role
  //Output - json object with query results
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