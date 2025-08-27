// 이메일 보내기 / SMTP 서버 필요
// Daum에서 진행
const nodemail = require("nodemailer");

let transporter = nodemail.createTransport({
  host: "smtp.daum.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SEND_MAIL,
    pass: process.env.DAUM_PASS,
  },
});

const mailSend = (data = {}) => {
  transporter.sendMail(data, (err, result) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log(result.messageId + "를 확인하세요");
    return result.messageId;
  });
};

module.exports = {
  mailSend,
};

// data가 담기는 값
// {
//   from: "jaemin6904@daum.net",
//   to: "jamin312@naver.com",
//   subject: "메일 발송 연습",
//   text: "메일이 잘 발송되는지 연습 중입니다.",
// },
