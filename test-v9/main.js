"nodejs";

const { scrollForward, scrollBackward } = require("accessibility");

scrollBackward();
console.log(process.versions);

let now = new Date();
let d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
console.log(now);
console.log(d2);
