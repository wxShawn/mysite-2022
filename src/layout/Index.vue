<template>
  <div class="bg-slate-50">

    <header class="fixed top-0 w-full bg-white shadow-sm z-50">
      <div class="lg:container px-5 flex justify-between items-center h-20">
        <!-- brand -->
        <div class="text-purple-700">
          <img class="h-10 md:h-12 lg:h-14 cursor-pointer select-none" src="../assets/mylogo1.png" alt="logo" @click="handleNavClick('home')">
        </div>
        <!-- sm屏幕上的导航条的开关 -->
        <button
          class="md:hidden flex items-center text-2xl text-purple-500"
          @click="showSmNav = !showSmNav"
        >
          <icon><menu-outlined /></icon>
        </button>
        <!-- 大屏幕上的导航条  -->
        <nav class="hidden md:flex gap-x-2">
          <div
            class="px-3 py-1.5 flex items-center rounded text-purple-500 hover:bg-purple-100 cursor-pointer"
            :class="{ 'bg-purple-100 text-purple-500': selectedKey === navItem.key }"
            @click="handleNavClick(navItem.key)"
            v-for="navItem in navItemList"
            :key="navItem"
          >{{ navItem.name }}</div>
        </nav>

      </div>
    </header>
    <!-- sm屏幕上的导航条 -->
    <nav
      class="z-40 fixed flex md:hidden flex-col w-full bg-white shadow-md transition-transform"
      :class="{ 'translate-y-20': showSmNav, '-translate-y-10': !showSmNav }"
    >
      <div
        class="px-3 py-1.5 flex items-center rounded text-purple-500 hover:bg-purple-100 cursor-pointer"
        :class="{ 'bg-purple-100 text-purple-500': selectedKey === navItem.key }"
        @click="handleNavClick(navItem.key)"
        v-for="navItem in navItemList"
        :key="navItem"
      >{{ navItem.name }}</div>
    </nav>

    <!-- main content -->
    <div class="lg:container pt-20 pb-40 px-5 min-h-screen">
      <router-view></router-view>
    </div>

    <!-- footer -->
    <footer class="-mt-40 flex flex-col gap-3 justify-center items-center h-40 bg-white select-none">
      <img class="w-52" src="../assets/mylogo1.png" alt="logo">
      <ul class="flex gap-5">
        <li class="text-purple-400 hover:text-purple-500 text-3xl cursor-pointer">
          <a target="_blank" href="https://github.com/wxShawn"><icon><github-filled /></icon></a>
        </li>
        <li class="text-purple-400 hover:text-purple-500 text-3xl cursor-pointer">
          <a target="_blank" href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=ZRIdFg0EEgslAwodCAQMCUsGCgg"><icon><mail-outlined /></icon></a>
        </li>
      </ul>
    </footer>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MenuOutlined, GithubFilled, MailOutlined } from '@vicons/antd';
import { Icon } from '@vicons/utils';
import router from '../router';

/**
 * ********** nav **********
 */
const navItemList = [
  { name: 'Home', key: 'home' },
  { name: 'Blog', key: 'blog' },
  { name: 'Project Demo', key: 'project' },
];
// 当前导航选中项
const selectedKey = ref('home');
// 点击导航
const handleNavClick = (key) => {
  selectedKey.value = key
  router.push({ name: key });
  showSmNav.value = false;
}
// 路由改变后，选中对应导航
router.afterEach((to, from) => {
  const list = [];
  for (let i = 0; i < navItemList.length; i++) {
    list.push(navItemList[i].key);
  }
  if (list.includes(to.name)) {
    selectedKey.value = to.name;
  }
});

// 显示sm屏幕上的导航条
const showSmNav = ref(false);

/**
 * ********** footer **********
 */

</script>
