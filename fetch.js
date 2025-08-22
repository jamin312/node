// get (조회)/ post (생성)/ put (수정)에 파라미터값 필요 / delete 방식 / patch (일부 수정)
// fetch(fetch(fetch(코드...)))  보다는
// fetch() 순차적으로
// fetch()
// fetch()
// async function() {await 호출}

async function getPost() {
  let response = await fetch("http://localhost:3000/posts");
  let data = await response.json();
  console.log(data);

  data.forEach(async (post) => {
    console.log("post번호" + post.id + "에 대한 comments list");
    let response = await fetch("http://localhost:3000/comments");
    let data = await response.json();
    data.forEach((comment) => {
      if (comment.postId == post.id) {
        console.log("  내용 : " + comment.body);
      }
    });
  });
}
getPost(); // 함수 호출

// fetch("http://localhost:3000/posts")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     data.forEach((post) => {
//       console.log("post번호" + post.id + "에 대한 comments list");
//       // post에 대한 comments 조회
//       fetch("http://localhost:3000/comments")
//         .then((resp) => resp.json())
//         .then((data) => {
//           data.forEach((comment) => {
//             if (comment.postId == post.id) {
//               console.log("내용:" + comment.body);
//             }
//           });
//         })
//         .catch(console.log);
//       // end comments fetch
//     });
//   })
//   .catch(console.log);

//   method: "post",
//   body: JSON.stringify({
//     id: "4",
//     body: "second comment for postId: 2",
//     postId: 2,
//   }),
//   headers: { "Content-Type": "application/json;charset=utf-8" },
// })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   })
//   .catch(console.log);
