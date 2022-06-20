const express = require('express');
const router = express.Router();

//These routes relate to data in the workorders table
module.exports = (db, updateWorkorder) => {
  //Get all workorders in the database 
  //Input: N/A
  //Output - json object with query results
  router.get("/", (request, response) => {
    //The query statement is formatted to retrieve all of the data needed for display in the workorder view
    db.query(
      `     
        SELECT workorders.*, user_info.first_name as student_first_name, user_info.last_name as student_last_name, mentor_info.first_name as mentor_first_name, mentor_info.last_name as mentor_last_name, categories.description as category, modules.week, modules.day, modules.topic, statuses.description as status_description  
        FROM workorders
        LEFT JOIN users user_info ON (user_info.id = user_student_id)
        LEFT JOIN users mentor_info ON (mentor_info.id = user_mentor_id)
        LEFT JOIN categories ON (categories.id = category_id)
        LEFT JOIN modules ON (modules.id = module_id)
        LEFT JOIN statuses on (statuses.id = status_id)
        ORDER BY workorders.id
      `
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  //Get a workorder from the database with the specified id
  //Input: workorder id
  //Output - json object with query results
  router.get("/:id", (request, response) => {
    //The query statement is formatted to retrieve all of the data needed for display in the workorder view
    db.query(
      `      
        SELECT workorders.*, user_info.first_name as student_first_name, user_info.last_name as student_last_name, mentor_info.first_name as mentor_first_name, mentor_info.last_name as mentor_last_name, categories.description as category, modules.week, modules.day, modules.topic, statuses.description as status_description 
        FROM workorders
        LEFT JOIN users user_info ON (user_info.id = user_student_id)
        LEFT JOIN users mentor_info ON (mentor_info.id = user_mentor_id)
        LEFT JOIN categories ON (categories.id = category_id)
        LEFT JOIN modules ON (modules.id = module_id)
        LEFT JOIN statuses on (statuses.id = status_id)
        WHERE workorders.id = $1
      `, [request.params.id]
    ).then(({ rows: res }) => {
      response.json(res);
    }).catch((err) => {
      console.log(err);
      response.json([]);
    });
  });

  //Get all workorders from the database for the specified role
  //Input: workorder id
  //Output - json object with query results
  router.get("/:role/:id", (request, response) => {
    let dbQuery = "";
    //Build the select statement conditionally depending on user role
    if (request.params.role === "mentor") {
      dbQuery = `     
        SELECT workorders.*, user_info.first_name as student_first_name, user_info.last_name as student_last_name, mentor_info.first_name as mentor_first_name, mentor_info.last_name as mentor_last_name, categories.description as category, modules.week, modules.day, modules.topic, statuses.description as status_description  
        FROM workorders
        LEFT JOIN users user_info ON (user_info.id = user_student_id)
        LEFT JOIN users mentor_info ON (mentor_info.id = user_mentor_id)
        LEFT JOIN categories ON (categories.id = category_id)
        LEFT JOIN modules ON (modules.id = module_id)
        LEFT JOIN statuses on (statuses.id = status_id)
        WHERE user_mentor_id = $1
        ORDER BY workorders.date_created DESC`;
    } else if (request.params.role === "student") {
      dbQuery = ` 
        SELECT workorders.*, user_info.first_name as student_first_name, user_info.last_name as student_last_name, mentor_info.first_name as mentor_first_name, mentor_info.last_name as mentor_last_name, categories.description as category, modules.week, modules.day, modules.topic, statuses.description as status_description  
        FROM workorders
        LEFT JOIN users user_info ON (user_info.id = user_student_id)
        LEFT JOIN users mentor_info ON (mentor_info.id = user_mentor_id)
        LEFT JOIN categories ON (categories.id = category_id)
        LEFT JOIN modules ON (modules.id = module_id)
        LEFT JOIN statuses on (statuses.id = status_id)
        WHERE user_student_id = $1
        ORDER BY workorders.date_created DESC`;
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

  //Add a new workorder to the database
  //Input: new workorder data (via reqeust object)
  //Output - json object with query results
  router.post("/", (request, response) => {
    //Split the key value pairs to format the data for query string (prevent database injection)
    const fields = Object.keys(request.body).join(", ");
    const values = Object.values(request.body);
    const ref = values.map((_, idx) => "$" + (idx + 1)).join(", ");
    db.query(
      `INSERT INTO workorders (${fields}) VALUES (${ref})`, values
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