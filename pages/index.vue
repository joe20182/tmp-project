<template>
  <div class="flex flex-col gap-4">
    <template 
      v-for="question in questions"
      :key="question.name"
    >
      <TextCard :name="question.name" />
    </template>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Index',
})

const questions: {
  name: string;
}[] = [
  { name: 'Q1' },
  { name: 'Q2' },
  { name: 'Q3' },
  { name: 'Q4' },
  { name: 'Q5' },
  { name: 'Q6' },
]
</script>
