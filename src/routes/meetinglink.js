const express = require('express');
const router = express.Router();

module.exports = db => {
  //Get all current meeting links
  router.get("/:id", (request, response) => {
    db.query(
      `SELECT * FROM meeting_links`, [request.params.id]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });
 
  //Get a meeting link using the workorder ID
  router.get("/:id", (request, response) => {
    db.query(
      `SELECT * FROM meeting_links WHERE workorder_id = $1`, [request.params.id]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });
  return router;
};