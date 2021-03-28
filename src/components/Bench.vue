<template>
  <div class="grid grid-cols-2 w-full md:w-3/4">
    <div class="">
      Bench
      <draggable
        class=""
        v-model="players"
        :group="{ name: 'raid-members' }"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element }">
          <Player :element="element" />
        </template>
      </draggable>
    </div>
</template>

