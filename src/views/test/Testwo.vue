<template>
  <div id="home">
    <!-- 搜索框 + 取消搜索按钮 -->

    <van-search v-model="inputs" placeholder="请输入搜索关键词" show-action />

    <Better-scroll
      class="content"
      :probeType="3"
      :pullUpLoad="true"
      :pullDownRefresh="true"
      ref="scroll"
      @scroll="scroll"
      @pullingUp="loadmore"
      @pullingDown="loadup"
    >
      <div class="search-bg">
        <!-- 如果搜索出来没有商品 提示没有商品 -->
        <div v-if="searchlist.length < 1 && inputs !== ''">
          <van-cell>非常抱歉，该商品不存在，请重新输入关键词</van-cell>
        </div>
        <!-- 如果搜索出了商品  -->
        <div v-else>
          <!-- 循环显示商品信息 -->
          <van-cell v-for="item in searchlist" :key="item.id">
            <div class="mysearch-list">
              <img :src="item.image" class="search-img" />
              <div v-html="item.name" class="goods-name"></div>
            </div>
          </van-cell>
        </div>
      </div>
      <!-- 需要滚动的组件（可放入多个） -->
    </Better-scroll>
    <!-- vue @click.native 原生点击事件：
      给vue组件绑定事件时候，必须加上native ，不然不会生效（监听根元素的原生事件，使用 .native 修饰符）
      等同于在自组件中：
      子组件内部处理click事件然后向外发送click事件：$emit("click".fn)-->
    <Back-top @click.native="backclick" v-show="backtop"></Back-top>
  </div>
</template>

<script>
import BetterScroll from "../../components/better-scroll/BetterScroll";
import BackTop from ".././../components/better-scroll/Backtop";
export default {
  data() {
    return {
      //默认隐藏
      backtop: false,
      inputs: "",
      // 搜索结果列表
      searchlist: [],
      flag: 1,
      maxpage: 1
    };
  },
  components: { BetterScroll, BackTop },
  methods: {
    //  1.返回顶部的实现 当y滚动到300的时候，就将this.backtop为true
    scroll(position) {
      //position.y是scroll中实时监听的y坐标；（为负值）
      this.backtop = -position.y > 200;
    },
    // 返回顶部的位置 动画时间
    backclick() {
      // this.$refs.scroll选中scroll组件来使用里面的scrollTo方法  (x坐标，y坐标，时间)
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    },
    //1.当滚到底部后，请求下一页的商品数据
    loadmore() {
      console.log(this.maxpage, "max");
      console.log(this.flag);
      if (this.flag === this.maxpage) {
        this.$toast.fail("已经到最后一条数据了");
        this.$refs.scroll.scroll.finishPullUp();
      } else {
        this.flag++;
        // console.log(this.flag);
        this.getsearch();
        // 当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
        this.$refs.scroll.scroll.finishPullUp();
      }
    },
    //1.下拉 请求上一页的商品数据
    loadup() {
      console.log(this.maxpage, "max");
      console.log(this.flag);
      if (this.flag === 1) {
        this.$toast.fail("已经到第一条数据了");
        // 当下拉刷新数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
        this.$refs.scroll.scroll.finishPullDown();
      } else {
        this.flag--;
        // console.log(this.flag);
        this.getsearch();
        this.$refs.scroll.scroll.finishPullDown();
      }
    },
    getsearch() {
      // console.log(this.flag);
      setTimeout(() => {
        this.$api
          .search(this.inputs, this.flag)
          .then(res => {
            this.maxpage = Math.ceil(res.data.count / 20);
            this.searchlist = res.data.list;
          })
          .catch(err => {
            console.log(err);
          });
      }, 300);
    }
  },
  mounted() {},
  watch: {
    inputs(val, oldval) {
      if (val !== oldval) {
        this.flag = 1;
      }
      if (this.inputs.trim() !== "") {
        this.getsearch();
      }
    }
  },
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
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

// 搜索页 页面样式
.search-bg {
  background: rgb(241, 241, 241);
  font-size: 16px;
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
</style>