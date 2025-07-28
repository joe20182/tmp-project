<template>
  <div>
    {{ time }}
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'CurrentTime',
})

const time = ref(new Date().toLocaleString())
const updateTime = () => {
  requestAnimationFrame(() => {
    time.value = new Date().toLocaleString()
    setTimeout(updateTime, 1000)
  })
}

onMounted(updateTime)
</script>

<style>

</style>