// [].reduce() 배열을 순회하면서 **누적 값(accumulator)**을 만들어내는 함수
let result = [10, 15, 20, 25, 30].reduce((acc, elem) => {
  console.log(acc, elem);
  return acc + elem; // 다음 순번의 acc 값
}, 0);
console.log(result);

let result2 = [10, 15, 20, 25, 30].reduce((acc, elem) => {
  if (elem % 2 == 0) {
    acc.push(elem);
  }
  return acc;
}, []);
console.log(result2); // [10, ,20, 30]
