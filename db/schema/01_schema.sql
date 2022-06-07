DROP TABLE IF EXISTS cohorts CASCADE;
DROP TABLE IF EXISTS statuses CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS modules CASCADE;
DROP TABLE IF EXISTS workorders CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE modules (
  id SERIAL PRIMARY KEY NOT NULL,
  week INTEGER NOT NULL,
  day INTEGER NOT NULL,
  topic VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  description VARCHAR(128) NOT NULL
);

CREATE TABLE statuses (
  id SERIAL PRIMARY KEY NOT NULL,
  description VARCHAR(128) NOT NULL
);

CREATE TABLE cohorts (
  id SERIAL PRIMARY KEY NOT NULL,
  description VARCHAR(128) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  cohort_id INTEGER REFERENCES cohorts(id) ON DELETE CASCADE,
  handle VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) NOT NULL,
  role char(50),
  password VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  join_date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workorders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  user_mentor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status_id INTEGER REFERENCES statuses(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  module_id INTEGER REFERENCES modules(id) ON DELETE CASCADE,
  environment VARCHAR(255),
  escalate BOOLEAN NOT NULL DEFAULT false,
  mentor_notes VARCHAR(255),
  student_notes VARCHAR(255),
  resolution_minutes INTEGER,
  date_created DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
