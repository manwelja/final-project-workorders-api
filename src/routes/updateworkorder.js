const express = require('express');
const router = express.Router();

module.exports = (db, updateWorkorder) => {
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

  router.put("/:id", (request, response) => {
    let query = `UPDATE workorders SET user_mentor_id = $1, status_id = $2 WHERE id = $3`;
    console.log(request.body);
    db.query(
      query, [parseInt(request.body.user_mentor_id), parseInt(request.body.status_id), parseInt(request.params.id)]
    ).then(({ rows: res }) => {
      setTimeout(() => {
      //call function to send updated workorder data to all connected clients, via websockets
        response.status(204).json({});
        updateWorkorder(request.body);
      }, 1000);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
});

  return router;
};