<template>
  <div>
    <mytop>
      <van-nav-bar title="标题" left-text="返回" left-arrow></van-nav-bar>
    </mytop>
    <div>
      <!-- 顶部 -->
      <div>
        <van-tabs>
          <van-tab
            v-for="item in categorys[activeKey].bxMallSubDto"
            :title="item.mallSubName "
            :key="item.id"
          ></van-tab>
        </van-tabs>
      </div>
      <!-- 侧边 -->
      <div>
        <van-sidebar v-model="activeKey">
          <div v-for="item in categorys" :key="item.id">
            <van-sidebar-item :title="item.mallCategoryName">1</van-sidebar-item>
          </div>
        </van-sidebar>
      </div>

      <!-- 主体内容 -->
      <div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      active: 1,
      activeName: "a",
      categorys: []
    };
  },
  components: {},
  methods: {
    getREecommend() {
      this.$api
        .recommend()
        .then(res => {
          this.categorys = res.data.category;
          console.log(this.categorys);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getREecommend();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>