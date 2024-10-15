<template>
  <section
    class="products__layout mb-10 py-[30px] lg:px-[40px] w-full flex justify-start items-start flex-col gap-10 bg-[#fff] rounded-[12px] border"
  >
    <div
      class="pb-5 border-b border-solid border-[#ccc] w-full flex justify-between items-center flex-row flex-wrap gap-3"
    >
      <h3 class="text-second-color font-semibold text-[20px]">Edit product</h3>
    </div>
    <div
      class="flex justify-start items-start flex-col gap-3 w-full sm:p-[32px] px-[12px] py-[25px]"
    >
      <v-text-field
        density="comfortable"
        placeholder="Title"
        prepend-inner-icon="mdi-store-outline"
        variant="outlined"
        class="w-full"
        v-model="Getproduct.title"
        :error-messages="product$.title.$errors.map((e) => e.$message)"
        @blur="product$.title.$touch"
        @input="product$.title.$touch"
      ></v-text-field>
      <v-text-field
        density="comfortable"
        placeholder="Description"
        prepend-inner-icon="mdi-store-outline"
        variant="outlined"
        class="w-full"
        v-model="Getproduct.description"
        :error-messages="product$.description.$errors.map((e) => e.$message)"
        @blur="product$.description.$touch"
        @input="product$.description.$touch"
      ></v-text-field>
      <v-text-field
        density="comfortable"
        placeholder="Price"
        prepend-inner-icon="mdi-store-outline"
        variant="outlined"
        class="w-full"
        v-model="Getproduct.price"
        :error-messages="product$.price.$errors.map((e) => e.$message)"
        @blur="product$.price.$touch"
        @input="product$.price.$touch"
      ></v-text-field>
      <v-autocomplete
        class="w-full"
        prepend-inner-icon="mdi-cog"
        variant="outlined"
        density="comfortable"
        label="Category"
        :items="getcategories"
        :item-title="(type) => type.name"
        :item-value="(type) => type.name"
        v-model="Getproduct.category"
        :error-messages="product$.category.$errors.map((e) => e.$message)"
        @blur="product$.category.$touch"
        @input="product$.category.$touch"
      ></v-autocomplete>
      <div class="flex justify-start items-start flex-col gap-2 my-5 w-100">
        <span for="" class="font-semibold text-[15px]">
          Product image
        </span>
        <img :src="Getproduct.image" :alt="Getproduct.title" class="rounded-[8px] w-[100px] h-[100px] object-contain" >
        <div
          class="file__zone flex justify-center items-center flex-column my-3 w-100"
          style="gap: 8px"
        >
          <input
            class="form-control"
            type="file"
            id="formFile"
            @change="onImageProductChange0"
            accept=".png, .jpg, .jpeg"
          />

          <div
            v-if="fileType === 'image' && filePreviewUrl"
            class="file-preview"
          >
            <img
              :src="filePreviewUrl"
              alt="Uploaded Image"
              width="150"
              height="150"
            />
          </div>
          <img
            v-else
            src="/images/down.svg"
            alt="download"
            loading="lazy"
            width="40"
            height="40"
          />

          <span> Upload image </span>
          <p>png, jpg, jpeg</p>
        </div>

        <!-- Error message -->
        <span v-if="messageFile" class="text-sm text-[#B00020]">
          Product Image Required
        </span>
      </div>
      <v-btn
        @click="submit"
        class="!bg-dark-color font-medium text-[15px] !text-light-color !h-[42px] !shadow-none mb-5 !tracking-[0]"
        :loading="loading"
      >
        Add product
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
const productDATA = ref({
  title: "",
  description: "",
  price: "",
  category: null
});

//////////////////////////
// Get categories
const getcategories = computed(() => store.getters["categories/getcategories"]);
store.dispatch("categories/handleGetcategories");


// get product details
const Getproduct = computed(() => store.getters["products/getProduct"]);
const getLoading = computed(() => store.getters["products/getLoading"]);
store.dispatch("products/Getproduct", route.params.id);

//////////////////////////////////////////////////////////////////////////////////
const ImageProduct0 = ref(null);
const filePreviewUrl = ref(null);
const fileType = ref("");
const messageFile = ref(false);

const onImageProductChange0 = (event) => {
  const target = event.target;
  if (target && target.files) {
    const file = target.files[0];
    ImageProduct0.value = file;

    const fileExtension = file.type;
    if (fileExtension.includes("image")) {
      fileType.value = "image";
      filePreviewUrl.value = URL.createObjectURL(file);
    }

    messageFile.value = false;
  } else {
    messageFile.value = true;
  }
};
//////////////////////////////////////////////////////////////////////////////////

const rules = {
  title: {
    required: helpers.withMessage("title is required", required),
  },
  description: {
    required: helpers.withMessage("description is required", required),
  },
  price: {
    required: helpers.withMessage("price is required", required),
  },
  category: {
    required: helpers.withMessage("category is required", required),
  }
};

const product$ = useVuelidate(rules, Getproduct);

const submit = async () => {
  loading.value = false;
  
  try {
    const validateForm = await product$.value.$validate();
    if (validateForm) {
      loading.value = true;
      const form_data = new FormData();
      form_data.append("title", Getproduct.value.title);
      form_data.append("description", Getproduct.value.description);
      form_data.append("price", Getproduct.value.price);
      form_data.append("category", Getproduct.value.category);
      form_data.append("image", ImageProduct0.value);
      await store.dispatch("products/editproduct",{
            productID: route.params.id,
            payload: form_data
          });
      toast.success("Product edited successfully");
      router.push("/products");
    }
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    loading.value = false;
  }
};




</script>

<style lang="scss" scoped></style>
