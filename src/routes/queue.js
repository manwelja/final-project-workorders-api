const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get("/:status", (request, response) => {
    db.query(
      `
      SELECT workorders.*, user_info.first_name as student_first_name, user_info.last_name as student_last_name, mentor_info.first_name as mentor_first_name, mentor_info.last_name as mentor_last_name, categories.description as category, modules.week, modules.day, modules.topic
      FROM workorders 
      LEFT JOIN users user_info ON (user_info.id = user_student_id)     
      LEFT JOIN users mentor_info ON (mentor_info.id = user_mentor_id)   
      LEFT JOIN categories ON (categories.id = category_id)
      LEFT JOIN modules ON (modules.id = module_id)
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