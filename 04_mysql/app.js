// REST API는 자원을 URI로 표현하고, 행위는 HTTP 메서드로 구분
// query는 인자는 2개까지만 사용 권장
const express = require("express");
const parser = require("body-parser");
const sql = require("./sql");

const app = express();
app.use(parser.urlencoded()); // x-www-form-urlencoded
app.use(parser.json()); // key:value

app.get("/", (req, resp) => {
  resp.send("/ 실행");
});

// 목록 select
app.get("/customers", async (req, resp) => {
  try {
    let customerList = await sql.execute("select * from customers");
    console.log(customerList);
    resp.json(customerList);
  } catch (err) {
    console.log(err);
    resp.json({ retCode: "Error" });
  }
});

// 등록 insert
app.post("/customer", async (req, resp) => {
  console.log(req.body.param);
  try {
    let regCustomer = await sql.execute(
      "insert into customers set ?", //
      [req.body.param]
    );
    console.log(regCustomer);
    resp.json(regCustomer);
  } catch (err) {
    console.log(err);
    resp.json({ retCode: "Error" });
  }
});

// 삭제 delete
//:id 라우트에서 약속한 변수 이름, Express가 그걸 파싱해서 req.params 객체에 넣음
// customer/:id (:id 파라미터)
app.delete("/customer/:id", async (req, resp) => {
  console.log(req.params);
  try {
    let delCustomer = await sql.execute(
      "delete from customers where id = ?", //
      [req.params.id]
    );
    console.log(delCustomer);
    resp.json(delCustomer);
  } catch (err) {
    console.log(err);
    resp.json({ retCode: "Error" });
  }
});

// 전체 수정(put) update / 일부 수정은 patch
app.put("/customer/:id", async (req, resp) => {
  try {
    console.log(req.params);
    let upCustomer = await sql.execute(
      "update customers set ? where id = ?", //
      [req.body.param, req.params.id]
    );
    console.log(upCustomer);
    resp.json(upCustomer);
  } catch (err) {
    console.log(err);
    resp.json({ retCode: "Error" });
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000 서버 실행");
});
