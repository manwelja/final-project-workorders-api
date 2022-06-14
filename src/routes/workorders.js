const express = require('express');
const router = express.Router();

module.exports = (db, updateWorkorder) => {
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


  //Get a workorders by its unique ID
  router.get("/:id", (request, response) => {
    db.query(
      `SELECT * FROM workorders WHERE id = $1`, [request.params.id]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  //Get a list of workorders for the specified mentor or student ID
  router.get("/:role/:id", (request, response) => {
    let dbQuery = "";
    if (request.params.role === "mentor") {
      dbQuery = `SELECT * FROM workorders WHERE user_mentor_id = $1`;
    } else if (request.params.role === "student") {
      dbQuery = `SELECT * FROM workorders WHERE user_student_id = $1`;
    }
    db.query(
      dbQuery, [request.params.id]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  router.put("/", (request, response) => {
    const fields = Object.keys(request.body).join(", ");
    const values = Object.values(request.body);
    const ref = values.map((_, idx) => "$" + (idx + 1)).join(", ");
    db.query(
      `INSERT INTO workorders (${fields}) VALUES (${ref})`, values
    ).then(({ rows: res }) => {
      setTimeout(() => {
        //call function to send updated workorder data to all connected clients, via websockets
        response.status(204).json({});
        updateWorkorder(request.body);
      }, 1000);
      //response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });
  return router;
};