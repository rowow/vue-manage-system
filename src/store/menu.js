export default {
  state: {
    currentMenu: null,
    isCollapse: false,
    tagList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home"
      }
    ]
  },
  mutations: {
    selectMenu(state, item) {
      // 判断item.name是否为home,将选中的item内容传给当前的menu
      if (item.name !== "home") {
        state.currentMenu = item;
        // 判断添加到tagList数组的标签是否重复,-1表示没有重复
        let result = state.tagList.findIndex(val => val.name === item.name);
        result === -1 ? state.tagList.push(item) : "";
      } else {
        state.currentMenu = null;
      }
    },
    closeTag(state, item) {
      let result = state.tagList.findIndex(val => val.name === item.name); // 获取索引
      state.tagList.splice(result, 1); // 删除该索引标签
    },
    changeCollapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {}
};
