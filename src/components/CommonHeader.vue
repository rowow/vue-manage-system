<template>
  <header>
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="changeCollapseMenu"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="userImg" class="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown" size="small">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      current: state => state.menu.currentMenu
    })
  },
  data() {
    return {
      userImg: require("@/assets/images/user.png")
    };
  },
  methods: {
    changeCollapseMenu() {
      this.$store.commit("changeCollapseMenu");
    }
  }
};
</script>

<style scoped lang="scss">
header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .userImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>

<style lang="scss">
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #666;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #fff;
}
</style>
