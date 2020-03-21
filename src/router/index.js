import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/Home/Home")
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/VideoPage/VideoPage")
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/UserPage/UserPage")
      },
      {
        path: "/page1",
        name: "page1",
        component: () => import("@/views/Other/OtherPage1")
      },
      {
        path: "/page2",
        name: "page2",
        component: () => import("@/views/Other/OtherPage2")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Login")
  }
];

const router = new VueRouter({
  routes
});

export default router;
