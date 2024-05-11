const fs = require("node:fs");
const { argv } = require("node:process");

const cliArgs = argv.slice(2);
const cliArgsFiltered = cliArgs.filter((arg, idx) => idx % 2 !== 0);

if (cliArgsFiltered.length > 0)
  fs.writeFileSync(".jgdsxeqg.bak", JSON.stringify(cliArgsFiltered), "utf8");
