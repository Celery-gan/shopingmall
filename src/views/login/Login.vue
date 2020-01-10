<template>
  <div class="login-bg flexeve">
    <div>
      <img
        src="../../assets/toback.svg"
        alt="xxx"
        title="鼠标悬停提示"
        @click="backhome"
        class="bcakHome"
      />

      <van-cell-group class="login-card">
        <van-cell title="登录/注册" class="login-title" />
        <!-- 用户名 -->
        <van-field
          v-model="nickname"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('question')"
        />
        <!-- 密码 -->
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
        <!-- 手机号 -->
        <van-field v-model="phone" type="tel" label="手机号" placeholder="仅注册需要" required />
        <!-- 短信验证码 -->
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="仅注册需要">
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
        <div class="codes">
          <van-field
            v-model="verify"
            center
            clearable
            label="验证码"
            placeholder="请输入验证码"
            class="code1"
          />
          <div v-html="code" class="code2" @click="getAverifys"></div>
        </div>
        <div class="login-btns">
          <van-button @click="logins" class="login-btn" type="primary">登录</van-button>
          <van-button @click="regists" class="login-btn" type="warning">注册</van-button>
        </div>
      </van-cell-group>
      <!-- <van-cell title="单元格" value="内容" label="描述信息" /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户名
      nickname: "",
      // 密码
      password: "",
      // 手机号
      phone: "",
      // 短信验证码
      sms: "",
      // 验证码
      verify: "",
      // 获取随机验证码的图片
      code: ""
    };
  },
  components: {},
  methods: {
    // 获取随机验证码
    getAverifys() {
      this.$api
        .getAverify()
        .then(res => {
          this.code = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 登录
    logins() {
      this.$api
        .login(this.nickname, this.password, this.verify)
        .then(res => {
          if (res.code === 200) {
            localStorage.setItem("nickname", this.nickname);
            this.$toast.success(res.msg);
            this.$router.push("/");
          } else {
            this.$toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 注册
    regists() {
      this.$api
        .register(this.nickname, this.password, this.verify)
        .then(res => {
          if (res.code === 200) {
            localStorage.setItem("nickname", this.nickname);
            this.$toast.success(res.msg);
            this.$router.push("/");
          } else {
            this.$toast(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    backhome() {
      this.$router.push("/");
    }
  },
  mounted() {
    this.getAverifys();
  },
  watch: {},

  computed: {}
};
</script>

<style scoped lang='scss'>
.login-bg {
  height: 667px;
  background: url("../../assets/login.jpg");
  background-size: 110%;
}
.login-card {
  width: 333px;
}
.login-title {
  font-size: 20px;
}
.codes {
  width: 333px;
  display: flex;
}
.code1 {
  flex: 2;
}
.code2 {
  flex: 1;
  height: 35px;
  padding: 5px;
}
.login-btns {
  width: 333px;
  padding: 10px;
}
.login-btn {
  width: 100px;
  margin-right: 10px;
}
.bcakHome {
  position: absolute;
  top: 0;
  left: 0;
}
</style>