<template>
  <div
    class="flex justify-start items-start flex-row flex-wrap gap-3 w-full bg-[#fff]"
  >
    <v-autocomplete
      v-model="filter.sort"
      class="!w-[250px]"
      density="compact"
      max-width="250"
      clearable
      chips
      label="Sort"
      :items="statusMenu"
      variant="outlined"
      hide-details
      @update:model-value="handleproducts"
    ></v-autocomplete>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();

// filter
const filter = reactive({
  search: "",
  sort: null,
});

const productsPAYLOAD = computed(() => {
  const payload = {
    title: filter.search,
    sort: filter.sort,
  };
  return { ...payload };
});

const handleproducts = () => {
  store.commit("products/setFilter", productsPAYLOAD.value);
  store.dispatch("products/handleGetproducts");
};


// status
const statusMenu = ref([
  {
    title: "asc",
    value: "asc",
  },
  {
    title: "desc",
    value: "desc",
  },
]);
</script>

<style lang="scss" scoped></style>
