<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header"> 用户布局</a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/Towerrrr" target="_blank"
          >GitHub 个人主页</a
        ></a-layout-footer
      >
    </a-layout>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
#userLayout {
}

#userLayout .header {
  margin-bottom: 16px;
  box-shadow: 1px 1px 5px #eee;
}

#userLayout .content {
  background: linear-gradient(to right, #bbb, #fff);
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  background: #efefef;
  padding: 14px;
  position: sticky;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
}
</style>
