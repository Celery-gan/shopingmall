<template>
  <!-- 用户信息 -->
  <div>
    <mytop>
      <img src="../../assets/toback.svg" @click="bcakbefore" class="bcakHome" />
      <van-nav-bar title="我的资料"></van-nav-bar>
    </mytop>
    <div>
      <van-cell-group>
        <!-- <van-uploader :max-count="2"></van-uploader> -->
        <van-cell value="内容" is-link class="user-avatarbox">
          <img :src="userinfo.avatar" class="user-avatar" />
          <template slot="title">
            <span class="custom-title">头像</span>
          </template>
        </van-cell>

        <!-- 用户名 不可更改 -->
        <van-field v-model="userinfo.username" disabled clearable label="用户名" />
        <!-- 昵称 -->
        <van-field v-model="userinfo.nickname" clearable label="昵称" />
        <!-- 性别 弹出选择器  -->
        <van-field v-model="userinfo.gender" clearable label="性别" @click="showgenders" />
        <!-- 邮箱 -->
        <van-field v-model="userinfo.email" type="email" label="邮箱" placeholder="请输入邮箱" />
        <!-- 出生年月 -->
        <van-cell v-model="Birthday" title="出生年月" @click="showPopup" />
        <!-- <van-field v-model="Birthday" label="出生年月" @click="showPopup" /> -->
        <!-- 保存按钮 -->
        <van-button type="primary" block class="user-btn" @click="conserve">保存</van-button>
        <!-- 取消按钮 -->
        <van-button type="default" block class="user-btn" @click="bcakbefore">取消</van-button>
      </van-cell-group>
      <!-- 弹出框 日期选择 -->
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker
          v-model="usebrirthday"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="suredate"
        />
      </van-popup>
      <!-- 弹出框 性别选择 -->
      <van-popup v-model="showgender" position="center" :style="{ height: '14%' }">
        <van-cell title="男" @click="changegender('男')"></van-cell>
        <van-cell title="女" @click="changegender('女')"></van-cell>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 地区集合
      areaList: {},
      userinfo: {
        // 用户id
        _id: "",
        // 用户名
        username: "",
        // 昵称
        nickname: "",
        // 邮箱
        email: "",
        // 性别
        gender: "",
        // 出生年
        year: "",
        // 出生月
        month: "",
        // 出生日
        day: "",
        // 用户头像：
        avatar: ""
      },
      // 最小可选择日期
      minDate: new Date(2000, 0, 1),
      // 最大日期为当前日期
      maxDate: new Date(),
      // 页面显示的年月日
      Birthday: "",
      // 日期选择默认不弹框
      show: false,
      // 日期选择器选择出来的日期
      usebrirthday: "",
      //
      showgender: false
    };
  },
  components: {},
  methods: {
    // 返回上一个页面
    bcakbefore() {
      this.$dialog
        .confirm({
          title: "确认取消修改个人信息吗？"
        })
        .then(() => {
          history.back();
        })
        .catch(() => {});
    },
    // 获取用户信息
    getuserinfo() {
      this.$api
        .user({})
        .then(res => {
          this.userinfo = res.userInfo;
          // 将 年 月 日 拼接为 出生年月
          this.Birthday = `${this.userinfo.year}年${this.userinfo.month}月${this.userinfo.day}日`;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 性别选择弹出框弹出
    showgenders() {
      this.showgender = true;
    },
    // 改变性别
    changegender(val) {
      this.userinfo.gender = val;
      this.showgender = false;
    },
    // 日期选择弹出框弹出
    showPopup() {
      this.show = true;
    },
    // 确认日期
    suredate() {
      // 将日期选择器选择出来的日期转化为年月日模式 标签赋值给页面显示的日期
      this.Birthday = this.$dayjs(this.usebrirthday).format("YYYY年MM月DD日");
      // 获得日期选择器选择出来的 年
      this.userinfo.year = this.$dayjs(this.usebrirthday).format("YYYY");
      // 获得日期选择器选择出来的 月
      this.userinfo.month = this.$dayjs(this.usebrirthday).format("MM");
      // 获得日期选择器选择出来的 日
      this.userinfo.day = this.$dayjs(this.usebrirthday).format("DD");
      // 关闭弹框
      this.show = false;
    },
    // 保存用户信息
    conserve() {
      // * saveUser 修改保存用户信息(gender,email,year,month,day,id,nickname)
      let obj = {
        id: this.userinfo._id,
        nickname: this.userinfo.nickname,
        gender: this.userinfo.gender,
        email: this.userinfo.email,
        year: this.userinfo.year,
        month: this.userinfo.month,
        day: this.userinfo.day
      };
      this.$api
        .saveUser(obj)
        .then(res => {
          // 弹框提示成功
          this.$toast.success(res.msg);
          // 本地存储姓名更改
          localStorage.setItem("nickname", this.userinfo.nickname);
          // 回到个人页面
          history.back();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getuserinfo();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
// 返回按钮样式
.bcakHome {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
.user-avatar {
  width: 80px;
}
.user-avatarbox {
  align-items: center;
}
.user-btn {
  width: 88%;
  margin: 10px auto;
}
</style>