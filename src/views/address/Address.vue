<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <div>地址列表</div>
    </mytop>
    <div v-if="nickname !== ''">
      <div v-if="this.addresslist.length < 1">
        <div class="address-none">暂无收货数据~~</div>
        <van-address-list @add="onAdd" />
      </div>

      <div v-else>
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @click-item="choose"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: "",
      chosenAddressId: "",
      addresslist: [],
      list: []
    };
  },
  components: {},
  methods: {
    bcakbefore() {
      history.back();
    },
    // 添加地址
    onAdd() {
      this.$router.push("/addressedit");
    },
    // 编辑地址
    onEdit(item, index) {
      // console.log(item.id);
      let addinfos = this.addresslist.filter(item1 => {
        return item1._id === item.id;
      });

      this.$router.push({
        name: "addressedit",
        query: { addinfo: addinfos[0] }
      });
    },
    getAddress() {
      this.$api
        .getAddress(this.ids)
        .then(res => {
          this.addresslist = res.address;
          // console.log(this.addresslist);
          this.addresslist.map(item => {
            if (item.isDefault === true) {
              this.chosenAddressId = item._id;
            }
            let obj = {};
            obj = {
              name: item.name,
              address: `${item.province}${item.city}${item.county}${item.addressDetail}`,
              id: item._id,
              tel: item.tel,
              isDefault: item.isDefault
            };
            this.list.push(obj);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择地址
    choose(item) {
      this.chosenAddressId = item.id;
    }
  },
  mounted() {
    this.getAddress();
    if (localStorage.getItem("nickname")) {
      this.nickname = localStorage.getItem("nickname");
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.bcakHome {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
.address-none {
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  color: rgb(202, 202, 202);
}
</style>