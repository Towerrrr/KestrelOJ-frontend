<template>
  <a-row align="center" id="globalHeader" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img src="@/assets/logo.png" alt="" class="logo" />
            <div class="title">Kestrel OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-dropdown
      trigger="click"
      placement="bottom-end"
      :popup-visible="dropdownVisible"
      @popup-visible-change="onDropdownVisibleChange"
    >
      <div class="user-info" @click.stop="toggleDropdown">
        <img src="@/assets/logoUser.png" alt="" class="logo" />
        <div class="user-name">
          {{ store.state.user?.loginUser?.userName ?? "？？？" }}
        </div>
      </div>

      <template #content>
        <a-doption @click="handleUserMenuClick('editNickname')">
          <span>修改昵称</span>
        </a-doption>
        <a-doption @click="handleUserMenuClick('switchAccount')">
          <span>切换账号</span>
        </a-doption>
        <a-doption @click="handleUserMenuClick('logout')">
          <span>注销账号</span>
        </a-doption>
      </template>
    </a-dropdown>
  </a-row>
</template>

<script lang="ts" setup>
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

const router = useRouter();
const store = useStore();

const dropdownVisible = ref(false);

//展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    //根据权限过滤菜单
    if (!checkAccess(store.state.user.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  });
});
// const visibleRoutes = routes.filter((item, index) => {
//   if (item.meta?.hideInMenu) {
//     return false;
//   }
//   //根据权限过滤菜单
//   if (!checkAccess(store.state.user.loginUser, item.meta?.access as string)) {
//     return false;
//   }
//   return true;
// });

//默认主页
const selectedKeys = ref(["/"]);
//路由跳转后，更新激活项
router.afterEach((to, from, next) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
console.log(store.state.user);
setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "管理员",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const onDropdownVisibleChange = (visible: boolean) => {
  dropdownVisible.value = visible;
};

const handleUserMenuClick = (key: string) => {
  dropdownVisible.value = false; // 点击后关闭下拉菜单

  switch (key) {
    case "editNickname":
      // todo 修改昵称
      console.log("修改昵称");
      break;
    case "switchAccount":
      router.push("/user/login");
      break;
    case "logout":
      // todo 注销账号
      console.log("注销账号");
      break;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
.user-name {
  padding: 0 12px;
}
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin-right: 30px;
}

.user-info:hover {
  background-color: #f0f0f0;
}
</style>
