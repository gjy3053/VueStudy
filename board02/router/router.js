import main from "../components/main.js";
import myBoardList from "../components/myBoardList.js";
import myBoardRead from "../components/myBoardRead.js";
import myBoardWrite from "../components/myBoardWrite.js";

export default new VueRouter({
  //hash -> # + 경로 (server로 요청을 보내지 않고 페이지 이동)
  //url #뒤에 있는 내용 가져올 수 없다.
  //history -> #을 제외하고 SPA구현하기 위한 모드
  //mode default값 : hash
  // mode: "history", //외부에서 들어오기 힘들다
  router: [
    {
      path: "/",
      name: "main",
      component: main,
    },
    //boardList
    {
      path: "/boardList",
      name: "boardList",
      component: myBoardList,
    },
    //boardRead
    {
      path: "/boardRead/:item", //boardRead에 props item
      name: "boardRead",
      component: myBoardRead,
      props: true, //자식이 매개변수 item을 쓸 수 있도록 허용
    },
    //boardWrite
    {
      path: "/boardWrite",
      name: "boardWrite",
      component: myBoardWrite,
    },
  ],
});
