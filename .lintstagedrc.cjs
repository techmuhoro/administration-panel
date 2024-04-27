const path = require("path");

const buildNextLintCmd = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "prettier --ignore-path .gitignore --write",
    buildNextLintCmd
  ],
  "*/**/*.{json,css,md}": ["prettier --ignore-path .gitignore --write"]
};
