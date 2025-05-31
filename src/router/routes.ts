import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/ExampleView.vue";
import AccessEnum from "@/access/accessEnum";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: () => import("../views/question/AddQuestionView.vue"),
    // meta: {
    //   access: AccessEnum.ADMIN,
    // },
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Kestrel OJ",
    },
  },
  {
    path: "/hide",
    name: "隐藏页面",
    component: HomeView,
    meta: {
      title: "Kestrel OJ",
      hideInMenu: true,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: () => import("../views/NoAuthView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/AdminView.vue"),
    meta: {
      access: AccessEnum.ADMIN,
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
