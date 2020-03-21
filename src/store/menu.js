import Cookie from "js-cookie";
export default {
  state: {
    currentMenu: null,
    isCollapse: false,
    menu: [],
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
    setMenu(state, val) {
      state.menu = val;
      // 使用cookie存放请求的菜单，注：cookie.set(参数1,参数2):参数1需要填入字符串，参数2需要解析格式存入
      Cookie.set("menu", JSON.stringify(val));
      console.log("vuex:", val);
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
    },

    addMenu(state, router) {
      if (!Cookie.get("menu")) return;
      let menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu; // 将cookie中的menu赋值给vuex中的menu：避免刷新被丢失

      // 定义生成当前的路由
      let currentMenu = [
        {
          path: "/",
          component: () => import(`@/views/Main`),
          children: []
        }
      ];

      // 遍历判断有无children(子路由页面),设置其路由
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(val => {
            val.component = () => import(`@/views/${val.url}`);
            return val;
          });
          // item.children是一个数组，需要展开
          currentMenu[0].children.push(...item.children);
        } else {
          item.component = () => import(`@/views/${item.url}`);
          currentMenu[0].children.push(item);
        }
      });
      console.log("cur:", currentMenu);
      // 添加动态路由
      router.addRoutes(currentMenu);
    },

    selectMenu(state, item) {
      // 判断item.name是否为home,将选中的item内容传给当前的menu
      if (item.name !== "home") {
        state.currentMenu = item;
        // 判断添加到tagList数组的标签是否重复,-1表示没有重复
        let result = state.tagList.findIndex(val => val.name === item.name);
        result === -1 ? state.tagList.push(item) : "";
        Cookie.set("tagList", JSON.stringify(state.tagList));
      } else {
        state.currentMenu = null;
      }
    },
    getMenu(state) {
      if (Cookie.get("tagList")) {
        console.log("haha");
        let tagList = JSON.parse(Cookie.get("tagList"));
        state.tagList = tagList;
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
