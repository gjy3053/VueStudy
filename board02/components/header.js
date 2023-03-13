// 내가 가지고 있는 정보를 밖으로 내보내겠다.
// 모듈
// export default : 정의한 내용을 다른 곳에서 불러 쓸 수 있도록 한다.
// 해당 모듈 불러와서 쓸 땐 import이다.
export default {
  template: `  <header>
                  <h2>간단한 게시판</h2>
                  <p>게시판 데이터 json 파일 읽기</p>
                  <input type="file" v-on:change="loadData($event)">
                  <button v-on:click="saveBoardList">게시판 저장하기</button>
                </header>`,
  //app.js : <my-header v-bind:parentData.sync="this.$data"></my-header>
  props: ["parentData"],
  methods: {
    loadData: function (event) {
      // 파일을 읽어들이는 메소드
      let file = event.target.files[0].name; //파일에 대한 이름
      if (file) {
        fetch("/board02/data/" + file) //절대경로
          .then((response) => response.json())
          .then((data) => {
            //this.dataArray = data;
            // if(this.dataArray != null && this.dataArray['board'].length > 0){
            //     this.listOk = true;
            // }
            //--------------------------------------------
            this.parentData.dataArray = data;
            // if(this.parentData.dataArray != null && this.parentData.dataArray['board'].length > 0){
            //     this.parentData.listOk = true;
            // }

            //업데이트하라고 이벤트를 발생시긴다
            this.$emit("update:parentData", this.parentData);

            //<router-link to="/boardList">이동</router-link>
            // +
            //click까지 진행
            //$router.push
            this.$router.push({ name: "boardList" }); //강제로 보드리스트로 이동시킨다
          })
          .catch((err) => console.log(err));
      }
    },
    saveBoardList: function () {
      // 게시글을 담고 있는 변수 - Object로 가지고 있음
      let data = this.dataArray;

      //게시글이 존재하지 않는다면
      if (data.length == 0) {
        alert("저장할 게시판 내용이 없습니다.");
        return;
      }

      // type이 Object이라면
      if (typeof data === "object") {
        // stringify : Object를 json형태의 문자열로 변환
        data = JSON.stringify(data, undefined, 4);
      }

      // blob : 대용량 파일 다운로드 받을 때 사용, 2진수로 되어있음
      // 파일 다운받기 위해서 사용(이미지, 텍스트 다운로드 시 사용)
      let blob = new Blob([data], { type: "text/json" });
      let a = document.createElement("a");
      // 다운받을 파일명
      a.download = "board.json";
      // 서버에서 다운받을 파일 URL(경로)
      a.href = window.URL.createObjectURL(blob); //자바스크립트 고유함수
      // a태그 클릭 이벤트 실행
      a.click();
    },
  },
};
