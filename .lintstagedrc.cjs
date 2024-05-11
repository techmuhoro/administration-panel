const path = require("path");

const buildNextLintCmd = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const modifiedFiles = (filenames) => {
  const relativePaths = filenames.map((filename) =>
    path.relative(process.cwd(), filename)
  );

  return `node scripts/modifedFiles.cjs --path ${relativePaths.join("  --path ")}`;
};

module.exports = {
  "*.{js,jsx,ts,tsx}": [
    buildNextLintCmd,
    "prettier --ignore-path .gitignore --write",
    modifiedFiles
  ],
  "*/**/*.{json,css,md}": ["prettier --ignore-path .gitignore --write"]
};
