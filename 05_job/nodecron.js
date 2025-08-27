// node-cron : 스케줄링 작업(크론 잡, cron job)
// 특정 시간이나 주기마다 자동으로 함수를 실행
// * (옵션)   *    *    *    *    *
// 초(옵션)   분   시   일   월   요일
// * → 모든 값 / */n → n 단위마다 실행 / , → 여러 값 지정 / - → 범위 지정
const cron = require("node-cron");

cron.schedule("5 * * * * *", () => {
  let current = new Date();
  console.log(current.toISOString() + " => cron실행됨");
});
