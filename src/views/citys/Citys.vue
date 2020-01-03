<template>
  <!-- 城市菜单 -->

  <div class="mall-bg">
    <van-sticky>
      <div class="city-top">
        <mytop>
          <img
            src="../../assets/toback.svg"
            alt="xxx"
            title="鼠标悬停提示"
            @click="backhome"
            class="bcakHome"
          />
          <span>城市列表</span>
        </mytop>
      </div>
    </van-sticky>
    <!-- 搜索框 -->
    <van-search placeholder="请输入城市关键词" v-model="value" />

    <!-- 当前城市 -->
    <div class="city-listword">当前城市</div>
    <van-cell>
      <div class="city-nowposiyion">{{citys}}</div>
    </van-cell>
    <!-- 热门城市 -->
    <div class="city-listword">热门城市</div>
    <van-cell>
      <div class="flexbtw">
        <div
          v-for="item in citylist"
          :key="item.id"
          class="city-nowposiyion"
          @click="gotohome(item.name)"
        >{{item.name}}</div>
      </div>
    </van-cell>
    <!-- 排序 -->
    <van-index-bar :index-list="cityNames">
      <div v-for="(item,index1) in citylists" :key="item.id">
        <van-index-anchor :index="index1">{{index1}}</van-index-anchor>
        <van-cell
          v-for="item1 in item"
          :key="item1.id"
          :title="item1.name"
          @click="gotohome(item1.name)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import Vue from "vue";
import city from "../../util/city";
Vue.prototype.city = city;
export default {
  data() {
    return {
      // 搜索框的值
      value: "",
      // 从主页传过来的当前城市名
      citys: "",
      // 城市排名分类依据 ABCD....
      cityNames: [],
      // 城市列表
      citylist: [],
      citylists: "",
      citylisttwo: []
    };
  },
  components: {},
  methods: {
    // 直接返回主页
    backhome() {
      this.$router.push("/");
    },
    // 返回主页 并且传回选择城市名
    gotohome(val) {
      this.$router.push({ name: "home", query: { citiesname: val } });
    }
  },
  mounted() {
    // 从主页传过来的当前城市名
    this.citys = this.$route.query.cityname;

    // console.log(this.area);
    // console.log(this.city);
    //  获取热门城市列表
    this.citylist = city.data.hotCities;
    //  获取全部城市列表
    this.citylists = city.data.cities;
    this.citylisttwo = this.citylists;
    // 获取城市排名依据 ABCD....
    for (let i in this.city.data.cities) {
      this.cityNames.push(i);
    }
  },
  watch: {
    value(val) {
      // this.citylists = this.citylisttwo.filter(item => {
      //   return JSON.stringify(item).includes(val);
      // });
    }
  },

  computed: {}
};
</script>

<style scoped lang='scss'>
// 返回图标定位
.bcakHome {
  position: absolute;
  top: 0;
  left: 0;
}
// 城市类别标题
.city-listword {
  margin: 0 10px;
}
// 当前 + 热门城市书写
.city-nowposiyion {
  width: 100px;
  line-height: 30px;
  text-align: center;
  border: 1px solid rgb(216, 206, 206);
  margin: 3px;
}
// 吸顶
.city-top {
  background: rgb(238, 235, 235);
  z-index: 2;
}
</style>