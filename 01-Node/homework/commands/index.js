const fs = require("fs");
const request = require("request");

module.exports = {
  pwd: function (cb) {
    cb(Date());
  },
  date: function (cb) {
    cb(process.cwd());
  },
  ls: function (cb) {
    fs.readdir(".", function (error, data) {
      if (error) throw cb(err);
      process.stdout.write("\nprompt > ");
      data.forEach((file) => {
        process.stdout.write(file + "\n");
      });
      process.stdout.write("\nprompt > ");
    });
  },
  echo: function (cb, args) {
    cb(`\n${args?.join(" ")}\n`);
  },
  cat: function (cb, fileName) {
    fs.readFile(fileName[0], function (error, data) {
      if (error) throw process.stdout.write(error);
      cb(`\n${data}`);
    });
  },
  head: function (cb, fileName) {
    fs.readFile(fileName[0], "utf-8", function (error, data) {
      if (error) throw process.stdout.write(error);
      let first10Lines = data.split("\n").slice(0, 5);
      cb(`\n${first10Lines.join("\n")}\n`);
    });
  },
  tail: function (cb, fileName) {
    fs.readFile(fileName[0], "utf-8", function (error, data) {
      if (error) throw process.stdout.write(error);
      let first10Lines = data.split("\n");
      first10Lines = first10Lines.slice(-5);
      cb(`\n${first10Lines.join("\n")}\n`);
    });
  },
  curl: function (cb, url) {
    request(url[0], "utf-8", function (error, response, body) {
      if (error) throw process.stdout.write(error);
      cb(`\n${body}\n`);
    });
  },
  clear: function () {
    console.clear();
  },
};
