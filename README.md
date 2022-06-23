# Final Project - Workorder System API - V1.0

This API was built specifically to manage all interactions between a workorder application and its database.  
The API, PostgreSQL database and the workorder application itself were all built as a final project package by a small team of Lighthouse Lab Web Development Bootcamp students.


## Project Functionality Overview
  -  users can add workorders
  -  users can update workorders
  -  users can query the database for all stored data related to workorders 
  -  users can query the database for all stored data related to users registered in the database 
  -  clients are notified, via web sockets, when database data has been updated


## Final Product - API Routes

### 1. API Routes
!["API Routes"](https://github.com/manwelja/final-project-workorders-api/blob/main/docs/routes.png)


## Authors
  -  Emma Grannis (https://github.com/egrannis)
  -  Aaron Au (https://github.com/chunloy)
  -  Jennifer Manwell (https://github.com/manwelja)


## Project Setup Instructions

  1. Create a new repository using this repository as a template.
  2. Clone your repository onto your local device.
  3. Install dependencies using the npm install command.
  4. Seed database using npm run db:reset command
  5. Start the web server using the npm start local command. The app will be served at http://localhost:8001/.
  6. Go to http://localhost:8001/api in your browser.


## Dependencies
  -  Express
  -  Axios 0.27.2 or above
  -  Body-parser 1.18.3 or above
  -  Cookie-parser 1.4.6 or above
  -  Cors 2.8.5 or above
  -  Dotenv 7.0.0 or above
  -  Helmet 3.18.0 or above
  -  Ejs 2.6.2 or above
  -  Morgan 1.10.0 or above
  -  Pg 8.5.0 or above
  -  Sass 1.35.1 or above
  -  ws 7.0.0 or above