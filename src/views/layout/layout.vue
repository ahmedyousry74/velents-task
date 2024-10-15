<template>
  <div class="flex justify-start items-start flex-col">
    <Navbar />
    <topBar />
  </div>
  <div class="w-full ps-[80px] pe-5"><slot /></div>
</template>

<script setup>
import Navbar from "../../components/layout/navbar.vue";
import topBar from "../../components/layout/top-bar.vue";
</script>

<style>
.is-expanded ~ .top_bar{
  width: calc(100% - 299px);
}
</style>
