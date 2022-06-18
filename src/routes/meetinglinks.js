const express = require('express');
const router = express.Router();

module.exports = (db, updateWorkorder) => {
  //Get a meeting link using the workorder ID
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
  router.post("/:id", (request, response) => {
    const workorderID = parseInt(request.params.id);
    db.query(
      `DELETE FROM meeting_links WHERE workorder_id = $1`, [workorderID]
    ).then(({ rows: res }) => {
      setTimeout(() => {
        //call function to send updated workorder data to all connected clients, via websockets
        response.status(204).json({});
        updateWorkorder(request.body);
      }, 1000);
    // response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });
  
  router.post("/", (request, response) => {
    const fields = Object.keys(request.body).join(", ");
    const values = Object.values(request.body);
    const ref = values.map((_, idx) => "$" + (idx + 1)).join(", ");
    db.query(
      `INSERT INTO meeting_links (${fields}) VALUES (${ref})`, values
    ).then(({ rows: res }) => {
      setTimeout(() => {
        //call function to send updated workorder data to all connected clients, via websockets
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