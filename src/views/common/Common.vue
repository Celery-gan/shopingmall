<template>
  <div>
    <div>1</div>
    <div>2</div>
    <div>
      <backtop>
        <router-view></router-view>
      </backtop>
    </div>
    <div>3</div>
  </div>
</template>

<script>
import backtop from "../../components/Backtop";
export default {
  data() {
    return {};
  },
  components: {
    backtop
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.flexbtw {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap；;
}
.flexeve {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap；;
}
</style>