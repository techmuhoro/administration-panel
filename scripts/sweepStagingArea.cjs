const chalk = require("chalk");
const path = require("node:path");
const spawnSync = require("node:child_process").spawnSync;
const fs = require("node:fs");

const trackingFile = ".jgdsxeqg.bak";
const pcHookPath = path.resolve(process.cwd(), ".husky", "post-commit"); // post-commit git-hook path name
const pcBackupPath = path.resolve(pcHookPath, "../post-commit.bak"); // post-commit git-hook backup path name

try {
  try {
    var fileNames = fs.readFileSync(trackingFile, "utf8");
  } catch (error) {
    // If file with filenames is missing, exit as success otherwise raise an exception
    if (error instanceof Error && error.code !== "ENOENT") {
      throw error; // Do not wrap in another new Error();
    }
    process.exit(0);
  }

  const names = JSON.parse(fileNames);

  if (!(names instanceof Array))
    throw new Error("List(Array) of filenames expected");
  if (names.length < 1) {
    try {
      fs.unlinkSync(trackingFile); // if file is not found, it fails silently
    } catch (error) {}
    process.exit(0);
  }

  const relativeNamePaths = names.map((name) =>
    path.relative(process.cwd(), name)
  );

  const gaTaskRef = spawnSync("git", ["add", ...relativeNamePaths]);
  if (gaTaskRef.stderr.toString()) {
    throw new Error(gaTaskRef.stderr.toString());
  }
  if (gaTaskRef.status) {
    throw new Error(`[command: git add] exited with code ${gaTaskRef.status}`);
  }

  // Rename hook file to avoid a post-commit infinite loop
  fs.renameSync(pcHookPath, pcBackupPath);

  // Amend git commit command that skips pre-commit hook
  const gcTaskRef = spawnSync("git", [
    "commit",
    "--amend",
    "--no-edit",
    "--no-verify"
  ]);
  if (gcTaskRef.stderr.toString()) {
    throw new Error(gcTaskRef.stderr.toString());
  }
  if (gcTaskRef.status) {
    throw new Error(`[command: git add] exited with code ${gcTaskRef.status}`);
  }

  // Rename hook file back to original
  fs.renameSync(pcBackupPath, pcHookPath);

  fs.unlink(trackingFile, (err) => {
    if (err) {
      if (err instanceof Error) {
        throw err;
      } else {
        throw new Error(err);
      }
    }
  });
} catch (error) {
  console.log(error);
  if (error instanceof Error && error.message) {
    console.log(chalk.red(error.message));
  }
  const code = process.exitCode ?? 1;
  process.exit(code);
}
