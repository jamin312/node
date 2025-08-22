// [].sort() , 숫자 기준이 아니라 문자열 기준, 각 요소를 문자열로 변환 → 유니코드 순서대로 비교

let fruits = ["apple", "cherry", "banana"];
fruits.sort();

fruits.forEach((fruit) => {
  console.log(fruit);
});

let numbers = [1, 10, 100, 2, 12, 44];
numbers.sort();
numbers.forEach((number) => {
  console.log(number);
});

numbers.sort(function (a, b) {
  if (a > b) {
    // (a > b) 오름차순 (b > a) 내림차순
    return 1; // 위치를 변경 : 양의 값
  } else {
    return -1; // 위치를 유지: 음의 값
  }
});

numbers.forEach((number) => {
  console.log(number);
});

// filter() 조건을 만족하는 요소만 새로운 배열로 반환
[
  { name: "Hong", point: 10 },
  { name: "Kim", point: 23 },
  { name: "Park", point: 46 },
  { name: "Choi", point: 17 },
  { name: "Hwang", point: 56 },
]
  .filter((elem, idx, ary) => {
    console.log(elem);
    if (elem.point > 30) {
      return true;
    }
  })
  .forEach((elem) => {
    console.log("이름은 " + elem.name + ", point: " + elem.point);
  });
