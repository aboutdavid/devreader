const { spawn } = require("child_process");

const cmd = spawn("node", [
  __dirname + "/app.js",
  "7871",
  "&&",
  "ENVIRONMENT=production webpack"
]);

cmd.stdout.on("data", data => {
  console.log(data.toString());
});

cmd.stderr.on("data", data => {
  console.error(data.toString());
});

cmd.on("error", error => {
  console.error(`Error while executing command: ${error}`);
});

cmd.on("close", code => {
  console.log(`child process exited with code ${code}`);
});
