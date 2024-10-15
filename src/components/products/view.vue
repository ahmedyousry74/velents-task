<template>
  <div>
    <section v-if="getLoading">
      <v-row>
        <v-col cols="12" md="6">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="6">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
    </section>
    <section v-else>
      <div
      v-if="Getproduct !== ''"
        class="product__details py-[30px] lg:px-[40px] px-[24px] w-full flex justify-start items-start flex-col gap-4 bg-[#fff] border rounded-[8px] h-[100vh]"
      >
        <div
          class="flex justify-between items-center flex-row gap-3 w-full border-b pb-3 flex-wrap"
        >
          <span class="text-second-color font-semibold text-[15px]"
            >Product name</span
          >
          <span class="text-[#777] font-medium text-[15px]">{{
            Getproduct.title
          }}</span>
        </div>
        <div
          class="flex justify-between items-center flex-row gap-3 w-full border-b pb-3 flex-wrap"
        >
          <span class="text-second-color font-semibold text-[15px]"
            >Product category</span
          >
          <v-chip
            class="ma-2 !opacity-100 !bg-[#CCFBF1]"
            v-if="Getproduct.category == 'men\'s clothing'"
          >
            <span class="text-[#115E59] !font-medium">
              {{ Getproduct.category }}
            </span>
          </v-chip>
          <v-chip
            class="ma-2 !opacity-100 !bg-[#dfccfb]"
            v-if="Getproduct.category == 'women\'s clothing'"
          >
            <span class="text-[#4f115e] !font-medium">
              {{ Getproduct.category }}
            </span>
          </v-chip>
          <v-chip
            class="ma-2 !bg-[#FEF9C3]"
            v-if="Getproduct.category == 'electronics'"
          >
            <span class="text-[#854D0E] !font-medium">
              {{ Getproduct.category }}
            </span>
          </v-chip>
          <v-chip
            class="ma-2 text-white !bg-[#FEE2E2]"
            v-if="Getproduct.category == 'jewelery'"
          >
            <span class="text-[#991B1B] font-medium">
              {{ Getproduct.category }}
            </span>
          </v-chip>
        </div>
        <div
          class="flex justify-between items-center flex-row gap-3 w-full border-b pb-3 flex-wrap"
        >
          <span class="text-second-color font-semibold text-[15px]"
            >Product price</span
          >
          <span class="text-[#777] font-medium text-[15px]">{{
            Getproduct.price
          }}</span>
        </div>
        <div
          class="flex justify-between items-center flex-row gap-3 w-full border-b pb-3 flex-wrap"
        >
          <span class="text-second-color font-semibold text-[15px]"
            >Product description</span
          >
          <span class="text-[#777] font-medium text-[15px]">{{
            Getproduct.description
          }}</span>
        </div>
        <div class="flex justify-between items-center flex-row gap-3 w-full">
          <span class="text-second-color font-semibold text-[15px]"
            >Product image</span
          >
          <img
            :src="Getproduct.image"
            :alt="Getproduct.title"
            class="rounded-[8px] w-[80px] h-[80px] object-contain"
          />
        </div>
      </div>
    </section>
    <section v-if="Getproduct == '' && !getLoading">
      <v-alert density="compact" color="#bb2124">
        <span> لا يوجد منتج </span>
      </v-alert>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import { ref, computed, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  helpers,
  numeric,
  email,
  minLength,
  maxLength,
} from "@vuelidate/validators";
const router = useRouter();
const route = useRoute();
const store = useStore();
const toast = useToast();
const loading = ref(false);

// get product details
const Getproduct = computed(() => store.getters["products/getProduct"]);
const getLoading = computed(() => store.getters["products/getLoading"]);
store.dispatch("products/Getproduct", route.params.id);
</script>

<style lang="scss" scoped></style>
