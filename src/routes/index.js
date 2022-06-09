const express = require('express');
const router = express.Router();

module.exports = (db) => {
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
