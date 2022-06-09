// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8001;
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db");
const db = new Pool(dbParams);
db.connect();

//Needed for CORS (server and client running on same machine)
const cors = require('cors');
app.use(cors());


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const usersByRoleRoutes = require("./routes/usersbyrole");
const indexRoutes = require("./routes/index");
const modulesRoutes = require("./routes/modules");
const categoriesRoutes = require("./routes/categories");
const workordersRoutes = require("./routes/workorders");

// Mount all resource routes
app.use("/api/users", usersRoutes(db));
app.use("/api/usersbyrole", usersByRoleRoutes(db));
app.use("/api/modules", modulesRoutes(db));
app.use("/api/categories", categoriesRoutes(db));
app.use("/api/workorders", workordersRoutes(db));
app.use("/api", indexRoutes(db));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
