const express = require('express');
const router = express.Router();

//These routes relate to data in the workorders table (update routed only)
module.exports = (db, updateWorkorder) => {
  //Update the specified workorder with student/mentor feedback data
  //Input: role (student/mentor), workorder id
  //Output - json object with query results
  router.post("/:fname/:id", (request, response) => {
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
      setTimeout(() => {
      //call function to send notification of database update to all connected clients, via websockets
        response.status(204).json({});
        updateWorkorder(request.body);
      }, 1000);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  //Update the specified workorder with data when the workorder status changed
  //Input: workorder id, data to update (via reqeust object)
  //Output - json object with query results
  router.post("/:id", (request, response) => {
    let query =  `UPDATE workorders SET user_mentor_id = $1, status_id = $2`;
    const values = [parseInt(request.body.user_mentor_id), parseInt(request.body.status_id)];
   //build the query statement conditionally based on the input
    if (request.body.date_pickup) {
      query += ", date_pickup = $3";
      values.push(request.body.date_pickup);
    } else if (request.body.date_closed) {
      query += ", date_closed = $3";
      values.push(request.body.date_closed);
    }
    values.push(request.params.id);
    query += ` WHERE id = $4`;

    db.query(
      query, [...values]
    ).then(({ rows: res }) => {
      setTimeout(() => {
      //call function to send notification of database update to all connected clients, via websockets
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