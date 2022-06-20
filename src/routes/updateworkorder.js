const express = require('express');
const router = express.Router();

module.exports = (db, updateWorkorder) => {
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
        //call function to send updated workorder data to all connected clients, via websockets
        response.status(204).json({});
        updateWorkorder(request.body);
      }, 1000);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });


  router.post("/:id", (request, response) => {
    // const ref = Object.keys(request.body).map((val, idx) => val + "=" + "$" + (idx + 1))
    // const assignVals = ref.join(", ");
    // const workorderIdx = "$" + String(ref.length + 1);
    // let query = `UPDATE workorders SET ${assignVals} WHERE id = ${workorderIdx}`;
    let query =  `UPDATE workorders SET user_mentor_id = $1, status_id = $2`;
    const values = [parseInt(request.body.user_mentor_id), parseInt(request.body.status_id)];
   
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