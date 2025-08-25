// import { myFunc, sum } from "./helloworld.js"; //.js  있어야 실행됨
const { myFunc, sum } = require("./helloworld"); // .js 없어도 실행됨

myFunc();

let n1 = 11;
let n2 = 13;
console.log(`두 수 ${n1}, ${n2}의 합은 ${sum(n1, n2)}입니다.`);
