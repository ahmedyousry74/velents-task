<template>
  <section
    class="authentication__layout flex flex-row justify-start items-start gap-0 h-[100vh]"
  >
    <div
      class="bg-white flex justify-start items-start flex-col gap-3 py-[25px] px-[30px] lg:w-[50%] w-full h-full"
    >
      <div
        class="form !bg-[#fff] border border-solid border-[#DDD8F9] rounded-lg py-[15px] sm:py-[20px] px-[12px] sm:px-[25px] mt-[35px] w-full"
        style="box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05)"
      >
        <h2
          class="text-third-color font-semibold text-[20px] flex justify-center items-center flex-row w-full mb-[35px]"
        >
          👋 Login
        </h2>
        <div class="flex justify-start items-start flex-col gap-3 w-full">
          <div class="flex justify-start items-start flex-col gap-2 w-full">
            <label for="" class="text-second-color font-semibold text-[14px]">
              Username
            </label>
            <v-text-field
              density="comfortable"
              placeholder="Username"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              class="w-full !tracking-[0px]"
              rounded="md"
              :dir="direction"
              v-model="AuthData.username"
              :error-messages="Auth$.username.$errors.map((e) => e.$message)"
              @blur="Auth$.username.$touch"
              @input="Auth$.username.$touch"
            ></v-text-field>
          </div>
          <div class="flex justify-start items-start flex-col gap-2 w-full">
            <label for="" class="text-second-color font-semibold text-[14px]">
              Password
            </label>
            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="comfortable"
              placeholder="Password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              class="w-full"
              :dir="direction"
              v-model="AuthData.password"
              :error-messages="Auth$.password.$errors.map((e) => e.$message)"
              @input="Auth$.password.$touch"
              @blur="Auth$.password.$touch"
            ></v-text-field>
          </div>
          <v-btn
            class="mb-5 !tracking-[0]"
            color="#FFC33D"
            size="large"
            variant="tonal"
            block
            @click="submit"
            :loading="loading"
          >
            Login
          </v-btn>
        </div>
      </div>
    </div>
    <div
      class="bg-primary-color text-white lg:flex hidden justify-center items-center w-50 h-full"
    >
      <img
        src="/images/auth.svg"
        alt="auth_img"
        width="500"
        height="500"
        class="object-contain"
      />
    </div>
  </section>
</template>

<script setup>
const lang = ref(localStorage.getItem("lang") || "en");
const direction = computed(() => (lang.value === "en" ? "ltr" : "rtl"));
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import { ref, computed, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, numeric, minLength } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const { t } = useI18n({ useScope: "global" });
const router = useRouter();
const store = useStore();
const toast = useToast();
const visible = ref(false);
const loading = ref(false);
const AuthData = reactive({
  username: "mor_2314",
  password: "83r5^_",
});

const rules = {
  username: {
    required: helpers.withMessage("Username is required", required),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
  },
};

const loginPAYLOAD = computed(() => {
  const PAYLOAD = {
    username: AuthData.username,
    password: AuthData.password,
  };
  return PAYLOAD;
});

const Auth$ = useVuelidate(rules, AuthData);

// Get login data
const getToken = computed(() => store.getters["auth/getToken"]);
const getAuthentication = computed(
  () => store.getters["auth/getAuthentication"]
);
const getAuthMessage = computed(() => store.getters["auth/getAuthMessage"]);

const submit = async () => {
  loading.value = false;
  try {
    const validateForm = await Auth$.value.$validate();
    if (validateForm) {
      loading.value = true;
      await store.dispatch("auth/handleLogin", loginPAYLOAD.value);
      if (getAuthentication.value === true) {
        toast.success("Login Successfully");
        router.push("/home");
      } else {
        toast.error("username or password is incorrect");
      }
    }
  } catch (error) {
    toast.error("username or password is incorrect");
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
