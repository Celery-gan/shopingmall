<template>
  <div class="heards">
    <div class="flexbtw">
      <!-- 定位城市 -->
      <div v-if="city" class="citys" @click="gotocity(city)">
        {{city}}
        <van-icon name="arrow-down" />
      </div>
      <!-- 城市 没有加载出来时 显示加载动画 -->
      <div v-else class="citys" @click="gotocity(city)">
        <van-loading type="spinner" size="20px" text-size="12px">定位中</van-loading>
      </div>
      <!-- 搜索框 点击时页面显示为搜索页面 -->
      <van-search
        class="searchs"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @focus="onSearch"
      >
        <!-- 搜索按钮 点击时页面显示为搜索页面 -->
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   nu1: {
  //     type: Number,
  //     default: ''
  //   }
  // },
  data() {
    return {
      city: ""
    };
  },
  components: {},
  methods: {
    // 搜索
    onSearch() {
      this.nu1 = 1;

      this.$emit("send", this.nu1);
    },
    // 前往citys页面 并且将目前地址传送过去
    gotocity(val) {
      this.$store.state.usercity = val;
      this.$router.push({ name: "citys" });
    }
  },
  mounted() {
    if (this.usercity === "") {
      if (localStorage.getItem("usercity")) {
        this.$store.state.usercity = localStorage.getItem("usercity");
        this.city = localStorage.getItem("usercity");
      } else {
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
            // console.log(data);
            // data是具体的定位信息
            _this.city = data.addressComponent.city;
            _this.$store.state.usercity = _this.city;
            localStorage.setItem("usercity", _this.city);
          }
          function onError(data) {
            // 定位出错
          }
        });
      }
    } else {
      this.city = this.usercity;
    }
  },
  watch: {},
  computed: {
    usercity() {
      return this.$store.state.usercity;
    }
  }
};
</script>

<style scoped lang='scss'>
.heards {
  z-index: 2;
  background: #fff;
}
</style>