<template>
  <div style="padding:20px">
    <el-form :model="form" label-width="120">
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          placeholder="请输入密码"
          type="password"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$http.post("api/permission/getMenu", this.form).then(res => {
        res = res.data;
        console.log(res);
        if (res.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);

          this.$store.commit("setToken", res.data.token);

          // 动态路由触发时机1，成功登录
          this.$store.commit("addMenu", this.$router);

          // 通过name跳转到home页面
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  width: 50%;
  height: 450px;
  margin: auto;
  padding: 45px;
  background-color: #fff;
}
</style>
