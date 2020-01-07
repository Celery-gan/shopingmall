<template>
  <div>
    <div v-for="item in orderlist" :key="item.id">{{item}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 订单列表
      orderlist: []
    };
  },
  components: {},
  methods: {
  
  },
  mounted() {
    console.log(2);

  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>