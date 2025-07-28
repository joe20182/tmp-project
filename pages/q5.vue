<template>
  <div>
    <h1 class="text-2xl font-bold">
      <span>Q5</span>
      <ClientOnly>
        <CurrentTime />
      </ClientOnly>
    </h1>

    <UCollapsible class="rounded-lg border border-gray-200 p-4">
        <h2 class="text-4">Click to see some hints</h2>
        <template #content>
          <VideoCard :source="vQ5" />
          <ul>
            <li>1. 但可以看出 CurrentTime 有明顯卡頓, 有什麼優化方式?</li>
            <li>2. 解法不只一種, 可以提供更多想法</li>
          </ul>
        </template>
      </UCollapsible>
    <Separator />

    <h2 class="text-lg">Show Data here:</h2>
    <ul v-for="item in data" :key="item.id">
      <li class="flex gap-1 text-sm rounded-lg">
        <div>id: {{ item.id }}</div>
        <div>name: {{ item.name }}</div>
        <div>ans: {{ item.ans }}</div>
      </li>
    </ul>

    <button @click="run()">Run</button>
  </div>
</template>

<script lang="ts" setup>
import { useQ5 } from '@/composables/useQ5'
import vQ5 from '@/assets/q5.mov'

/**
 * 請取得 list 中的每一筆資料的 detail, 並且將結果寫入 data
 * Please get the detail of each item in list, and write the result to data
 * 
 * Note:
 * - fetchList 與 fetchDetail 都是模擬 API 請求的函數
 * - 如何避免瞬間大量請求
 * - 如何避免畫面卡頓: 可觀察畫面上的 CurrentTime 來判斷畫面是否有卡頓
 */

defineOptions({
  name: 'Q5',
})

const data = ref<any>([])

const { 
  fetchList,
  fetchDetail,
} = useQ5()

const run = async () => {}

</script>

<style>

</style>