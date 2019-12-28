<template>
  <div>
    <!-- 分页 -->
    <!-- @size-change事件 pageSize(每页显示条目个数，支持.sync修饰符) 改变时会触发 -->
    <!-- @current-change事件 currentPage(当前页数，支持.sync修饰符) 改变时会触发 -->
    <!-- :page-sizes="[10, 20, 30, 40]" 每页显示数量选择（10条/页 20条/页 30条/页 40条/页） -->
    <!-- :page-size="10" 当前每页显示条数 -->
    <!-- layout 组件布局，子组件名用逗号分隔 -->
    <!-- :total="list.length" 总条数 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tabform.length"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tabform: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 分页 相关数据
      currentPage: 1,
      pagesize: 10
    };
  },
  components: {},
  methods: {
    handleSizeChange(pagesize) {
      //@size-change事件
      this.pagesize = pagesize;
      this.$emit("pagesize", this.pagesize);
    },
    handleCurrentChange(currentPage) {
      //@current-change事件
      this.currentPage = currentPage;
      this.$emit("currentPage", this.currentPage);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>