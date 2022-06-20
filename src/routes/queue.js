const express = require('express');
const router = express.Router();

//These routes relate to data in the workorders table
module.exports = db => {
  //Get all workorders in the database with a specified status (open, closed, in progress...)
  //Input: status id
  //Output - json object with query results
  router.get("/:status", (request, response) => {
    //The query statement is formatted to retrieve all of the data needed for display in the workorder queue
    db.query(
      `
      SELECT workorders.*, user_info.first_name as student_first_name, user_info.last_name as student_last_name, mentor_info.first_name as mentor_first_name, mentor_info.last_name as mentor_last_name, categories.description as category, modules.week, modules.day, modules.topic, statuses.description as status_description 
      FROM workorders 
      LEFT JOIN users user_info ON (user_info.id = user_student_id)     
      LEFT JOIN users mentor_info ON (mentor_info.id = user_mentor_id)   
      LEFT JOIN categories ON (categories.id = category_id)
      LEFT JOIN modules ON (modules.id = module_id)
      LEFT JOIN statuses on (statuses.id = status_id)
      WHERE status_id = $1
      ORDER BY workorders.date_created
      
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