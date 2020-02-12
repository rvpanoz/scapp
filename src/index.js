// transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require("@babel/register")({
  presets: ["@babel/preset-env"]
});

// standalone runtime for Regenerator-compiled generator and async functions.
require("regenerator-runtime/runtime");

const mk = require("./mk");
global.mk = mk;

// import the rest of our application.
module.exports = require("./server.js");
