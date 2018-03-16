const app = require("./app");

const server = app.listen(3001, function() {
  console.log(process.env.PORT);
  console.log(`Listening on port ${server.address().port}...`);
});
