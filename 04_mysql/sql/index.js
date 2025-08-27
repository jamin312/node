// sql/index.js
const mysql = require("mysql2"); // mySql 사용을 위해서

// connection pool 생성
// 미리 정해진 수(connectionLimit)만큼 연결을 풀에 만들어두고 재사용합니다.
// DB 접속 정보
const pool = mysql.createPool({
  host: "127.0.0.1", // DB 서버 주소 (로컬)
  port: 3306, // MySQL 기본 포트
  user: "dev01", // DB 사용자
  password: "dev01", // DB 비밀번호
  database: "dev", // 사용할 DB 스키마
  connectionLimit: 10, // 동시에 유지할 최대 연결 개수
});

// pool.getConnection 과 connection.query는 비동기 함수
// 고객에 대한 목록 정보 (mySql에 customers 테이블)
// 흐름: 풀에서 커넥션 빌림 -> 쿼리 실행 -> 결과 반환 -> 커넥션 반환
function execute(sql = "select * from customers", param = []) {
  // promise는 함수를 매개로, (성공, 실패)
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // getConnection => connection 객체 획득
      if (err) {
        return reject(err);
      }

      connection.query(sql, param, (queryErr, results) => {
        connection.release(); // connection => pool 환원
        // 콜백함수
        if (queryErr) {
          return reject(queryErr);
        }
        resolve(results);
      }); // end query()
    }); // end getConnection()
  });
}

module.exports = {
  execute,
};
