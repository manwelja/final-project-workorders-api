const express = require('express');
const router = express.Router();

//These routes relate to data in the workorders table
module.exports = (db) => {
  //Get all categories in the dabase
  //Input: N/A
  //Output - json object with query results
  router.get("/", (request, response) => {
    db.query(
      `SELECT * FROM workorders`
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });
  return router;
};
