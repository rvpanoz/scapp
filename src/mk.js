// @Mike Car

const mk = {
  logToFile: true,
  logToConsole: false,
  syslog: true,
  cnc(...args) {
    let txt = "";
    const values = Object.values(args);

    values.forEach(element => {
      txt += String(JSON.stringify(element));
    });

    return txt;
  },
  log(...args) {
    const dt = new Date();
    const dtf = `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}.${dt.getMilliseconds()}`;
    let cons;

    args.unshift(dtf);

    if (this.gui && global.window) {
      cons = global.window.console;
    } else {
      cons = console;
    }

    if (this.logToFile) {
      this.debug(args);
    }

    args.unshift("\n");

    if (this.logToConsole) {
      cons.log.apply(cons, args);
    }
  },
  debug(args) {
    const fs = require("fs");
    const txt = this.cnc(args);

    fs.writeFileSync("debug.log", `${txt}\n`, { flag: "a" });
  }
};

module.exports = mk;
