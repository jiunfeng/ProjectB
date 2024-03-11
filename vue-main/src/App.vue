<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue';
import GamePage from "@/views/GameView.vue";
import IntoPage from "@/views/IntoView.vue";
import ManagePage from "@/views/ManageView.vue";
import MainUIPage from "@/views/MainUIView.vue";
import BoxPage from "@/views/PetBoxView.vue";
import { useUserInfoStore } from "@/stores/userInfo";
import ResultPage from "@/views/tmpRoundResultView.vue";
const userStore = useUserInfoStore();

userStore._setTestAccount()//預塞測試帳號資料

// 控制使用者currentPage導向
const currentPageComponent = computed(() => {
  switch (userStore.currentPage) {
    case 'into':
      return IntoPage;
    case 'manage':
      return ManagePage;
    case 'main':
      return MainUIPage;
    case 'game':
      return GamePage;
    case 'box':
      return BoxPage;
    default:
      return MainUIPage;
  }
});

// 修改store資料推動頁面切換
const changePage = (page) => {
  userStore.currentPage = page;
}





</script>


<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <main class="bbb">

    <component :is="currentPageComponent"></component>
  </main>
  <div class="ccc">
    <h1>main test</h1>
    <button @click="changePage('into')">IntoPage</button>
    <button @click="changePage('main')">MainPage</button>
    <button @click="changePage('game')">game</button>
    <button @click="changePage('box')">box</button>
    <button @click="changePage('manage')">manage</button>
  </div>
  <component :is="ResultPage"></component>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.bbb {
  height: 100vh;
}

.ccc {
  margin-top: 30vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
