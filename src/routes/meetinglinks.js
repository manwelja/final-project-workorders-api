const express = require('express');
const router = express.Router();

//These routes relate to data in the meeting_links table
module.exports = (db, updateWorkorder) => {

  //Get all meeting links in the database
  //Input: N/A
  //Output - json object with query results
  router.get("/", (request, response) => {
    db.query(
      `SELECT * FROM meeting_links `
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  //Get a meeting link using the workorder ID
  //Input: User ID
  //Output - json object with query results
  router.get("/:id", (request, response) => {
    const workorderID = parseInt(request.params.id);
    db.query(
      `SELECT * FROM meeting_links WHERE workorder_id = $1`, [workorderID]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  //Delete a meeting link using the workorder ID
  //Input: User ID
  //Output - json object with query status
  router.post("/:id", (request, response) => {
    const workorderID = parseInt(request.params.id);
    db.query(
      `DELETE FROM meeting_links WHERE workorder_id = $1`, [workorderID]
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
  
  //Add a meeting link using the workorder ID
  //Input: User ID
  //Output - json object with query status
  router.post("/", (request, response) => {
    const fields = Object.keys(request.body).join(", ");
    const values = Object.values(request.body);
    const ref = values.map((_, idx) => "$" + (idx + 1)).join(", ");
    db.query(
      `INSERT INTO meeting_links (${fields}) VALUES (${ref})`, values
    ).then(({ rows: res }) => {
      setTimeout(() => {
        //call function to send notification of database update to all connected clients, via websockets
        response.status(204).json({});
        updateWorkorder(request.body);
      }, 1000);
    // response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  
  return router;
};