<template>
  <section>
    <UCollapsible :default-open="false">
      <h2 class="text-sm">Hint:</h2>
      <template #content>
        <CodeSection :code="code" />
      </template>
    </UCollapsible>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  code: string;
}>();

</script>

<style>

</style>