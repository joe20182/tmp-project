<template>
  <section>
    <ClientOnly>
      <VideoCard :source="vQ6" />
    </ClientOnly>

    <section>
      <div v-for="match in matchList" :key="match.id" class="match-wrapper">
        <div class="title">{{ match.title }}</div>
        <div class="btn-wrapper">
          <div
            v-for="odds in match.odds"
            :key="odds.name"
            class="btn"
            :class="{ active: getIsActive(match.id, odds.odds) }"
            @click="handleSelect(match.id, odds.odds)"
          >
            {{ `${odds.name} ${odds.odds}` }}
          </div>
        </div>
      </div>
      <div class="result-wrapper">
        <div class="result-title">Select Odds:</div>
        <div class="result-value">{{ calculateResult }}</div>
      </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
import vQ6 from "@/assets/q6.mov";

defineOptions({
  name: "Q6",
});

/**
 * Team A vs Team B
 * Home Odds: 1.25
 * Away Odds: 3.75
 * Draw Odds: 10.00
 *
 * Team C vs Team D
 * Home Odds: 1.50
 * Away Odds: 2.50
 * Draw Odds: 12.00
 *
 * Team E vs Team F
 * Home Odds: 1.75
 * Away Odds: 2.25
 * Draw Odds: 8.00
 *
 * 請根據以上資料完成下列事項
 * 1. UI 切版
 * 2. 選取賽事後顯示總 Odds 計算結果 (選取的 Odds 相乘)
 * 3. 需要考慮 "互斥" 的狀況, 當狀況發生, 總 Odds 會變成一個範圍 (min~max)
 *
 * ** 互斥表示同一隊伍選擇多個結果, 這些結果不會同時發生, 因此稱為互斥 **
 *
 * e.g.
 * 情境1,
 * User 選擇 Team A 贏, Team C 贏, Team E 贏
 * 總 Odds 為 1.25 * 1.50 * 1.75 = 3.28125
 *
 * 情境2,
 * User 選擇 Team A 贏, Team C 贏, Team F 贏
 * 總 Odds 為 1.25 * 12.00 * 2.25 = 33.75
 *
 * 情境3 (互斥)
 * User 選擇 Team A 贏, Team B 贏, Team E 贏
 * 總 Odds-1 為 TeamA (1.25) * TeamE (1.75) = 2.1875
 * 總 Odds-2 為 TeamB (3.75) * TeamE (1.75) = 6.5625
 */

const matchList = ref([
  {
    id: 1,
    title: "Team A vs Team B",
    odds: [
      {
        name: "Home",
        odds: 1.25,
      },
      {
        name: "Away",
        odds: 3.75,
      },
      {
        name: "Draw",
        odds: 10.0,
      },
    ],
  },
  {
    id: 2,
    title: "Team C vs Team D",
    odds: [
      {
        name: "Home",
        odds: 1.5,
      },
      {
        name: "Away",
        odds: 2.5,
      },
      {
        name: "Draw",
        odds: 12.0,
      },
    ],
  },
  {
    id: 3,
    title: "Team E vs Team F",
    odds: [
      {
        name: "Home",
        odds: 1.75,
      },
      {
        name: "Away",
        odds: 2.25,
      },
      {
        name: "Draw",
        odds: 8.0,
      },
    ],
  },
]);
const matchSelected = ref<Record<string, Set<number>>>({});

const handleSelect = (matchId: number, odds: number) => {
  if (!matchSelected.value[matchId]) {
    matchSelected.value[matchId] = new Set();
  }
  const selected = matchSelected.value[matchId];
  if (selected.has(odds)) {
    selected.delete(odds);
  } else {
    selected.add(odds);
  }
};

const getIsActive = (matchId: number, odds: number) => {
  const selected = matchSelected.value[matchId] || new Set();
  return selected.has(odds);
};

const calculateResult = computed(() => {
  const matchOdds: number[][] = [];

  matchList.value.forEach((match) => {
    const selected = matchSelected.value[match.id];
    if (!selected || selected.size === 0) {
      matchOdds.push([1]);
    } else {
      matchOdds.push(Array.from(selected));
    }
  });

  const hasMultipleSelections = matchOdds.some((odds) => odds.length > 1);

  if (!hasMultipleSelections) {
    const total = matchOdds.reduce((acc, odds) => acc * (odds[0] || 1), 1);
    return total.toString();
  }

  let minTotal = Infinity;
  let maxTotal = -Infinity;

  const generateCombinations = (
    arrays: number[][],
    index = 0,
    current: number = 1
  ): void => {
    if (index === arrays.length) {
      minTotal = Math.min(minTotal, current);
      maxTotal = Math.max(maxTotal, current);
      return;
    }

    for (const odds of arrays[index] || []) {
      generateCombinations(arrays, index + 1, current * odds);
    }
  };

  generateCombinations(matchOdds);

  return `${minTotal}~${maxTotal}`;
});
</script>

<style scoped>
.match-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-bottom: 24px;
}

.title {
  font-size: 24px;
}

.btn-wrapper {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  width: 100%;
}

.btn {
  flex: 1;
  background-color: #fff;
  border-radius: 4px;
  padding: 16px 0;
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
}

.btn.active {
  background-color: #14c94b;
}

.result-wrapper {
  display: flex;
}
</style>
