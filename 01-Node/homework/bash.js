const commands = require("./commands/index.js");

const cb = function (output) {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
};

process.stdout.write("prompt > ");

process.stdin.on("data", function (data) {
  let args = data.toString().trim().split(" ");
  let cmd = args.shift();

  commands[cmd]?.(cb, args);
});
