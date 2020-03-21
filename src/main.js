import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 全局配置，引入scss样式
import "@/assets/scss/reset.scss";
import "element-ui/lib/theme-chalk/index.css";
import http from "@/api/config";
import "./mock";

// 第三方包
import ElementUI from "element-ui";

Vue.use(ElementUI);
Vue.prototype.$http = http; //  挂载到Vue原型上

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // 防止刷新后vuex里丢失token
  store.commit("getToken");
  // 防止刷新后vuex里丢失标签列表tagList
  store.commit("getMenu");
  let token = store.state.user.token;
  // 过滤登录页面，防止死循环
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),

  // 动态路由触发时机2：页面刷新
  created() {
    store.commit("addMenu", router);
  }
}).$mount("#app");
