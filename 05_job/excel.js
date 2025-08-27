// v : 원시값 / w : 포맷이 적용된 텍스트 / t : 셀 데이터 타입
const xlsx = require("xlsx");
const sql = require("./sql");

// xlsx 조회 후 DB 저장
function excel_to_db() {
  //엑셀 파일 읽어서 workbook 객체 생성
  const workbook = xlsx.readFile("./logs/write.xlsx");

  // 첫 번째 시트 이름 가져오기
  const firstSheetName = workbook.SheetNames[0];
  // 첫 번째 시트 객체 참조
  const firstSheet = workbook.Sheets[firstSheetName];

  // 시트를 json으로 변환
  let jsonSheet = xlsx.utils.sheet_to_json(firstSheet);
  console.log(jsonSheet);
  // DB에 저장
  jsonSheet.forEach(async (customer) => {
    let result = await sql.execute("insert into customers set ?", customer);
    console.log(result);
  });
}

// 전체 흐름: DB → JSON → Sheet → Workbook → Excel 파일
// DB 조회 후 xlsx 저장
async function db_to_excel(name) {
  const workbook = xlsx.utils.book_new(); // workbook 생성
  let resultSet = await sql.execute("select * from customers");
  console.log(resultSet);

  // 배열 => sheet : json_to_sheet / 구조 : workbook > sheet > cell
  const firstSheet = xlsx.utils.json_to_sheet(resultSet, {
    // header 옵션으로 열 순서 강제 지정
    header: ["id", "name", "email", "phone", "address"],
  });

  // workbook에 sheet 추가
  xlsx.utils.book_append_sheet(workbook, firstSheet, "Customers"); // 시트 생성
  // workbook을 엑셀 파일(customers.xlsx)로 저장
  xlsx.writeFile(workbook, `./logs/${name}.xlsx`); // 엑셀 파일 생성
}

db_to_excel();

console.log("파일 저장 완료");

module.exports = {
  db_to_excel,
};

// 엑셀 파일에 포함된 시트 이름 배열 출력
// console.log(workbook.SheetNames);
// console.log(firstSheet["A2"].v);
// // B2 셀의 값을 "Hongkildong"으로 수정
// firstSheet["B2"].v = "Hongkildong";
// // A3~E3에 새로운 데이터 채우기
// firstSheet["A3"] = { v: 99, t: "n" }; // 숫자
// firstSheet["B3"] = { v: "김민규", t: "s" }; // 문자열
// firstSheet["C3"] = { v: "min@email.com", t: "s" };
// firstSheet["D3"] = { v: "010-3125-9875", t: "s" };
// firstSheet["E3"] = { v: "국민은행 옆길", t: "s" };

// firstSheet["!ref"] = "A1:E3"; // 워크시트 범위 갱신
// xlsx.writeFile(workbook, "./logs/write.xlsx");
