<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <van-nav-bar title="评价中心"></van-nav-bar>
    </mytop>
    <div>
      <!-- 商品内容 -->
      <van-card
        :num="rategoods.count"
        :price="rategoods.mallPrice"
        :title="rategoods.name"
        :thumb="rategoods.image_path"
      />

      <van-cell class="rate-header">
        <div class="rate-rate">
          <div>商品评价：</div>
          <van-rate v-model="rate" />
        </div>
      </van-cell>

      <van-cell-group>
        <van-field
          v-model="content"
          rows="2"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="说说你的购物感受吧~~"
          show-word-limit
        />
      </van-cell-group>
      <van-uploader v-model="fileList" multiple />
      <div class="rate-bottom">
        <div class="rate-anony">
          <van-switch v-model="anonymous" size="24px" active-color="#07c160" />匿名评价
        </div>
        <div class="rate-submit">
          <van-button type="primary" size="large" @click="comment">提交</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rategoods: {},
      rate: 5,
      content: "",
      fileList: [],
      anonymous: false
    };
  },
  components: {},
  methods: {
    // 返回上一个页面
    bcakbefore() {
      this.$dialog
        .confirm({
          title: "确认取消评价该商品吗？"
        })
        .then(() => {
          history.back();
        })
        .catch(() => {});
    },
    comment() {
      //  comment  商品评论(id,rate,content, anonymous(是否匿名), _id, order_id, image=[])
      this.$api
        .comment({
          id: this.rategoods.cid,
          rate: this.rate,
          anonymous: this.anonymous,
          _id: this.rategoods._id,
          order_id: this.rategoods.order_id,
          image: this.fileList,
          content: this.content
        })
        .then(res => {
          // console.log(res);
          this.$toast.success(res.msg);
          this.$router.push("/evaluate");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.rategoods = this.$route.query.rategoods;
    // console.log(this.rategoods);
    this.rategoods.mallPrice = this.rategoods.mallPrice.toFixed(2);
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
.rate-header {
  background: #fafafa;
  padding: 20px;
}
.rate-rate {
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.rate-bottom {
  padding: 5px 20px;
  background: #fafafa;
}
.rate-anony {
  display: flex;
  align-items: center;
}
.rate-submit {
  padding: 20px;
}
</style>