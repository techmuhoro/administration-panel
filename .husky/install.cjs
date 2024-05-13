const spawn = require("child_process").spawnSync;
const chalk = require("chalk");
const { Buffer } = require("node:buffer");

if (process.env.NODE_ENV === "production" || process.env.CI === "true") {
  process.exit(0);
}

class Err extends Error {
  constructor(message, code) {
    super(message);
    this.name = "custom_error";
    this.code = code;
  }
}

function huskyDetection() {
  const detectHusky = spawn("npm", ["list", "husky"], { shell: true });

  if (detectHusky.error) {
    const processError = detectHusky.error;

    throw new Err(processError.message, 1);
  }

  if (detectHusky.stderr.length) {
    const errorOut =
      detectHusky.stderr instanceof Buffer
        ? detectHusky.stderr.toString()
        : detectHusky.stderr;

    console.log("stderr: " + chalk.red(errorOut));
  }

  if (detectHusky.stdout.length) {
    const out =
      detectHusky.stdout instanceof Buffer
        ? detectHusky.stdout.toString()
        : detectHusky.stdout;

    console.log("stdout: " + chalk.blue(out));
  }

  if (Number.isFinite(detectHusky.status)) {
    const code = detectHusky.status ?? 0;

    if (code !== 0) {
      throw new Err(`exited with code ${code}`, code);
    }
  }
}
function huskyInstall() {
  const installation = spawn("npm", ["install", "--save-dev", "husky"]);

  if (installation.error) {
    const processError = installation.error;

    throw new Err(processError.message, 1);
  }

  // LOG OUTPUT FOR THIS COMMAND CLUTTERS TERMINAL
  // if (installation.stderr.length) {
  //   const errorOut =
  //     installation.stderr instanceof Buffer
  //       ? installation.stderr.toString()
  //       : installation.stderr;

  //   console.log("stderr: " + chalk.red(errorOut));
  // }

  // if (installation.stdout.length) {
  //   const out =
  //     installation.stdout instanceof Buffer
  //       ? installation.stdout.toString()
  //       : installation.stdout;

  //   console.log("stdout: " + chalk.blue(out));
  // }

  if (Number.isFinite(installation.status)) {
    const code = installation.status ?? 0;

    if (code !== 0) {
      throw new Err(`exited with code ${code}`, code);
    }
    console.log(`(code: ${code}) ${chalk.green("✔ Husky added")}`);
  }
}

function prepareHuskyEnv() {
  try {
    huskyDetection();
    process.exitCode = 0;
    return true;
  } catch (error) {
    if (error instanceof Error) {
      try {
        const exitCode = error.code;
        if (exitCode === 0) return false; // `return` since Husky detection `error`ed but exit code indicates success

        console.log(
          chalk.red("✖ Husky not found.") + chalk.blue(" Installing...")
        );

        huskyInstall();

        process.exitCode = 0;
        return true;
      } catch (error) {
        const msg = error instanceof Error ? error.message : "";
        const fullMsg = `Husky installation exited with code ${process.exitCode} !${msg.length ? ": " + msg : ""})`;

        throw new Err(fullMsg, error?.code ?? 126);
      }
    }
  }

  return false;
}

function huskyInit() {
  const initialize = spawn("husky", [".husky"]);

  if (initialize.error) {
    const processError = initialize.error;

    throw new Err(processError.message, 1);
  }

  if (initialize.stderr.length) {
    const errorOut =
      initialize.stderr instanceof Buffer
        ? initialize.stderr.toString()
        : initialize.stderr;

    console.log("stderr: " + chalk.red(errorOut));
  }

  if (initialize.stdout.length) {
    const out =
      initialize.stdout instanceof Buffer
        ? initialize.stdout.toString()
        : initialize.stdout;

    console.log({ out });

    console.log("stdout: " + chalk.blue(out));
  }

  if (Number.isFinite(initialize.status)) {
    const code = initialize.status ?? 0;

    if (code !== 0) {
      throw new Err(`exited with code ${code}`, code);
    }
  }
}

try {
  prepareHuskyEnv();
  huskyInit();
  console.log(
    chalk.bgWhite(chalk.black("done")) +
      chalk.green("   ✔ Husky has been set up")
  );
} catch (error) {
  if (error instanceof Error) {
    console.log(chalk.red("✖ " + error.message));
  } else {
    console.log(
      "husky Install script exited with code: ",
      process.exitCode === 0 ? 1 : process.exitCode
    );
  }
}

