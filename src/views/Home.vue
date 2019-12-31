<template>
  <!-- 滑动模块 -->
  <div>
    <div class="mall-bg">
      <div v-if="nu1!==1">
        <!-- 头部 -->
        <mytop>
          <div class="flexbtw">
            <!-- 定位城市 -->
            <div v-if="city" class="citys" @click="gotocity(city)">
              {{city}}
              <van-icon name="arrow-down" />
            </div>
            <!-- 城市 没有加载出来时 显示加载动画 -->
            <div v-else class="citys">
              <van-loading type="spinner" size="20px"></van-loading>
            </div>
            <!-- 搜索框 -->
            <van-search
              class="searchs"
              v-model="inputs"
              placeholder="请输入搜索关键词"
              show-action
              shape="round"
              @focus="onSearch"
            >
              <!-- 搜索按钮 -->
              <div slot="action" @click="onSearch">搜索</div>
            </van-search>
          </div>
        </mytop>
        <!-- 主体部分 -->
        <!-- 页面上下平滑滚动 + 下拉刷新 -->
        <refesh>
          <!-- 轮播图 + 分类 + 广告图 + 滑动查看 -->
          <viewpager
            :images="images"
            :categorys="categorys"
            :recommends="recommends"
            :advertes="advertes"
          ></viewpager>
          <!-- 楼层 + 热门 -->
          <floors
            :floorNames="floorNames"
            :flinfo1="flinfo1"
            :flinfo2="flinfo2"
            :flinfo3="flinfo3"
            :hotgood="hotgood"
          ></floors>
        </refesh>
      </div>
      <div v-else>111111</div>
    </div>
  </div>
</template>

<script>
import refesh from "../components/pullrefush/Pullrefush";
import viewpager from "../components/home/Viewpager.vue";
import floors from "../components/home/Floors.vue";
export default {
  components: {
    viewpager,
    floors,
    refesh
  },
  data() {
    return {
      // 输入框内容
      inputs: "",
      // 定位城市
      city: "",
      // 搜索标识
      nu1: -1,
      // 轮播图的图片
      images: [],
      // 商品分类
      categorys: [],
      // 广告图
      advertes: "",
      // 商品推荐
      recommends: [],
      // 楼层名称
      floorNames: {},
      // 1f
      flinfo1: [],
      // 2f
      flinfo2: [],
      // 3f
      flinfo3: [],
      // 热门商品
      hotgood: []
    };
  },
  methods: {
    // 搜索
    onSearch() {
      this.nu1 = 1;
    },
    // 前往citys页面 并且将目前地址传送过去
    gotocity(val) {
      this.$router.push({ name: "citys", query: { cityname: val } });
    },
    // 获取需要的数据
    getrecommend() {
      this.$api
        .recommend()
        .then(res => {
          // console.log(res);
          // 轮播图的图片
          this.images = res.data.slides;
          // 分类样式
          this.categorys = res.data.category;
          // 广告图
          this.advertes = res.data.advertesPicture.PICTURE_ADDRESS;
          // 商品推荐
          this.recommends = res.data.recommend;
          // 楼层名称
          this.floorNames = res.data.floorName;
          // 1f
          this.flinfo1 = res.data.floor1;
          // 2f
          this.flinfo2 = res.data.floor2;
          // 3f
          this.flinfo3 = res.data.floor3;
          // 热门商品
          this.hotgood = res.data.hotGoods;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    // 如果没有来自city的数据 定位获取当前城市
    if (!this.$route.query.citiesname) {
      let _this = this;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB"
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          _this.city = data.addressComponent.city;
          // console.log(_this.city);
        }

        function onError(data) {
          // 定位出错
        }
      });
    }
    // 如果有来自citys页面的数据，则接受该地址信息
    else {
      this.city = this.$route.query.citiesname;
    }
    this.getrecommend();
  },
  watch: {},

  computed: {}
};
</script>

<style lang='scss'>
.mall-bg {
  background: rgb(241, 241, 241);
  line-height: 30px;
  font-size: 16px;
}
.flexbtw {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.flexeve {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
}
.searchs {
  width: 300px;
  padding: 3px 2px;
}
.citys {
  font-size: 14px;
  margin: 3px;
}
</style>