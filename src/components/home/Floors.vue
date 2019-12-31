<template>
  <div>
    <!-- 1楼 -->
    <div>
      <div class="floor-title">
        <div class="floor-info">1f</div>
        <div>{{floorNames.floor1}}</div>
      </div>
      <div
        v-for="(item,index) in flinfo1"
        :key="item.id"
        :class="[index===0?'floor-flinfo2':'floor-flinfo']"
        @click="gotos(item.goodsId)"
      >
        <img :src="item.image" class="floor-img" />
      </div>
    </div>
    <!-- 2楼 -->
    <div>
      <div class="floor-title">
        <div class="floor-info">2f</div>
        <div>{{floorNames.floor2}}</div>
      </div>
      <div
        v-for="(item,index) in flinfo2"
        :key="item.id"
        :class="[index===0?'floor-flinfo2':'floor-flinfo']"
        @click="gotos(item.goodsId)"
      >
        <img :src="item.image" class="floor-img" />
        <div></div>
      </div>
    </div>
    <!-- 3楼 -->
    <div>
      <div class="floor-title">
        <div class="floor-info">3f</div>
        <div>{{floorNames.floor3}}</div>
      </div>
      <div
        v-for="(item,index) in flinfo3"
        :key="item.id"
        :class="[index===0?'floor-flinfo2':'floor-flinfo']"
        @click="gotos(item.goodsId)"
      >
        <img :src="item.image" class="floor-img" />
      </div>
    </div>
    <!-- 热销产品 -->
    <div class="hotgood-title">热销产品</div>
    <div class="flexbtw">
      <div v-for="item in hotgood" :key="item.id" class="hotgood-box" @click="gotos(item.goodsId)">
        <div>
          <img :src="item.image" class="hotgood-img" />
        </div>
        <div class="hotgood-name">{{item.name}}</div>
        <div class="hotgood-prices">
          <span class="hotgood-price">￥{{item.mallPrice}}</span>
          <span class="hotgood-oldprice">￥{{item.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    floorNames: {
      type: Object,
      default: ""
    },
    flinfo1: {
      type: Array,
      default: () => []
    },
    flinfo2: {
      type: Array,
      default: () => []
    },
    flinfo3: {
      type: Array,
      default: () => []
    },
    hotgood: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
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
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.floor-title {
  display: flex;
  justify-content: center;
  text-align: center;
  color: red;
  width: 370px;
}
.floor-info {
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  color: #fff;
  background: red;
  margin: auto 5px;
}
.floor-flinfo {
  width: 50%;
  float: left;
  height: 97px;
}
.floor-flinfo2 {
  width: 50%;
  float: left;
  height: 194px;
}
.floor-img {
  width: 100%;
  height: 100%;
  border: 1px soli gray;
}

.hotgood-box {
  width: 183px;
  margin: 2px;
  background: rgb(255, 255, 255);
}
.hotgood-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  color: red;
}
.hotgood-title {
  width: 370px;
  text-align: center;
  margin: 3px;
  color: red;
}
.hotgood-img {
  width: 183px;
}
.hotgood-prices {
  font-size: 12px;
  // padding-left: 5px;
  line-height: 24px;
  display: flex;
  justify-content: center;
  text-align: center;
}
// 推荐商品的价格
.hotgood-price {
  // font-size: 12px;
  padding-left: 5px;
  // line-height: 24px;
  color: red;
}
// 推荐商品的原价
.hotgood-oldprice {
  // font-size: 12px;
  padding-left: 5px;
  // line-height: 24px;
  color: gray;
  text-decoration: line-through;
}
</style>