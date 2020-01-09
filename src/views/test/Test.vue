<template>
  <div>
    <elastic>
      <div v-for="item in 60" :key="item.id">{{item}}</div>
    </elastic>
  </div>
</template>

<script>
import elastic from "../../components/pullrefush/Pullrefush";
export default {
  data() {
    return {};
  },
  components: {
    elastic
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>