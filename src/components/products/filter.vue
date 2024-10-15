<template>
  <div
    class="flex justify-start items-start flex-row flex-wrap gap-3 w-full bg-[#fff]"
  >
    <v-text-field
      hide-details
      max-width="250"
      placeholder="Search"
      variant="outlined"
      density="compact"
      v-model="filter.search"
      @input="handleproducts"
    ></v-text-field>
    <v-autocomplete
      v-model="filter.status"
      class="!w-[250px]"
      density="compact"
      max-width="250"
      clearable
      chips
      label="Status"
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
  status: null,
});

const productsPAYLOAD = computed(() => {
  const payload = {
    name: filter.search,
    status: filter.status,
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
    title: "active",
    value: "active",
  },
  {
    title: "not active",
    value: "not active",
  },
]);
</script>

<style lang="scss" scoped></style>
