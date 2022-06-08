INSERT INTO workorders (user_student_id, user_mentor_id, status_id, category_id, module_id, environment, mentor_notes, student_notes, mentor_rating, student_rating, date_created, date_pickup, date_closed)
VALUES
(1, 3, 1, 2, 3, 'M1', 'This was really tough', 'I''m pulling my hair out - blue screen of death!', 5, 3, '2018-02-12T08:00:00.000Z', '2018-02-12T08:03:00.000Z', '2018-02-12T09:00:00.000Z'),
(1, 4, 1, 2, 3, 'M1', 'Student needed to add app.use(express.json()) to their server file', 'request.body is coming through as empty when I do an api put call', 2, 5, '2018-03-12T08:00:00.000Z', '2018-03-12T08:03:00.000Z', '2018-03-12T09:00:00.000Z'),
(2, 4, 1, 2, 3, 'WSL', 'M1 issue - needed to change package.json as per Francis'' recommendation ', 'I''m getting errors when I try to install the LightBnB dependencies', 1, 1, '2018-03-13T08:00:00.000Z', '2018-03-13T08:03:00.000Z', '2018-03-13T09:00:00.000Z'),
(1, 4, 1, 1, 3, 'M1', 'Not bad coding style, but there were some arries that could be more ''DRY''.  Recommended helper functions', 'Code review please', 5, 3, '2018-03-14T08:00:00.000Z', '2018-03-14T08:03:00.000Z', '2018-03-14T09:00:00.000Z');


  