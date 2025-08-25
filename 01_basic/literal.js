// literal `${}` 안에 연산도 가능
// .join 배열의 모든 요소를 구분자로 이어붙인 문자열 반환

fetch("http://192.168.0.83/HelloJSP/mock.json")
  .then((res) => res.json())
  .then((result) => {
    ["Male", "Female"].forEach((gender) => {
      console.log(
        `${gender} => ${result
          .filter((elem) => elem.gender == `${gender}`)
          .map((elem) => elem.first_name)
          .join(",")}`
      );
    });
  })
  .catch(console.log);
