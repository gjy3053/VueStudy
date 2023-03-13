export default {
  template: `<div>
                <table id="list">
                    <!-- HEADER -->
                    <tr>
                        <th style="width:50px;">글번호</th>
                        <th>글제목</th>
                        <th style="width:50px;">조회수</th>
                        <th style="width:70px;"></th>
                    </tr>
                    <!-- DATA LIST -->
                    <tr v-for="item in object" v-bind:key="item.no">
                        <td>{{ item.no }}</td>
                        <router-link tag="td" v-bind:to="{name : 'boardRead', params : {'item' : item}}">{{item.title}}</router-link>
                        <td>{{ item.view }}</td>
                        <td><button v-on:click="boardDelete(item.no)">삭제</button></td>
                    </tr>
                </table>
                <router-link tag="button" style="float:right" v-bind:to="{name : 'boardWrite'}">글쓰기</router-link>
              </div>`,
  data: function () {
    return {
      object: [],
    };
  },
  //컴포넌트가 생성 될 때, 부모컴포넌트의 데이터를 얻어온다.
  // boardList Reading
  created: function () {
    this.object = this.$parent.getParentData();
  },
  methods: {
    boardDelete: function (no) {
      // 글삭제
      //this.$emit('board-delete', no);
      for (let i = 0; i < this.object.length; i++) {
        if (this.object[i].no == no) {
          this.object.splice(i, 1);
        }
      }

      this.$parent.setParentData(this.object);
    },
  },
};
