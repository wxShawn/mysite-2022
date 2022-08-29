<template>
  <!-- 骨架 -->
  <div v-if="skeleton" class="p-4 h-40 flex flex-col gap-5 shadow-md bg-white rounded-xl animate-pulse">
    <div class="flex-1 bg-gray-200 rounded-md"></div>
    <div class="flex-2 bg-gray-200 rounded-md"></div>
  </div>

  <!-- 卡片 -->
  <div
    v-else
    class="relative flex flex-col overflow-hidden shadow-md bg-white rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
    @click="emitClick"
  >
    <div class="flex-1">
      <img v-if="cover" class="h-full w-full object-cover object-center" :src="cover" />
    </div>
    <div class="p-4 flex-1">
      <div class="mb-1 text-lg font-semibold text-gray-600">{{ title }}</div>
      <div class="mb-2 text-sm text-gray-400">{{ date }}</div>
      <div class="text-base text-gray-500 overflow-ellipsis line-clamp-3">
        {{ content }}
      </div>
    </div>
  </div>
  
</template>

<script setup>

const props = defineProps(['skeleton', 'cover', 'title', 'date', 'content']);
const emit = defineEmits(['click']);

// 上传click事件
const emitClick = () => {
  emit('click');
}
</script>