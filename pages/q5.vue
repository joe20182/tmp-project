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
import { useQ5 } from "@/composables/useQ5";
import { useWorkerFetch } from "@/composables/useQ5WorkerFetch";
import vQ5 from "@/assets/q5.mov";

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
  name: "Q5",
});

const data = ref<any>([]);

const { fetchList, fetchDetail } = useQ5();
const { initWorker, fetchDetailInWorker, cleanup } = useWorkerFetch();

onMounted(() => {
  initWorker();
});

onUnmounted(() => {
  cleanup();
});

const run = async () => {
  const list = await fetchList();

  list.forEach(async (item) => {
    try {
      const detail = await fetchDetailInWorker(item.id);
      data.value.push(detail);
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  });

  /**
   * 影片中的範例使用類似下方的code把fetch限制最多一次並行5次，但不可避免的還是會有block主線程的問題
   * 上方解法是把大量運算交給web worker來做，避免影響到主線程
   * 其餘解法像是:
   * 1. 依次同時請求n筆，回來後更新UI再繼續請求另外n筆 -> 整體完成時間會拉長且無法完整解決卡頓
   * 2. lazy load -> 例如每往下滾動一筆才fetch一筆，但不適用於這題的UI陳列方式
   * 3. 從api端優化 -> 需後端配合
   * 因此我認為web worker是比較好的解法
   */

  // const concurrencyLimit = 5;
  // let index = 0;

  // const executeNext = async () => {
  //   if (index >= list.length) return;

  //   const currentIndex = index++;
  //   const item = list[currentIndex];

  //   if (!item) return;

  //   try {
  //     const detail = await fetchDetail(item.id);
  //     data.value.push(detail);
  //   } catch (error) {
  //     console.error("Error fetching detail:", error);
  //   }

  //   // 當前請求完成後，立即發起下一個
  //   await executeNext();
  // };

  // // 初始啟動n個並行請求
  // const initialPromises = Array(Math.min(concurrencyLimit, list.length))
  //   .fill(null)
  //   .map(() => executeNext());

  // await Promise.all(initialPromises);
};
</script>

<style></style>
