<template>
  <div class="bg-gray-50/10 border border-[#00DC42]/50 dark:bg-white/5 flex flex-col gap-1 p-6 rounded-lg sm:col-span-2">
    <RouterLink :to="`/${name}`">
      <h1 class="text-2xl font-bold">{{ name }}</h1>
    </RouterLink>
    <p class="text-sm">{{ description }}</p>
    <slot name="code" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
  description?: string;
}>();
</script>

<style scoped>

</style>