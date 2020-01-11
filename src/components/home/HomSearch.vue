<template>
  <div class="search-bg">
    <!-- 搜索框 + 取消搜索按钮 -->
    <form action="/">
      <!-- 搜索框通过watch来判断是否有商品 取消按钮使页面恢复到正常首页 -->
      <van-search v-model="inputs" placeholder="请输入搜索关键词" show-action @cancel="onCancel" />
    </form>

    <!-- 如果输入框为空 显示搜索历史-->
    <div v-if="inputs === ''">
      <div>
        <div class="flexbtw search-His">
          <div>搜索历史</div>
          <div v-if="SearchHistory.length >= 1" @click="delHistory">删除历史</div>
        </div>
        <van-cell v-if="SearchHistory.length < 1">暂无历史记录</van-cell>
        <div v-else class="history">
          <div v-for="item in SearchHistory" :key="item.id" @click="searchAgain(item)">{{item}}</div>
        </div>
        <!-- <van-cell
          v-else
          v-for="item in SearchHistory"
          :key="item.id"
          @click="searchAgain(item)"
        >{{item}}</van-cell>-->
      </div>
    </div>
    <!-- 如果搜索出来没有商品 提示没有商品 -->
    <div v-else-if="searchlist.length < 1">
      <van-cell>非常抱歉，该商品不存在，请重新输入关键词</van-cell>
    </div>
    <!-- 如果搜索出了商品  -->
    <div v-else>
      <!-- 循环显示商品信息 -->
      <van-cell v-for="item in searchlist" :key="item.id" @click="gotos(item.id)">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputs: "",
      // 搜索结果列表
      searchlist: [],
      // 搜索历史
      SearchHistory: []
    };
  },
  components: {},
  methods: {
    // 根据输入框输入内容获取对应的商品列表
    getsearch() {
      setTimeout(() => {
        this.$api
          .search(this.inputs)
          .then(res => {
            // 获得搜索列表
            this.searchlist = res.data.list;
            // 将搜索列表中关键字高亮设置
            this.searchlist.map(
              item => (item.name = this.$utils.keyWord(item.name, this.inputs))
            );
          })
          .catch(err => {
            console.log(err);
          });
      }, 300);
    },
    // 删除搜索历史
    delHistory() {
      this.$dialog
        .confirm({
          title: "确认删除搜索历史吗？"
        })
        .then(() => {
          this.SearchHistory = [];
          localStorage.removeItem("SearchHistory");
        })
        .catch(() => {});
    },
    // 点击搜索历史的词语进行重新搜索
    searchAgain(val) {
      this.inputs = val;
    },
    // 点击搜索出来的商品 前往商品详情页
    gotos(val) {
      // 将搜索词存入搜索历史列表

      if (
        this.SearchHistory.every(item => item !== this.inputs) ||
        this.SearchHistory.length < 1
      ) {
        this.SearchHistory.push(this.inputs);
      }
      // 将搜索历史列表存在本地
      localStorage.setItem("SearchHistory", this.SearchHistory);
      this.$router.push({
        name: "detail",
        query: {
          ids: val
        }
      });
    },
    // 取消搜索 返回正常首页
    onCancel() {
      this.nu1 = -1;
      this.$emit("send", this.nu1);
    }
  },
  mounted() {
    // 如果有搜索历史
    if (localStorage.getItem("SearchHistory")) {
      // 获取搜索历史
      let str = localStorage.getItem("SearchHistory");
      // 将搜索历史对应的词语赋值给当前搜索历史显示出来
      this.SearchHistory = str.split(",");
    }
  },
  watch: {
    inputs(val) {
      if (this.inputs.trim() !== "") {
        this.getsearch();
      }
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
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
.history {
  background: rgb(255, 255, 255);
  color: rgb(23, 119, 87);
  display: flex;
  padding: 5px 10px;
  text-align: center;
  flex-wrap: wrap;
  div {
    width: 95px;
    border: 1px solid rgb(223, 221, 221);
    margin: 5px 10px;
  }
}
</style>