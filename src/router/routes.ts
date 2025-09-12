import { RouteRecordRaw } from "vue-router";
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
        meta: {
          title: "登录 - Kestrel OJ",
        },
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
        meta: {
          title: "注册 - Kestrel OJ",
        },
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "主页",
    component: () => import("../views/question/QuestionsView.vue"),
    meta: {
      title: "Kestrel OJ",
    },
  },
  {
    path: "/question_submit",
    name: "题目提交记录",
    component: () => import("../views/question/QuestionsSubmitView.vue"),
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    props: true,
    component: () => import("../views/question/ViewQuestionView.vue"),
    meta: {
      access: AccessEnum.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: () => import("../views/question/AddQuestionView.vue"),
    meta: {
      access: AccessEnum.USER,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: () => import("../views/question/ManageQuestionView.vue"),
    // meta: {
    //   access: AccessEnum.ADMIN,
    // },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: () => import("../views/question/AddQuestionView.vue"),
    meta: {
      title: "Kestrel OJ",
      access: AccessEnum.USER,
      hideInMenu: true,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: () => import("../views/NoAuthView.vue"),
    meta: {
      hideInMenu: true,
    },
  },
];
