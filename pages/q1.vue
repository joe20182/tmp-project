<template>
  <div>
    <h1 class="text-2xl font-bold">Q1</h1>
    <code-section code="Click button to show data after 10 seconds" />
    <VideoCard :source="vQ1" />

    <Separator />

    <h2 class="text-lg">Show Data here: {{ data }}</h2>
    <button @click="setData">Set Data</button>
  </div>
</template>

<script lang="ts" setup>
import vQ1 from "@/assets/q1.mov";

defineOptions({
  name: "Q1",
});

const data = ref("");
const isLoading = ref(false);

const setData = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  data.value = "Loading...";
  setTimeout(() => {
    data.value = "Get Data Success";
    isLoading.value = false;
  }, 10000);
};
</script>

<style></style>
