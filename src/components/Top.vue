<template>
  <div>
    <div class="headers">
      <slot>this is a top</slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style lang='scss'>
.headers {
  width: 100%;
  line-height: 35px;
  text-align: center;
  border-bottom: 1px solid rgb(255, 235, 235);
}
</style>