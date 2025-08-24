// 정규 표현식
let reg = /World/g;
// reg = new RegExp("World");

let str = `Hello Hi...
World!
World`;
// g(global) 전역검색, i(ignore) 대소문자 무시, m(miltiline) 다중행 검색(첫번째 값)
// replace 대응하는 문자열 다른 문자열로 치환
console.log(str.replace(/World/gim, "세상"));
// test 대응하는 문자열 있는지 (True/False)
console.log(reg.test(str));
// exec 배열 반환 없으면 null
console.log(reg.exec(str));
// split 대응하는 문자열 기준으로 나누어서 반환
console.log(str.split(reg));
// match 대응하는 문자열을 배열로 반환 없으면 null / exec랑 같은 기능
console.log(str.match(reg));
// search 대응하는 문자열의 첫 번째 인덱스를 반환 , 없으면 -1
console.log(str.search(reg));

let regPhone = /\d{3}-\d{4}-\d{4}/;
console.log(regPhone.test("010-1234-5678"));
