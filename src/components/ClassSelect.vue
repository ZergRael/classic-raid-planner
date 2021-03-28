<template>
  <div class="relative inline-block">
    <img
      :src="pClassImgSrc(currentPClassIcon)"
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
          @click="onSelect(pc)"
          v-for="pc in $options.classes"
          :key="pc.name"
        >
          <img :src="pClassImgSrc(pc.icon)" class="w-5 inline-block" />
          {{ pc.displayName }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import classes from "@/constants/classes";

export default {
  classes,
  name: "ClassSelect",
  props: {
    pClass: String,
  },
  data() {
    return {
      dropdown: false,
    };
  },
  computed: {
    currentPClassIcon() {
      const pClass = this.$options.classes.find((e) => e.name == this.pClass);
      if (!pClass) {
        return null;
      }

      return pClass.icon;
    },
  },
  methods: {
    onClick() {
      this.dropdown = !this.dropdown;
    },
    onSelect(pc) {
      this.dropdown = false;
      this.$emit("pclass-select", pc.name);
      return false;
    },
    pClassImgSrc(icon) {
      return require(`@/assets/icons/${icon || "INV_Misc_QuestionMark"}.png`);
    },
  },
};
</script>
