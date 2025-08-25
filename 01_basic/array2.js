// fetch() 서버에 요청 보내서 응답(Response)을 받는 함수
fetch("http://192.168.0.83/HelloJSP/replyList.do?bno=145")
  .then((res) => res.json()) // json문자열을 자바스크립트 객체로 가져옴
  .then((result) => {
    result
      .filter((elem) => {
        if (elem.replyer == "user03") {
          return true;
        }
      })
      .forEach((element) => {
        console.log(element.replyNo);
      });
  })
  .catch(console.log);

fetch("http://192.168.0.83/HelloJSP/replyList.do?bno=145")
  .then((res) => res.json())
  .then((result) => {
    result
      .filter((elem, idx, ary) => {
        if (elem.reply.indexOf("연습") != -1) {
          return true;
        }
      })
      .forEach((element) => {
        console.log("작성자는 " + element.replyer);
      });
  })
  .catch(console.log);
