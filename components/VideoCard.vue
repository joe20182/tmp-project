<template>
  <div class="bg-gray-50/10 border border-[#00DC42]/50 dark:bg-white/5 flex items-center justify-center gap-1 p-6 rounded-lg sm:col-span-2">
    <video controls class="w-full">
      <source :src="source" />
    </video>
    <p class="text-sm">{{ description }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  source: string;
  description?: string;
}>();

</script>

<style>

</style>