<template>
  <div>
    <mytop>
      <van-nav-bar title="分类"></van-nav-bar>
    </mytop>
    <div>
      <!-- 页面上下平滑滚动 第一层盒子 -->
      <div class="core-containers">
        <!-- 第二层盒子 -->
        <div class="wrappers" ref="wrapper">
         

          <div class="cate-body">
            <!-- 侧边 -->
            <div class="cate-sidebar">
              <van-sidebar v-model="activeKey" @change="change">
                <div v-for="item in categorys" :key="item.id">
                  <van-sidebar-item :title="item.mallCategoryName"></van-sidebar-item>
                </div>
              </van-sidebar>
            </div>
            <div class="cate-main">
              <!-- 顶部 -->
              <van-tabs v-model="active" @click="getcategory">
                <van-tab v-for="item in bxMallSubDtos" :title="item.mallSubName" :key="item.id"></van-tab>
              </van-tabs>
              <!-- <div v-for="item in catelist" :key="item.id"> -->
              <van-cell v-if="catelist.length===0">该类商品暂无</van-cell>
              <van-cell v-else v-for="item in catelist" :key="item.id" @click="gotos(item.id)">
                <div class="mysearch-list">
                  <div>
                    <img :src="item.image" class="search-img" />
                  </div>
                  <div>
                    <div v-html="item.name" class="goods-name"></div>
                    <div class="goods-price">
                      <span class="persent-price">￥{{item.present_price}}</span>
                      <span class="orl-price">{{item.orl_price}}</span>
                    </div>
                  </div>
                </div>
              </van-cell>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      activeKey: 0,
      active: 0,
      catelist: [],
      bxMallSubDtos: [],
    };
  },
  components: {},
  methods: {
    // 页面上下平滑滚动
    init() {
      this.bs = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        probeType: 3 // listening scroll hook
      });
    },
    //  category 分类查询  参数id：默认分类的id
    getcategory() {
      this.bxMallSubDtos = this.categorys[this.activeKey].bxMallSubDto;
      let ids = this.bxMallSubDtos[this.active].mallSubId;
      this.$api
        .category(ids)
        .then(res => {
          this.catelist = res.dataList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    change() {
      this.active = 0;
      this.getcategory();
    },
    // 路由跳转到详情页 传参为商品id
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
    if (this.$route.query.cateindex) {
      this.activeKey = this.$route.query.cateindex;
    }
    this.getcategory();
    this.init();
  },
  watch: {},
  computed: {
    categorys() {
      return this.$store.state.category;
    }
  }
};
</script>

<style scoped lang='scss'>
.cate-body {
  display: flex;
}
.cate-sidebar {
  width: 85px;
}
.cate-main {
  width: 280px;
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
.persent-price {
  color: red;
  margin: 8px;
}
.orl-price {
  color: gray;
  text-decoration: line-through;
  font-size: 12px;
}
.goods-price {
  position: absolute;
  bottom: 5px;
}
.goods-name {
  margin: 0 8px;
  line-height: 20px;
}

.core-containers {
  // height: 570px;
  .wrappers {
    height: 570px;
    overflow: hidden;
  }
}
</style>