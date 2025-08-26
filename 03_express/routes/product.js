// 상품 관련 라우팅
const express = require("express");
const router = express.Router(); // 경로별로 파일을 분리해서 관리

router.get("/", (req, resp) => {
  // 상품 관련 라우팅
  console.log("/상품의 root 경로");
  resp.send("/상품의 root 경로");
});

// localhost:3000/product/list
router.get("/list", (req, resp) => {
  resp.send("/상품의 list 경로");
});

router.post("/insert", (req, resp) => {
  console.log("/insert 경로");
  resp.send("/insert 경로");
});

module.exports = router;
