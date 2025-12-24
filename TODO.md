# TODO List for Linking Fake Facebook Form to PostgreSQL

- [x] Modify Fake Facebook.html: Update form to method="post", action="/login", add name="number" to number input, name="password" to password input
- [x] Create server.js: Implement Express server, PostgreSQL client with connection string, create 'logins' table, handle POST /login to insert data and redirect to congratulate.html, serve static files
- [x] Update TODO.md: Mark tasks as completed after implementation
- [x] Run npm install to install dependencies
- [x] Start server with npm start
- [x] Test setup (database connected successfully)
