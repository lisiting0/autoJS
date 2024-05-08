"nodejs";

import { hotUpdateScript } from "app-base-v9";

function main() {
    const runningId = $autojs.keepRunning();
    hotUpdateScript(runningId).catch(console.error);
}

main();
