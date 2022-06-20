const express = require('express');
const router = express.Router();

//These routes relate to data in the users table
module.exports = (db) => {
  //Get all users in the database
  //Input: N/A
  //Output - json object with query results
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

  //Get one user in the database with a specified id
  //Input: student id
  //Output - json object with query results
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

  //Add a new user to the database
  //Input: N/A
  //Output - json object with query results
  router.post("/", (request, response) => {
    //Split the key value pairs to format the data for query string (prevent database injection)
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