<template>
  <section
    class="products__layout pt-[30px] lg:px-[40px] px-[24px] w-full flex justify-start items-start flex-col gap-10"
  >
    <div
      class="pb-5 border-b border-solid border-[#ccc] w-full flex justify-between items-center flex-row flex-wrap gap-3"
    >
      <h3 class="text-second-color font-semibold text-[20px]">Edit product</h3>
    </div>
    <div
      class="flex justify-start items-start flex-col gap-3 w-full bg-[#fff] shadow-md sm:p-[32px] px-[12px] py-[25px] rounded-[8px]"
    >
      <v-text-field
        density="comfortable"
        placeholder="Name"
        prepend-inner-icon="mdi-account-circle-outline"
        variant="outlined"
        class="w-full"
        v-model="Getproduct.name"
        :error-messages="product$.name.$errors.map((e) => e.$message)"
        @blur="product$.name.$touch"
        @input="product$.name.$touch"
      ></v-text-field>
      <v-text-field
        density="comfortable"
        class="w-full"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="Getproduct.email"
        :error-messages="product$.email.$errors.map((e) => e.$message)"
        @blur="product$.email.$touch"
        @input="product$.email.$touch"
      ></v-text-field>
      <v-text-field
        class="w-full"
        density="comfortable"
        placeholder="Email address"
        prepend-inner-icon="mdi-phone"
        variant="outlined"
        v-model="Getproduct.phone"
        :error-messages="product$.phone.$errors.map((e) => e.$message)"
        @blur="product$.phone.$touch"
        @input="product$.phone.$touch"
      ></v-text-field>
      <v-autocomplete
        class="w-full"
        prepend-inner-icon="mdi-cog"
        variant="outlined"
        density="comfortable"
        label="Status"
        :items="['active', 'not active']"
        v-model="Getproduct.status"
        :error-messages="product$.status.$errors.map((e) => e.$message)"
        @blur="product$.status.$touch"
        @input="product$.status.$touch"
      ></v-autocomplete>
      <v-btn
        @click="submit"
        class="!bg-dark-color font-medium text-[15px] !text-light-color !h-[42px] !shadow-none mb-5 !tracking-[0]"
        :loading="loading"
      >
        Edit product
      </v-btn>
    </div>
  </section>
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
const Getproduct = computed(
  () => store.getters["products/getproduct"]
);
store.dispatch("products/Getproduct", route.params.id);




const rules = {
  name: {
    required: helpers.withMessage("Name is required", required),
  },
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Email is not valid", email),
  },
  phone: {
    required: helpers.withMessage("Phone is required", required),
    numeric: helpers.withMessage("Phone is not valid", numeric),
    minLength: helpers.withMessage("Phone must be 11 digit", minLength(11)),
    maxLength: helpers.withMessage("Phone must be 11 digit", maxLength(11)),
  },
  status: {
    required: helpers.withMessage("Status is required", required),
  },
};

const productPAYLOAD = computed(() => {
  const PAYLOAD = {
    name: Getproduct.value.name,
    email: Getproduct.value.email,
    phone: Getproduct.value.phone,
    status: Getproduct.value.status,
  };
  return PAYLOAD;
});

const product$ = useVuelidate(rules, Getproduct);


const submit = async () => {
  loading.value = false;
  try {
    const validateForm = await product$.value.$validate();
    if (validateForm) {
      loading.value = true;
      const res = await store.dispatch(
          "products/editproduct",{
            productID: route.params.id,
            payload: productPAYLOAD.value
          }
        );
        toast.success('product edited successfully');
        router.push("/products");
    }
  } catch (error) {
    toast.error('error');
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
