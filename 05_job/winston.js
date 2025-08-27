// 로그 - 시스템 운영할 때 발생하는 모든 데이터
const winston = require("winston");

const logger = winston.createLogger({
  // error(0) < warn(1) < info(2) < http(3) < verbose(4)(상세) < debug(5) < silly(6)(가장 상세)
  level: "info", // info(일반 정보), warn(경고), error(치명적 오류)가 출력(info 이상 레벨)
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) =>
        `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
    )
  ),
  // transports: "로그를 어디에 보낼 것인가" 설정

  transports: [
    // new winston.transports.Console() -> 콘솔(터미널)에 출력
    new winston.transports.Console(),
    // logs/sample.log에 로그 기록
    new winston.transports.File({ filename: "logs/sample.log" }),
  ],
});

logger.info("로그인 성공");
logger.warn("잘못된 요청입니다.");
logger.error("데이터베이스 연결 오류");

module.exports = {
  logger,
};
