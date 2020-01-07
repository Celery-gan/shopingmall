<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <div>我的收藏</div>
    </mytop>

    <div v-if="nickname !== ''">
      <!-- 循环显示商品信息 -->
      <van-cell v-for="item in Collections" :key="item.id">
        <div class="mysearch-list">
          <div @click="gotos(item.cid)">
            <img :src="item.image_path" class="search-img" />
          </div>
          <div>
            <div v-html="item.name" class="goods-name" @click="gotos(item.cid)"></div>
            <div class="goods-price">
              <div class="persent-price" @click="gotos(item.cid)">￥{{item.present_price}}</div>
              <div @click="delcollect(item)">
                <img src="../../assets/cuo.png" class="collect-delbtn" />
              </div>
            </div>
          </div>
        </div>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Collections: [],
      nickname: ""
    };
  },
  components: {},
  methods: {
    // 返回上一个页面
    bcakbefore() {
      history.back();
    },
    tologin() {
      this.$router.push("/login");
    },
    // 获取所有的收藏数据
    getCollection() {
      this.$api
        .getCollection()
        .then(res => {
          this.Collections = res.data.list;
          // console.log(this.Collections);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 取消收藏
    delcollect(val) {
      //  cancelCollection 取消收藏单个商品        参数：  id:商品的cid
      this.$api
        .cancelCollection(val.cid)
        .then(res => {
          this.$toast.success(res.msg);
          this.getCollection();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击搜索出来的商品 前往商品详情页
    gotos(val) {
      this.$router.push({
        name: "detail",
        query: {
          ids: val
        }
      });
    }
  },
  mounted() {
    this.getCollection();
    if (localStorage.getItem("nickname")) {
      this.nickname = localStorage.getItem("nickname");
    }
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

// 搜索结果 flex排列
.mysearch-list {
  display: flex;
  height: 80px;
}
// 搜索结果的图片大小设置
.search-img {
  width: 70px;
  margin: 0 10px;
}
.goods-name {
  margin: 0 8px;
  line-height: 20px;
}
.goods-price {
  position: absolute;
  bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
}
.persent-price {
  color: red;
  margin: 8px;
}
.collect-delbtn {
  width: 20px;
}
</style>