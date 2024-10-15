<template>
  <div class="app !w-full">
    <component :is="$route.meta.layout" class="w-full">
      <RouterView class="w-full"/>
    </component>
  </div>
</template>

<script setup>
import Sidebar from "./components/layout/navbar.vue";
import Topbar from "./components/layout/top-bar.vue";
</script>

<style lang="scss">
:root {
  --primary-color: #FFC33D;
  --second-color: #050505;
  --grey-color: #64748b;
  --dark-color: #1d1953;
  --dark-alt-color: #334155;
  --light-color: #f1f5f9;
  --sidebar-width: 300px;
}

.app {
  display: flex;
  width: 100% !important;
  main {
    flex: 1 1 0;
    padding: 2rem;
    width: 100%;
    @media (max-width: 1024px) {
      padding: 20px !important;
    }
  }
  .wrap__content {
    @media (max-width: 1024px) {
      padding-inline-start: 65px;
      padding-inline-end: 5px;
    }
  }
}
</style>
