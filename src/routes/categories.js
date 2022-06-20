const express = require('express');
const router = express.Router();

//These routes relate to data in the categories table
module.exports = db => {
  //Get all categories in the dabase
  router.get("/", (request, response) => {
    db.query(
      `SELECT * FROM categories`
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  //Get all categories in the database that are either archived OR active
  //Input - archive flag
  //Output - json object with query results
  router.get("/:archive", (request, response) => {
    db.query(
      `SELECT * FROM categories WHERE archive = $1`, [request.params.archive]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  //Update a specific category in the database
  //Input - object containing fields and values to update
  //Output - json object containing result of the database operation
  router.post("/", (request, response) => {
    //Split the key value pairs to format the data for query string (prevent database injetion)    
    const fields = Object.keys(request.body).join(", ");
    const values = Object.values(request.body);
    const ref = values.map((_, idx) => "$" + (idx + 1)).join(", ");
    db.query(
      `INSERT INTO categories (${fields}) VALUES (${ref})`, values
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });
  return router;
};