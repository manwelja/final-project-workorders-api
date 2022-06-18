const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db");
const db = new Pool(dbParams);
db.connect();

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const usersByRoleRoutes = require("./routes/usersbyrole");
const indexRoutes = require("./routes/index");
const modulesRoutes = require("./routes/modules");
const categoriesRoutes = require("./routes/categories");
const workOrdersRoutes = require("./routes/workorders");
const queueRoutes = require("./routes/queue");
const meetingLinksRoutes = require("./routes/meetinglinks");
const loginRoutes = require("./routes/login");
// const registerRoutes = require("./routes/register");
const updateworkorderRoutes = require("./routes/updateworkorder");
const hangoutLinkRoutes = require("./routes/hangoutLink");



module.exports = function application(
  ENV,
  actions = { addWorkorder: () => {} }
) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());

  // Mount all resource routes
  app.use("/api/users", usersRoutes(db));
  app.use("/api/usersbyrole", usersByRoleRoutes(db));
  app.use("/api/modules", modulesRoutes(db));
  app.use("/api/categories", categoriesRoutes(db));
  app.use("/api/workorders", workOrdersRoutes(db, actions.addWorkorder));
  app.use("/api/queue", queueRoutes(db));
  app.use("/api/meetinglinks", meetingLinksRoutes(db));
  app.use("/api", indexRoutes(db));
  app.use("/api/login", loginRoutes(db));
  app.use("/api/hangoutlinks", hangoutLinkRoutes(db, actions.addWorkorder));
  app.use("/api/update/workorder", updateworkorderRoutes(db, actions.addWorkorder));
  // app.use("api/register", registerRoutes(db));


  app.close = function() {
    return db.end();
  };

  return app;
};
