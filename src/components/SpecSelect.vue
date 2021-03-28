<template>
  <div class="relative inline-block">
    <img
      :src="specImgSrc(currentSpecIcon)"
      class="w-5 inline-block cursor-pointer"
      @click="onClick"
    />
    <div
      v-if="dropdown"
      class="origin-top-left absolute left-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
    >
      <div class="py-1" role="none">
        <a
          href="#"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem"
          @click="onSelect(spec)"
          v-for="spec in $options.specs[pClass]"
          :key="spec.name"
        >
          <img :src="specImgSrc(spec.icon)" class="w-5 inline-block" />
          {{ spec.displayName }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import specs from "@/constants/specs";

export default {
  specs,
  name: "SpecSelect",
  props: {
    pClass: String,
    spec: String,
  },
  data() {
    return {
      dropdown: false,
    };
  },
  computed: {
    currentSpecIcon() {
      if (!this.pClass) {
        return;
      }

      const spec = this.$options.specs[this.pClass].find(
        (e) => e.name == this.spec
      );
      if (!spec) {
        return null;
      }

      return spec.icon;
    },
  },
  methods: {
    onClick() {
      if (!this.pClass) {
        return;
      }

      this.dropdown = !this.dropdown;
    },
    onSelect(spec) {
      this.dropdown = false;
      this.$emit("spec-select", spec.name);
      return false;
    },
    specImgSrc(icon) {
      return require(`@/assets/icons/${icon || "INV_Misc_QuestionMark"}.png`);
    },
  },
};
</script>
