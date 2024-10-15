<template>
  <section
    class="products__layout py-[30px] lg:px-[40px] w-full flex justify-start items-start flex-col gap-10 bg-[#fff] rounded-[12px] border"
  >
    <div
      class="pb-5 border-b border-solid border-[#ccc] w-full flex justify-between items-center flex-row flex-wrap gap-3"
    >
      <h3 class="text-second-color font-semibold text-[20px]">Products</h3>
      <router-link
        to="/products/add"
        class="flex justify-center items-center flex-row gap-2 bg-primary-color py-[12px] px-[25px] rounded-[8px]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M5 12H19"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="text-[#fff] text-[15px] font-medium">
          Add Product
        </span>
      </router-link>
    </div>
    <filterproduct />
    <div class="w-full">
      <section v-if="getLoading">
        <v-row>
          <v-col cols="12" md="12">
            <v-skeleton-loader type="table"></v-skeleton-loader>
          </v-col>
        </v-row>
      </section>
      <div v-else class="w-full">
        <v-data-table-server
          :headers="headers"
          :items="getProducts"
          hide-default-footer
          v-if="getProducts.length > 0"
          class="w-full"
        >
          <template v-slot:item.title="{ item }">
            <span class="truncate text-second-color font-medium text-[14px]">
              {{ item.title }}
            </span>
          </template>
          <template v-slot:item.description="{ item }">
            <span class="truncate text-second-color font-medium text-[13px]">
              {{ item.description }}
            </span>
          </template>
          <template v-slot:item.image="{ item }">
            <img
              :src="item.image"
              :alt="item.title"
              class="rounded-[8px] w-[40px] h-[40px] object-contain"
            />
          </template>
          <template v-slot:item.category="{ item }">
            <v-chip
              class="ma-2 !opacity-100 !bg-[#CCFBF1]"
              v-if="item.category == 'men\'s clothing'"
            >
              <span class="text-[#115E59] !font-medium">
                {{ item.category }}
              </span>
            </v-chip>
            <v-chip
              class="ma-2 !opacity-100 !bg-[#dfccfb]"
              v-if="item.category == 'women\'s clothing'"
            >
              <span class="text-[#4f115e] !font-medium">
                {{ item.category }}
              </span>
            </v-chip>
            <v-chip
              class="ma-2 !bg-[#FEF9C3]"
              v-if="item.category == 'electronics'"
            >
              <span class="text-[#854D0E] !font-medium">
                {{ item.category }}
              </span>
            </v-chip>
            <v-chip
              class="ma-2 text-white !bg-[#FEE2E2]"
              v-if="item.category == 'jewelery'"
            >
              <span class="text-[#991B1B] font-medium">
                {{ item.category }}
              </span>
            </v-chip>
          </template>
          <template v-slot:item.action="{ item }">
            <div
              class="flex justify-center items-center flex-row flex-wrap gap-2"
            >
              <router-link
                :to="{
                  name: 'editProduct',
                  params: { id: item.id },
                }"
              >
                <img
                  src="/images/pencil-line.svg"
                  alt="edit"
                  width="24"
                  height="24"
                />
              </router-link>
              <router-link
                :to="{
                  name: 'viewProduct',
                  params: { id: item.id },
                }"
              >
                <img src="/images/eye.svg" alt="edit" width="24" height="24" />
              </router-link>
              <deleteproduct :productID="item.id" />
            </div>
          </template>
        </v-data-table-server>
      </div>
      <div v-if="getProducts.length == 0 && !getLoading">
        <v-alert density="compact" color="#bb2124">
        <span> لا يوجد منتجات </span>
      </v-alert>
      </div>
    </div>
  </section>
</template>

<script setup>
import deleteproduct from "./delete.vue";
import filterproduct from "./filter.vue";
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();

const headers = ref([
  {
    title: "ID",
    align: "start",
    sortable: false,
    key: "id",
  },
  { title: "Title", key: "title", align: "start" },
  { title: "Image", key: "image", align: "start" },
  { title: "Category", key: "category", align: "start" },
  { title: "Description", key: "description", align: "start" },
  { title: "Price", key: "price", align: "start" },
  { title: "Actions", key: "action", align: "start" },
]);

const loading = ref(true);

// Get product data
const getProducts = computed(() => store.getters["products/getProducts"]);
const getLoading = computed(() => store.getters["products/getLoading"]);
store.dispatch("products/handleGetproducts");
</script>

<style lang="scss" scoped>
.truncate {
  display: inline-block;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
