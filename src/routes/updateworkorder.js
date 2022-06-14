const express = require('express');
const router = express.Router();

module.exports = db => {

  router.patch("/:id", (request, response) => {
    console.log(request.body);

    const columnName = request.body.fname;
    const fieldNames = ["student_notes", "mentor_notes"];

    //check if fieldname is "safe" before passing to query string
    if (!fieldNames.includes(columnName)) {
      response.json([]);
      return router;
    }

    const query = `UPDATE workorders SET ${columnName} = $1, mentor_rating = $2 WHERE id = $3`;

    db.query(
      query, [request.body.description, parseInt(request.body.rating), parseInt(request.params.id)]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });
  return router;
};