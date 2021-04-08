<template>
  <div
    class="flex items-center border-l-4 py-2 px-3 shadow-md mb-2"
    :class="[bgColor, borderColor]"
    @click="dismiss"
  >
    <div class="text-gray-300 mr-3">
      <i :class="icon" />
    </div>
    <div class="text-white max-w-xs">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    id: Number,
    type: String,
    message: String,
  },
  computed: {
    bgColor() {
      switch (this.type) {
        case "success":
          return "bg-green-500";
        case "error":
          return "bg-red-500";
        default:
          return "bg-blue-500";
      }
    },
    borderColor() {
      switch (this.type) {
        case "success":
          return "border-green-700";
        case "error":
          return "border-red-700";
        default:
          return "border-blue-700";
      }
    },
    icon() {
      switch (this.type) {
        case "success":
          return "gg-check";
        case "error":
          return "gg-danger";
        default:
          return "gg-info";
      }
    },
  },
  methods: {
    dismiss() {
      this.$store.dispatch("dismissToast", this.id);
    },
  },
  mounted() {
    setTimeout(this.dismiss, 2000);
  },
};
</script>
