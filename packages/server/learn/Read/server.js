const { exec } = require("child_process");
const { stderr, stdout } = require("process");

//----- child process
exec("ls -", (err, stderr, stdout) => {
  if (err) {
    console.log("error", err);
  } else {
    console.log("OUTPUT", stderr, stdout);
  }
});
