// ...args 펼침 연산자 배열이나 객체를 펼쳐서 개별 요소로 분해
// Spread Operator
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let result = [...arr1, ...arr2];

console.log(result);

let str = "abcde";
console.log(...str);

// Object Destructuring
let obj = {
  firstName: "kildong",
  lastName: "Hong",
  age: 20,
};

let fn = obj.firstName;
let ln = obj.lastName;
let ag = obj.age;

let { firstName, lastName, age } = obj;
console.log(firstName, lastName, age);

// Array Desturcturing
let ary = [1, 2, 3];

let a = ary[0];
let b = ary[1];
let c = ary[2];

let [n1, n2, n3] = ary;
console.log(n1);

// Default Function Parameter
// 함수(매개변수)
function sum(num1 = 0, num2 = 0) {
  // if (num2 == undefined) {
  //   if (num1 == undefined) {
  //     return 0;
  //   }
  //   return num1;
  // }
  let result = num1 + num2;
  return result;
}

console.log(sum() + sum(1, 1));
