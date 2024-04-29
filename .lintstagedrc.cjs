const path = require("path");
const fs = require("node:fs");

// filename: .redressStash.bak.json
const buildNextLintCmd = (filenames) => {
  fs.writeFile(".jgdsxeqg.bak.json", JSON.stringify(filenames), (err) => {
    if (err) {
      // console.error(err);
    } else {
      // file written successfully
    }
  });

  return `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;
};

module.exports = {
  "*.{js,jsx,ts,tsx}": [
    buildNextLintCmd,
    "prettier --ignore-path .gitignore --write"
  ],
  "*/**/*.{json,css,md}": ["prettier --ignore-path .gitignore --write"]
};
