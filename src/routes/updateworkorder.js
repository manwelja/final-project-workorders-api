const express = require('express');
const router = express.Router();

module.exports = db => {
  router.patch("/:fname/:id", (request, response) => {
    let query = "";

    if (request.params.fname === "studentfeedback") {
      query = `UPDATE workorders SET student_notes = $1, mentor_rating = $2 WHERE id = $3`;
    } else if (request.params.fname === "mentorfeedback") {
      query = `UPDATE workorders SET mentor_notes = $1, student_rating = $2 WHERE id = $3`;
    } else {
      response.json([]);
      return router;
    }

    db.query(
      query, [request.body.description, parseInt(request.body.rating), parseInt(request.params.id)]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  router.get("/:id", (request, response) => {
    let query = "";
    return response.json(["you git it"]);
    // db.query(
    //   query, [request.body.description, parseInt(request.body.rating), parseInt(request.params.id)]
    // ).then(({ rows: res }) => {
    //   response.json(res);
    // }).catch((err) => {
    //   console.log(err);
    //   response.json([]);
    // });
  });

  return router;
};