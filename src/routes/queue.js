const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get("/:status", (request, response) => {
    db.query(
      `SELECT * FROM workorders WHERE status_id = $1`, [request.params.status]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  return router;
};