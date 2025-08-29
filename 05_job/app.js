const express = require("express");
require("dotenv").config({
  path: "./.env",
});
const nodemail = require("./nodemail");
const xlsx = require("xlsx");
const dTe = require("./excel");
// const process = require("process");

console.log(process.env);

const app = express();
app.use(express.urlencoded()); // body-parser랑 같은 역할

// 라우팅
app.get("/", (req, resp) => {
  resp.send("/");
});

// 메일 보내는 form
app.get("/mail", (req, resp) => {
  resp.send(
    `<form action="mail" method="post">
      <table>
        <tr>
          <th>보내는 이:</th>
          <td><input type="email" name="sender" value="${process.env.SEND_MAIL}" /></td>
        </tr>
        <tr>
          <th>받는 이:</th>
          <td><input type="email" name="receiver" /></td>
        </tr>
        <tr>
          <th>제목:</th>
          <td><input type="text" name="subject" /></td>
        </tr>
        <tr>
          <th>내용:</th>
          <td><textarea name="content"></textarea></td>
        </tr>
        <tr>
          <th>첨부파일:</th>
          <td><input type="file" name="file" /></td>
        </tr>
        <tr>
          <td colspan="2" align="center">
            <input type="submit" value="메일 보내기" />
          </td>
        </tr>
      </table>
    </form>`
  );
});

// mail 보내는 함수
app.post("/mail", (req, resp) => {
  console.log(req.body);
  let data = {
    from: req.body.sender,
    to: req.body.receiver,
    subject: req.body.subject,
    text: req.body.content,
    // attachments: [{
    //   filename: req.body.file
    //   contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    // }]
  };
  nodemail.mailSend(data);
  resp.send("done");
});

// "/excel_down" => customers 테이블의 데이터를 logs/customer2.xlsx로 저장
app.get("/excel_down", (req, resp) => {
  dTe.db_to_excel("customers2");
  resp.send("done");
});

// 서버 실행
app.listen(3000, () => {
  console.log("http://localhost:3000 서버 실행 중");
});
