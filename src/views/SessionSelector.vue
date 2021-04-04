<template>
  <h2 class="text-center">Session selector</h2>
  <div class="session-selector">
    New raid <input type="text" value="name" />
    Players :
    <select>
      <option>10</option>
      <option>25</option>
      <option>40</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SessionSelector",
};
</script>
