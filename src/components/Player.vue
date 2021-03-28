<template>
  <div class="m-1 border rounded">
    <div class="p-1" v-if="!p.empty" :class="bgClass">
      <ClassSelect
        class="p-0.5"
        :p-class="p.pClass"
        @pclass-select="onPClassSelect"
      />
      <SpecSelect
        class="p-0.5"
        :p-class="p.pClass"
        :spec="p.spec"
        @spec-select="onSpecSelect"
      />
      {{ name }}
    </div>
    <div class="p-1" v-else>_</div>
  </div>
</template>

<script>
import ClassSelect from "@/components/ClassSelect.vue";
import SpecSelect from "@/components/SpecSelect.vue";

export default {
  name: "Player",
  props: ["p"],
  components: {
    ClassSelect,
    SpecSelect,
  },
  computed: {
    bgClass() {
      return this.p.pClass ? "bg-" + this.p.pClass : "bg-gray-200";
    },
    name() {
      return this.p.name;
    },
    canSpec() {
      return this.p.pClass;
    },
  },
  methods: {
    onClick() {},
    onPClassSelect(pClass) {
      if (this.p.empty) {
        return;
      }

      this.$store.commit("setPlayerPClass", {
        name: this.p.name,
        pClass,
      });
    },
    onSpecSelect(spec) {
      if (this.p.empty) {
        return;
      }

      this.$store.commit("setPlayerSpec", {
        name: this.p.name,
        spec,
      });
    },
  },
};
</script>
