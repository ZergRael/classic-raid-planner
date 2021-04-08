<template>
  <div id="nav">
    <router-link class="text-xl" to="/">Classic Raid Planner</router-link>
  </div>

  <div class="content">
    <router-view />
  </div>

  <div class="footer">
    <div class="toasts-wrapper absolute bottom-0 right-0">
      <Toast
        v-for="toast in $store.state.global.toasts"
        :key="toast"
        :id="toast.id"
        :type="toast.type"
        :message="toast.message"
      />
    </div>
  </div>
</template>

<script>
import Toast from "@/components/Toast";

export default {
  name: "App",
  components: {
    Toast,
  },
};
</script>
