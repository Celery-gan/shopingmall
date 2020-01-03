<template>
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <div>编辑地址</div>
    </mytop>
    <van-address-edit
      :address-info="list"
      :area-list="area"
      show-delete
      show-set-default
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import Vue from "vue";
import area from "../../util/area";
Vue.prototype.area = area;
export default {
  data() {
    return {
      list: {}
    };
  },
  methods: {
    // 保存信息
    onSave(content) {
      // 如果传了id过来 就进行修改
      if (this.list._id !== "") {
        this.list = content;
        let obj = {
          name: this.list.name,
          tel: this.list.tel,
          // address: '',
          isDefault: this.list.isDefault,
          province: this.list.province,
          city: this.list.city,
          county: this.list.county,
          addressDetail: this.list.addressDetail,
          areaCode: this.list.areaCode,
          id: this.list._id
        };
        console.log(obj);
        this.$api
          .postAddress(this.list)
          .then(res => {
            console.log(res);
            this.$toast("修改成功");
            history.back();
            // 如果设置了默认选中，就使其默认
            if (content.isDefault === true) {
              this.$api
                .setDefaultAddress(this.list._id)
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      // 如果没有参数 就进行添加
      else {
        this.list = content;
        this.$api
          .postAddress(this.list)
          .then(res => {
            this.$toast("添加成功");
            history.back();
          })
          .catch(err => {
            console.log(err);
          });
        // 如果设置了默认选中，就使其默认
        if (content.isDefault === true) {
          this.$api
            .setDefaultAddress(this.list._id)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    // 删除信息
    onDelete() {
      // 如果传了id过来 才能删除
      if (this.list._id !== "") {
        this.$api
          .deleteAddress(this.list._id)
          .then(res => {
            this.$toast("删除成功");
            history.back();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    bcakbefore() {
      history.back();
    },
   
  },
  mounted() {
    if (this.$route.query.addinfo) {
      this.list = this.$route.query.addinfo;
      // console.log(this.list);
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
</style>