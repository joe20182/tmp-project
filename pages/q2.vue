<template>
  <div>
    <h1 class="text-2xl font-bold">Q2</h1>
    <code-section code="Combine q1 function, we need to design a timeout function, if the request does not complete within 5 seconds, return 'Timeout'" />
    <VideoCard :source="vQ2" />
    
    <Separator />
    
    <h2 class="text-lg">Show Data here: {{ data }}</h2>
    <button @click="setData">Set Data</button>
  </div>
</template>

<script lang="ts" setup>
/**
 * q2:
 * @description 結合 q1 函數, 我們需要為這個請求設計一個 timeout 函數, 如果請求在 5 秒內沒有完成, 則返回 'Timeout'
 * @description Combine q1 function, we need to design a timeout function for this request, if the request does not complete within 5 seconds, return 'Timeout'
 * 
 * @hint 設計的 timeout 函數可以被簡單的重複使用
 * @hint The timeout function you design should be easily reusable
 **/

import vQ2 from '@/assets/q2.mov'

defineOptions({
  name: 'Q2',
})

const data = ref('')
const getData = async () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('data')
    }, 10000)
  })
}
const timeout = (promise: Promise<string>, timeout: number) => {
  return Promise.race([
    promise,
    new Promise<string>((resolve) => setTimeout(() => resolve('Timeout'), timeout))
  ])
}
const setData = async () => {
  data.value = 'Loading...'
  data.value = await timeout(getData(), 5000);
}

</script>

<style>

</style>