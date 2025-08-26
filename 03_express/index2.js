const express = require("express");
const app = express(); // express 인스턴스
const bodyParser = require("body-parser"); // body 정보 해석 처리
const multer = require("multer");
const path = require("path");
// CORS 동일출처원칙
const cors = require("cors");

// x-www-form-urlencoded / key value 방식
app.use(bodyParser.urlencoded()); // id=u01&pw=1111 방식
// application/json
app.use(bodyParser.json()); // json 문자열 방식 {"id":"u01","pw":"1111"}

// multer 셋업
// 이미지 / 일반 파일 구분해서 업로드
// 일반 파일 업로드
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/file/"); // null 의미가 에러가 없으면...
  },
  filename: (req, file, cb) => {
    const originalname = //
      Buffer.from(file.originalname, "latin1").toString("utf8"); // 한글 깨짐 방지
    cb(null, new Date().valueOf() + originalname);
    // valueOf : 객체를 숫자/문자 등 원시값으로 변환할 때 내부적으로 호출되는 함수
    // path.extname(파일경로/파일명) -> **확장자(.포함)**를 반환
    // file.originalname -> 업로드한 파일의 원래 이름.
  },
});

const uploads = multer({
  storage: storage,
});

// 이미지 업로드
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/image/"); // null 의미가 에러가 없으면...
  },
  filename: (req, file, cb) => {
    const originalname = //
      Buffer.from(file.originalname, "latin1").toString("utf8"); // 한글 깨짐 방지
    cb(null, new Date().valueOf() + originalname);
  },
});

const imgUploads = multer({
  storage: imgStorage,
  // 파일필터링.
  fileFilter: (req, file, cb) => {
    // 이미지 파일 여부 image/jpg, image/png
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("이미지 파일만 업로드할 수 있습니다."), false);
    }
  },
});

// 서로 다른 출처라도 가능하게
const corsOpt = {
  origin: ["http://localhost:5500", "http://192.168.0.23:5500"], // 특정 domain만 허용
};
app.use(cors(corsOpt));

app.get("/", (req, resp) => {
  resp.send("/ 요청");
});

// 요청 방식: post http://localhost:3000/login
app.post("/login", (req, resp) => {
  resp.send("요청 id:" + req.body.id + ",요청 pw:" + req.body.pw);
});

// multi-part 요청: http://localhost:3000/upload
app.post("/fileupload", uploads.single("filename"), (req, resp) => {
  console.log(req.file);
  resp.send("파일 업로드 성공");
});

app.post("/imgupload", imgUploads.single("image"), (req, resp) => {
  resp.send("이미지 업로드 성공");
});

// json 결과 반환
app.get("/bookList", (req, resp) => {
  const list = [
    { no: 1, title: "이것이자바다" },
    { no: 2, title: "웹기초" },
  ];
  resp.json(list);
});

// 에러 처리
app.use((err, req, resp) => {
  if (err instanceof multer.MulterError) {
    resp.status(400).send("Multer 에러 발생" + err);
  } else if (err) {
    resp.status(400).send(err);
  }
});

// 서버 실행
app.listen(3000, "0.0.0.0", () => {
  console.log("http://localhost:3000 서버 실행");
});
