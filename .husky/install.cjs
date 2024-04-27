const { spawn } = require("child_process");

if (process.env.NODE_ENV === "production" || process.env.CI === "true") {
  process.exit(0);
}

function huskyDetection() {
  const detectionPromise = new Promise((resolve, reject) => {
    const detectHusky = spawn("npm", ["list", "husky"], { shell: true });

    detectHusky.stdout?.on("data", function (data) {
      console.log("stdout: " + data);
    });
    detectHusky.on("data", function (data) {
      console.log("stderr: " + data);
    });
    detectHusky.on("exit", (code) => {
      if (code !== 0) {
        reject(new Err(`exited with code ${code}`, code));
      }
      resolve(null);
    });
  });
  return detectionPromise;
}
function huskyInstall() {
  const installPromise = new Promise((resolve, reject) => {
    const install = spawn("npm", ["install", "--save-dev", "husky"]);

    install.stdout?.on("data", function (data) {
      console.log("stdout: " + data);
    });
    install.on("data", function (data) {
      console.log("stderr: " + data);
    });
    install.on("close", (code) => {
      if (code !== 0) {
        reject(new Err(`exited with code ${code}`, code));
      }

      console.log(`(code: ${code}) "Husky added 🥂"`);
      resolve(null);
    });
  });

  return installPromise;
}

async function huskyPrepare() {
  try {
    await huskyDetection();
    process.exitCode = 0;
    return true;
  } catch (error) {
    if (error instanceof Error) {
      try {
        const exitCode = error.code;
        if (exitCode !== 0) {
          console.log("Husky not found ❌ Installing...");
          await huskyInstall();
          process.exitCode = 0;
          return true;
        }
      } catch (error) {
        process.exitCode = error?.code ?? 126;
        console.error(
          `Husky could not be installed 🔴 (exitcode: ${process.exitCode})`
        );
      }
    }
  }

  return false;
}

function huskyInit() {
  const initPromise = new Promise((resolve, reject) => {
    const initialize = spawn("husky", [".husky"]);

    initialize.stdout?.on("data", function (data) {
      console.log("stdout: " + data);
    });
    initialize.on("data", function (data) {
      console.log("stderr: " + data);
    });
    initialize.on("close", (code) => {
      if (code !== 0) {
        reject({ message: `exited with code ${code}`, code });
      }
      console.log(`(code: ${code}) Husky Initialized ✔️`);
      resolve(null);
      // console.log(`child process exited with code ${code}`);
    });
  });

  return initPromise;
}

huskyPrepare()
  .then((ready) => {
    if (ready) {
      huskyInit().then(
        () => console.log("done"),
        (error) => {
          const msgBit = error instanceof Error ? error.message : "";
          const msg = "Husky initialization failed!" + " " + msgBit;
          process.exitCode = 1;

          throw new Error(msg);
        }
      );
    } else {
      process.exitCode = 1;
      throw new Error("Husky installation could not complete");
    }
  })
  .catch((error) => {
    const msg = error instanceof Error ? error.message : "";
    if (msg) console.log(msg);
    process.exit();
  });

class Err extends Error {
  constructor(message, code) {
    super(message);
    this.name = "custom_error";
    this.code = code;
  }
}
