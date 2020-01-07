<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <div>评价中心</div>
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
        <refeshs>
          <!-- 待评价页面 -->
          <div v-if="activeName === 'a'">
            <div v-if="tobeEvaluat.length===0" class="coming-soon">暂无待评价数据~~~</div>
            <div v-else>
              <div v-for="item in tobeEvaluat" :key="item.id">
                <van-card :title="item.name" :thumb="item.image_path">
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
                <!-- <van-card :title="item.name" :thumb="item.image_path" /> -->
                <van-card :title="item.goods[0].name" :thumb="item.goods[0].image_path">
                  <div slot="footer" class="cartitem-footer">
                    <van-button type="danger" plain round size="mini" @click="gotosee(item)">
                      <van-icon name="chat-o" />查看评价
                    </van-button>
                  </div>
                </van-card>
              </div>
            </div>
          </div>
          <!--  -->
        </refeshs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "a",
      alreadyEvaluat: [],
      tobeEvaluat: []
    };
  },
  components: {},
  methods: {
    // 返回上一个页面
    bcakbefore() {
      this.$router.push("/mine");
    },

    // 待评价
    tobeEvaluated() {
      this.$api
        .tobeEvaluated()
        .then(res => {
          this.tobeEvaluat = res.data.list;
          this.$store.state.tobeEvaluats = this.tobeEvaluat.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 已评价
    alreadyEvaluated() {
      this.$api
        .alreadyEvaluated()
        .then(res => {
          this.alreadyEvaluat = res.data.list;
          // console.log(this.alreadyEvaluat);
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotorate(val) {
      this.$router.push({ name: "rate", query: { rategoods: val } });
    },
    gotosee(val) {
      this.$router.push({ name: "seeeval", query: { myrate: val } });
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
  height: 570px;
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
</style>