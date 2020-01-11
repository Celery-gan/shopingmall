<template>
  <div id="home">
    <div v-for="item in 20" :key="item.id">{{item}}</div>
    <van-sticky :container="container">
      <van-tabs @click="onClick">
        <van-tab title="商品详情"></van-tab>
        <van-tab title="商品评价"></van-tab>
      </van-tabs>
    </van-sticky>
    <div>
      <Better-scroll
        class="content"
        :probeType="3"
        :pullUpLoad="true"
        ref="scroll"
        @scroll="scroll"
        @pullingUp="loadmore"
      >
        <div ref="container">
          <div v-if="indexs===0">
            <!-- 3.1 商品详情 -->

            <div v-html="goodsinfo.detail"></div>
            <div class="null">hello</div>
          </div>
          <div v-else>
            <!-- 3.2商品评价 -->
            <div v-if="comments.length === 0" class="goodsinfo-comments">暂无数据</div>
            <div v-else>
              <!--  comments 所有的评论 -->
              <div v-for="(item,index) in comments" :key="item.id">
                {{index}}
                <!-- 3.2.1 匿名评价 -->
                <div v-if="item.anonymous">
                  <div class="comments-header">
                    <div class="comments-user">
                      <div>
                        <div>{{item.comment_nickname}}</div>
                        <van-rate v-model="item.rate" readonly />
                      </div>
                    </div>
                    <div class="comments-time">{{item.comment_time}}</div>
                  </div>
                  <div class="comment-content">评论：{{item.content}}</div>
                </div>
                <!-- 3.2.2 实名评价 -->
                <div v-else>
                  <div class="comments-header">
                    <div class="comments-user">
                      <div>
                        <div>用户：{{item.user[0].nickname}}</div>
                        <van-rate v-model="item.rate" readonly />
                      </div>
                    </div>
                    <div class="comments-time">{{item.comment_time}}</div>
                  </div>
                  <div class="comment-content">评论：{{item.content}}</div>
                </div>
              </div>
              <!-- comments end -->
            </div>
            <div class="null">thank you</div>
          </div>
        </div>
      </Better-scroll>
    </div>
    <Back-top @click.native="backclick" v-show="backtop"></Back-top>
  </div>
</template>

<script>
import BetterScroll from "../../components/better-scroll/BetterScroll";
import BackTop from ".././../components/better-scroll/Backtop";
export default {
  data() {
    return {
      backtop: false,
      page: 1,
      maxpage: 1,
      ids: 1,
      comments: [],
      goodsinfo: [],
      indexs: 0,
      container: ""
    };
  },
  components: { BetterScroll, BackTop },
  methods: {
    onClick(name) {
      this.indexs = name;
    },
    scroll(position) {
      this.backtop = -position.y > 200;
    },
    backclick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },
    loadmore() {
      if (this.page < this.maxpage) {
        this.page++;
        this.getGoodOne();
        this.$refs.scroll.scroll.finishPullUp();
      } else {
        this.$refs.scroll.scroll.finishPullUp();
      }
    },
    getGoodOne() {
      console.log(this.page);
      if (this.page <= this.maxpage) {
        this.$api
          .goodOne(this.ids, this.page)
          .then(res => {
            this.goodsinfo = res.goods;
            this.maxpage = Math.ceil(res.goods.count / 5);
            res.goods.comment.map(item => {
              this.comments.push(item);
            });
            console.log(this.comments);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.container = this.$refs.scroll;
    if (this.$route.query.ids) {
      this.ids = this.$route.query.ids;
    }
    this.getGoodOne();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
#home {
  height: 100vh;
  position: relative;
}
.content {
  overflow: hidden;
  height: 888px;
}
</style>