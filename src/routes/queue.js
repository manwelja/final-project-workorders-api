const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get("/:status", (request, response) => {
    db.query(
      `
      SELECT workorders.*, users.first_name as student_first_name, users.last_name as student_last_name, categories.description, modules.* 
      FROM workorders 
      JOIN users ON (users.id = user_student_id)
      JOIN categories ON (categories.id = category_id)
      JOIN modules ON (modules.id = module_id)
      WHERE status_id = $1
      
      `, [request.params.status]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  return router;
};

//WHERE status_id = $1