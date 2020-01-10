<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <van-nav-bar title="我的收藏"></van-nav-bar>
    </mytop>
    <colres>
      <div v-if="nickname !== ''">
        <!-- 循环显示商品信息 -->
        <div v-if="Collections.length < 1">
          <div class="address-none">暂无收藏商品~~</div>
        </div>
        <div v-else>
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
    </colres>
  </div>
</template>

<script>
import colres from "../../components/pullrefush/Pullrefush";
export default {
  data() {
    return {
      Collections: [],
      nickname: ""
    };
  },
  components: {
    colres
  },
  methods: {
    // 返回上一个页面
    bcakbefore() {
      this.$router.push("/mine");
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 取消收藏
    delcollect(val) {
      this.$dialog
        .confirm({
          title: "确认取消收藏"
        })
        .then(() => {
          this.$api
            .cancelCollection(val.cid)
            .then(res => {
              this.$toast.success(res.msg);
              this.getCollection();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
      //  cancelCollection 取消收藏单个商品        参数：  id:商品的cid
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
.address-none {
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  color: rgb(202, 202, 202);
}
</style>