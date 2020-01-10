<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <van-nav-bar title="评价中心"></van-nav-bar>
    </mytop>
    <div class="evaluate-bg">
      <div>
        <!-- 按钮选项 -->
        <van-cell class="Evaluate-options">
          <van-tabs v-model="activeName">
            <van-tab title="待评价" name="a"></van-tab>
            <van-tab title="已评价" name="b"></van-tab>
          </van-tabs>
        </van-cell>
        <rateres class="bg">
          <!-- 待评价页面 -->
          <div v-if="activeName === 'a'">
            <div v-if="tobeEvaluat.length===0" class="coming-soon">暂无待评价数据~~~</div>
            <div v-else>
              <div v-for="item in tobeEvaluat" :key="item.id">
                <van-card :title="item.name" :thumb="item.image_path" class="item-split">
                  <div slot="footer" class="cartitem-footer">
                    <van-button type="primary" plain round size="mini" @click="gotorate(item)">
                      <van-icon name="chat-o" />评价晒单
                    </van-button>
                  </div>
                </van-card>
              </div>
            </div>
          </div>
          <!-- 已评价页面 -->
          <div v-if="activeName === 'b'">
            <div v-if="alreadyEvaluat.length===0" class="coming-soon">暂无已评价数据~~~</div>
            <div v-else>
              <div v-for="item in alreadyEvaluat" :key="item.id">
                <van-card
                  :title="item.goods[0].name"
                  :thumb="item.goods[0].image_path"
                  class="item-split"
                >
                  <div slot="footer">
                    <van-button type="danger" plain round size="mini" @click="gotosee(item)">
                      <van-icon name="chat-o" />查看评价
                    </van-button>
                  </div>
                </van-card>
              </div>
            </div>
          </div>
        </rateres>
      </div>
    </div>
  </div>
</template>

<script>
import rateres from "../../components/pullrefush/Rateres";
export default {
  data() {
    return {
      activeName: "a",
      alreadyEvaluat: [],
      tobeEvaluat: []
    };
  },
  components: {
    rateres
  },
  methods: {
    // 返回上一个页面
    bcakbefore() {
      this.$router.push("/mine");
    },
    // 已评价
    alreadyEvaluated() {
      this.$api
        .alreadyEvaluated()
        .then(res => {
          this.alreadyEvaluat = res.data.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotorate(val) {
      this.$router.push({ name: "rate", query: { rategoods: val } });
    },
    gotosee(val) {
      this.$router.push({ name: "seeeval", query: { ratesid: val._id } });
    },
    // 待评价
    tobeEvaluated() {
      if (localStorage.getItem("nickname")) {
        this.$api
          .tobeEvaluated()
          .then(res => {
            this.tobeEvaluat = res.data.list;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.alreadyEvaluated();
    this.tobeEvaluated();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 返回按钮样式
.bcakHome {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
.evaluate-bg {
  background: url("../../assets/evaluate.jpg") no-repeat;
  background-size: 100%;
  height: 620px;
  overflow: hidden;
}
.Evaluate-options {
  width: 90%;
  line-height: 30px;
  border-radius: 20px;
  margin: 170px auto 5px;
  display: flex;
  justify-content: space-evenly;
  box-shadow: 1px 1px 1px 1px rgb(209, 204, 204);
}
.coming-soon {
  width: 80%;
  margin: 10px auto;
  text-align: center;
  color: grey;
}
.item-split {
  border-bottom: 5px solid #fff;
}
</style>