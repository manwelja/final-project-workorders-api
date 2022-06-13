const express = require('express');
const router = express.Router();

module.exports = db => {
  router.put("/:fieldname/:id", (request, response) => {
    console.log('id:', request.params.id);
    console.log('fieldname', request.body.fieldname);
    console.log('value', request.body.value);
    let dbquery = '';
    if (request.params.fieldname === "student_notes") {
      dbquery = `UPDATE workorders SET student_notes = $1 WHERE id = $2`;
    }
    else if (request.params.fieldname === "mentor_notes") {
      dbquery = `UPDATE workorders SET mentor_notes = $1 WHERE id = $2`;
    } else {
      response.json([]);
      return router;
    }
    db.query(
      dbquery, [request.body.value, parseInt(request.params.id)]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });
  return router;
};