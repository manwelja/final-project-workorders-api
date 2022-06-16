INSERT INTO workorders (user_student_id, user_mentor_id, status_id, category_id, module_id, environment, description, mentor_notes, student_notes, mentor_rating, student_rating, date_created, date_pickup, date_closed)
VALUES
(1, null, 1, 2, 3, 'M1', 'I''m pulling my hair out - blue screen of death!', 'This was really tough', 'Great Mentor', 5, 3, '2018-02-12T08:00:00.000Z', '2018-02-12T08:03:00.000Z', '2018-02-12T09:00:00.000Z'),
(1, null, 1, 2, 3, 'M1',  'request.body is coming through as empty when I do an api put call', 'Student needed to add app.use(express.json()) to their server file', 'Hard time following along', 2, 5, '2018-03-12T08:00:00.000Z', '2018-03-12T08:03:00.000Z', '2018-03-12T09:00:00.000Z'),
(2, null, 1, 2, 3, 'WSL',  'I''m getting errors when I try to install the LightBnB dependencies', 'M1 issue - needed to change package.json as per Francis'' recommendation ', 'Mentor fixed problem super quick', 1, 1, '2018-03-13T08:00:00.000Z', '2018-03-13T08:03:00.000Z', '2018-03-13T09:00:00.000Z'),
(1, null, 1, 1, 3, 'M1', 'Code review please', 'Not bad coding style, but there were some arries that could be more ''DRY''.  Recommended helper functions', 'Meh', 5, 3, '2018-03-14T08:00:00.000Z', '2018-03-14T08:03:00.000Z', '2018-03-14T09:00:00.000Z');


  