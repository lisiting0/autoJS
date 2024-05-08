"nodejs";

const lang = require("lang");
const toast = require("toast");
const engines = require("engines");

async function main(id) {
  for (let index = 0; index < 10; index++) {
    console.log("test");
    toast.showToast("Hello, World");
    await lang.delay(1000);
  }

  engines.execScriptFile("./out/starter.node.js");
  console.log("主线程已退出");
  $autojs.cancelKeepRunning(id);
}

const runningId = $autojs.keepRunning();
main(runningId).catch(console.error);
