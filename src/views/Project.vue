<template>
  <!-- <div class="mt-20 text-center text-purple-500">开发中...</div> -->
  <div class="py-5 flex flex-col gap-5">

    <div class="p-4 flex flex-wrap justify-between items-center bg-white shadow-md rounded-xl">
      <div class="text-purple-400 font-semibold select-none">Project</div>
      <!-- 搜索 -->
      <div class="flex gap-3">
        <input
          type="text" class="h-8 p-2 border border-purple-400 rounded-md outline-none text-sm"
          v-model="searchText"
        />
        <button
          class="px-2 flex items-center h-8 bg-purple-100 text-purple-600 text-lg rounded-md hover:bg-purple-400 hover:text-purple-50"
          @click="handleSearchClick"
        >
          <icon><search-outlined /></icon>
        </button>
      </div>
    </div>

    <div class="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <!-- 骨架 -->
      <card
        v-if="projectState === 'loading'"
        v-for="i in 12"
        :skeleton="true"
      />
      <!-- 文章 -->
      <card
        v-if="projectState === 'success'"
        v-for="project in projectList"
        :cover="project.cover"
        :title="project.name"
        :date="project.date"
        :content="project.content" 
        @click="handleProjectClick(project.url)" 
      />
    </div>

    <!-- 无结果 -->
    <div
      v-if="projectState === 'none'"
      class="mt-20 text-center text-purple-500"
    >No Result.</div>

  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { SearchOutlined } from '@vicons/antd';
import { Icon } from '@vicons/utils';
import api from '../request/api';
import Card from '../components/Card.vue';

/**
 * ********** search **********
 */
const searchText = ref('');
const handleSearchClick = () => {
  getData();
}

const projectList = reactive([]);

const getData = async () => {
  projectState.value = 'loading';
  const name = searchText.value;
  const data = await api.getProjects(1, 10, name);
  if (data.code === 0) {
    const { rows } = data.result;
    projectList.length = 0;
    for (let i = 0, len = rows.length; i < len; i++) {
      projectList.push({
        name: rows[i].name,
        date: new Date(rows[i].createdAt).toLocaleDateString(),
        content: rows[i].content,
        url: rows[i].url,
        cover: rows[i].cover,
      });
    }
    projectState.value = rows.length === 0 ? 'none' : 'success';
  }
}

onBeforeMount(() => {
  getData();
});

const handleProjectClick = (url) => {
  window.open(url, '_blank');
}

// 项目列表状态（'loading', 'success', 'none'）
const projectState = ref('loading');

</script>
