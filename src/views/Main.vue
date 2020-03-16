<template>
  <el-container style="height:100%;">
    <el-aside width="auto"><CommonAside /></el-aside>
    <el-container>
      <el-header><CommonHeader /></el-header>
      <CommonTag />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "@/components/CommonHeader.vue";
import CommonAside from "@/components/CommonAside.vue";
import CommonTag from "@/components/CommonTag.vue";
export default {
  components: {
    CommonHeader,
    CommonAside,
    CommonTag
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: black;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-main {
  padding-top: 0;
}
</style>
