"nodejs";

import { execScriptFile, getRunningEngines, myEngine } from "engines";

import got from "got";
import { createWriteStream } from "fs";
import stream from "stream";
import { promisify } from "util";
import { exec } from "shell";
const pipeline = promisify(stream.pipeline);

export async function hotUpdate(id: number): Promise<void> {
  const url = `${
    myEngine().execArgv?.host ?? "http://192.168.16.149:33452"
  }/app/hot-update/js/${myEngine().execArgv?.appName ?? "CZ"}/${
    myEngine().execArgv?.channel ?? "scripts"
  }/download`;

  console.log(`热更新地址 ${url}`);

  await downloadFile(
    url,
    getRunningEngines()[0].workingDirectory + "/dist/main.node.js"
  );

  const result = await exec(
    `ls ${getRunningEngines()[0].workingDirectory} -la`
  );

  console.log(`${JSON.stringify(result)}`);

  execScriptFile("./dist/main.node.js");
  console.log("热更新完成");
  $autojs.cancelKeepRunning(id);
}

export async function downloadFile(
  url: string,
  fileName: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const downloadStream = got.stream(url);
    const fileWriterStream = createWriteStream(fileName);

    downloadStream.on("downloadProgress", ({ transferred, total, percent }) => {
      const percentage = Math.round(percent * 100);
      console.warn(`progress: ${transferred}/${total} (${percentage}%)`);
    });

    pipeline(downloadStream, fileWriterStream)
      .then(() => {
        console.log(`File downloaded to ${fileName}`);
        resolve();
      })
      .catch((error) => {
        const e = `下载出现异常 ` + error;
        console.error(e);
        reject(new Error(e));
      });
  });
}

function main() {
  const runningId = $autojs.keepRunning();
  hotUpdate(runningId).catch(console.error);
}

main();
