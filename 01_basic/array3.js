// map (mapping) "매핑(mapping)" → 하나의 값을 다른 값으로 변환 / 원본 배열은 그대로 두고, "가공된 새로운 배열"을 만들어 반환
// A -> A'
// {name, age, point} => {name, point}

fetch("http://192.168.0.83/HelloJSP/mock.json")
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
    result
      .map((elem) => {
        // first_name, last_name
        const newElem = {
          no: elem.id,
          name: elem.first_name + "/" + elem.last_name,
          email: elem.email,
          salary: elem.salary,
        };
        return newElem;
      })
      .forEach((elem) => console.log(elem.no + ": " + elem.name));
  })
  .catch(console.log);
