<template>
  <div class="tags">
    <!-- 动态closable设置首页不能关闭 -->
    <el-tag
      :key="tag.name"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      size="small"
      @click="changeMenuTag(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      // 获取标签列表数组
      tags: state => state.menu.tagList
    })
  },
  methods: {
    //   获取vuex中的关闭tag的方法
    ...mapMutations(["closeTag"]),
    handleClose(tag) {
      this.closeTag(tag);
      // 删除后将路由通过name跳转到home页面
      this.$router.push({ name: "home" });
    },

    changeMenuTag(item) {
      this.$router.push({ name: item.name });
      // this.$store.commit("selectMenu", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.tags {
  .el-tag {
    margin: 10px;
    cursor: pointer;
  }
}
</style>
