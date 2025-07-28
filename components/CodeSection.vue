<template>
  <div class="bg-gray-50/10 border border-[#00DC42]/50 dark:bg-white/5 flex flex-col gap-1 p-2 rounded-lg sm:col-span-2 my-4">
    <code class="text-sm">
      {{ code }}
    </code>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  code: string;
}>();

</script>

<style>

</style>