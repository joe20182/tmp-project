<template>
  <div>
    <h1 class="text-2xl font-bold">Q3</h1>
    <code-section code="Please review the code and provide any suggestions for improvement. Just like a code review you used to do." />

    <pre class="bg-gray-50/10 border border-[#00DC42]/50 dark:bg-white/5 flex flex-col gap-1 p-2 rounded-lg sm:col-span-2 my-4">
      <code>
        {{ getGiftTips }}
      </code>
    </pre>
  </div>
</template>

<script lang="ts" setup>
/**
 * q3:
 * @description 請 review 這段程式碼，並提供任何改進的建議。就像你過去做過的程式碼審查一樣。
 * @description Please review the code and provide any suggestions for improvement. Just like a code review you used to do.
 * 
 * @hint 請提供任何改進的建議，包括但不限於程式碼結構、可讀性、效能、安全性、可維護性等。
 * @hint Please provide any suggestions for improvement, including but not limited to code structure, readability, performance, security, etc.
 **/

defineOptions({
  name: 'Q3',
})

function getGiftTips(deviceScope) {
  let isSupportApp = 0,
    isSupportPc = 0,
    marker = 0,
    maskTips;

  if (deviceScope.includes(1)) {
    isSupportApp = 1;
  }
  if (deviceScope.includes(3)) {
    isSupportPc = 2;
  }

  if (deviceScope.includes(2)) {
    isSupportApp = 0;
    isSupportPc = 0;
  }

  marker = isSupportApp + isSupportPc;
  switch (marker) {
    case 1:
      maskTips = "Exclusive to the App / PC";
      break;
    case 2:
      maskTips = "Exclusive to the Mobile Web";
      break;
    case 3:
      maskTips = "Exclusive to the App / Mobile Web";
      break;
    default:
      maskTips = "";
  }

  return maskTips;
}

</script>

<style>

</style>