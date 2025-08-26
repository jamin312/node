const express = require("express");
const mysql = require("mysql2"); // mySql 사용을 위해서
const parser = require("body-parser");

// connection pool 생성
// 미리 정해진 수(connectionLimit)만큼 연결을 풀에 만들어두고 재사용합니다.
const pool = mysql.createPool({
  host: "127.0.0.1", // DB 서버 주소 (로컬)
  port: 3306, // MySQL 기본 포트
  user: "dev01", // DB 사용자
  password: "dev01", // DB 비밀번호
  database: "dev", // 사용할 DB 스키마
  connectionLimit: 10, // 동시에 유지할 최대 연결 개수
});

const app = express();
app.use(parser.urlencoded()); // x-www-form-urlencoded
app.use(parser.json()); // key:value

app.get("/", (req, resp) => {
  resp.send("/ 실행");
});

// pool.getConnection 과 connection.query는 비동기 함수
// 고객에 대한 목록 정보 (mySql에 customers 테이블)
// 흐름: 풀에서 커넥션 빌림 -> 쿼리 실행 -> 결과 반환 -> 커넥션 반환
app.get("/customers", (req, resp) => {
  pool.getConnection((err, connection) => {
    // getConnection => connection 객체 획득
    if (err) {
      console.log(err);
      return;
    }

    connection.query("select * from customers", (err, results) => {
      // 콜백함수
      if (err) {
        console.log(err);
        resp.send("쿼리 실행 중 에러");
        return;
      }
      console.log(results);
      //resp.send("실행 완료");
      resp.json(results);
      connection.release(); // connection => pool 환원
    }); // end query()
  }); // end getConnection()
});

// 등록 insert
app.post("/customer", (req, resp) => {
  console.log(req.body.param);
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return;
    }

    connection.query(
      // "insert into customers (name, email, phone) values (?,?,?)",
      // [req.body.name, req.body.email, req.body.phone],
      "insert into customers set ?",
      // { name: req.body.name, email: req.body.email, phone: req.body.phone },
      // 배열로 하는 이유는 여러 개가 담길 수 있기 때문에
      // 위는 원본, 아래는 param에 담기는 값이 json 형태로 param에 담겨서 옴
      // {"param": {"name": "방재우","email": "bang@email.com","phone": "010-5541-8745"}}
      [req.body.param],
      (err, results) => {
        if (err) {
          console.log(err);
          resp.send("쿼리 실행 중 에러");
          return;
        }
        console.log(results);
        resp.json(results);
        connection.release();
      }
    ); // end query()
  }); // end getConnection()
});

// 삭제 delete
// customer/:id (:id 파라미터)
app.delete("/customer/:id", (req, resp) => {
  console.log(req.params);
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return;
    }

    connection.query(
      "delete from customers where id = ?",
      // req.body.id (혼자서 한 방식)
      [req.params.id],
      (err, results) => {
        if (err) {
          console.log(err);
          resp.send("쿼리 실행 중 에러");
          return;
        }
        console.log(results);
        resp.json(results);
        connection.release();
      }
    ); // end query()
  }); // end getConnection()
});

app.listen(3000, () => {
  console.log("http://localhost:3000 서버 실행");
});
