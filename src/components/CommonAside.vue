<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <el-menu-item
      :index="item.path"
      v-for="item in noAsideChildrenData"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu index="1" v-for="(item, i) in hasAsideChildrenData" :key="i">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(subItem, subIndex) in item.children"
        :key="subIndex"
      >
        <template slot="title"></template>
        <el-menu-item :index="subItem.path" @click="clickMenu(subItem)"
          >{{ subItem.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    //   判断有没有子集children的数据
    noAsideChildrenData() {
      return this.asideMenuData.filter(item => !item.children);
    },
    hasAsideChildrenData() {
      return this.asideMenuData.filter(item => item.children);
    },
    isCollapse() {
      return this.$store.state.menu.isCollapse;
    }
  },
  methods: {
    clickMenu(item) {
      this.$router.push(item);
      this.$store.commit("selectMenu", item);
    }
  },
  data() {
    return {
      asideMenuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home"
        },
        {
          path: "/video",
          name: "video",
          label: "视频管理",
          icon: "video-play"
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user"
        },
        {
          path: "/other",
          label: "其他",
          icon: "menu",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "子页面1",
              icon: "flag"
            },
            {
              path: "/page2",
              name: "page2",
              label: "子页面2",
              icon: "flag"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.el-menu {
  height: 100%;
  border: none;
}
</style>
