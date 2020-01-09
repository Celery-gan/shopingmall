<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <div>最近浏览</div>
    </mytop>
    <browsres>
      <div v-if="nickname !== ''">
        <div v-if="browsing.length < 1">
          <div class="address-none">暂无浏览历史~~</div>
        </div>
        <div v-else>
          <!-- 循环显示商品信息 -->
          <van-cell v-for="(item,index) in browsing" :key="item.id">
            <div class="mysearch-list">
              <div @click="gotos(item.id)">
                <img :src="item.image_path" class="search-img" />
              </div>
              <div>
                <div v-html="item.name" class="goods-name" @click="gotos(item.id)"></div>
                <div class="goods-price">
                  <div class="persent-price" @click="gotos(item.id)">￥{{item.present_price}}</div>
                  <div @click="delbros(index)">
                    <img src="../../assets/cuo.png" class="collect-delbtn" />
                  </div>
                </div>
              </div>
            </div>
          </van-cell>
        </div>
      </div>
    </browsres>
  </div>
</template>

<script>
import browsres from "../../components/pullrefush/Pullrefush";
export default {
  data() {
    return {
      nickname: ""
    };
  },
  components: {
    browsres
  },
  methods: {
    // 返回上一个页面
    bcakbefore() {
      this.$router.push("/mine");
    },
    // 点击搜索出来的商品 前往商品详情页
    gotos(val) {
      this.$router.push({
        name: "detail",
        query: {
          ids: val
        }
      });
    },
    delbros(index) {
      this.$dialog
        .confirm({
          title: "确认删除该条浏览历史"
        })
        .then(() => {
          this.$store.state.browsing.splice(index, 1);
        })
        .catch(() => {});
    }
  },
  mounted() {
    if (localStorage.getItem("nickname")) {
      this.nickname = localStorage.getItem("nickname");
    }
  },
  watch: {},
  computed: {
    browsing() {
      return this.$store.state.browsing;
    }
  }
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