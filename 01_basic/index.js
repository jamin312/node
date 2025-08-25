let name = "정재민";
let score = 80;

console.log("이름은 " + name + ",점수는 " + score);
console.log(`이름은 ${name}, 점수는 ${score}`); // template literals
console.log(
  `이름은 ${name} 점수는 ${score} 합격여부는 ${score > 60 ? "합격" : "불합격"}`
);

[1, 2, 3].forEach((element) => {
  console.log(element);
});

function sum(num1, num2) {
  let result;
  result = num1 + num2;
  return result;
}
console.log(sum(1, 2));

const NumberFormat = "2025.08.08"; // 상수 변수  재할당이 불가능
// NumberFormat = "2025.08.09";
console.log(NumberFormat);

if (score) {
  // 값이 있으면 true
  let name = "홍길동"; // 블럭단위의 변수 선언은 새롭게 정의하여 사용가능 / 중괄호 {}로 묶인 코드 영역
  // var는 함수 단위 스코프라서, 블럭 {}은 무시
  console.log(name);
}

for (let i = 1; i <= 5; i++) {
  if (i % 2) {
    // falsy : 0, null, "", undefined /false 처리
    let name = "Kim"; // 블럭 안에서만 유효한 값 유지.
  }
  {
    i % 2 ? (name = "정재민") : (name = "Kim");
    console.log(name);
  }
}
