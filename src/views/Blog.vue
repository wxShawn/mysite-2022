<template>
  <div class="py-5 flex flex-col gap-5">
    
    <div class="p-4 flex flex-wrap gap-2 justify-between items-center bg-white shadow-md rounded-xl">
      <!-- 分类 -->
      <ul class="flex flex-wrap gap-x-3 gap-y-1">
        <div class="text-purple-400 font-semibold select-none">Blog</div>
        <li
          class="text-gray-400 hover:text-purple-400 cursor-pointer"
          :class="{ 'text-purple-400': currentCategory === category.id }"
          v-for="category in categories"
          :key="category"
          @click="handleCategoryClick(category.id)"
        >{{ category.name }}</li>
      </ul>
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

    <!-- 骨架 -->
    <card
      v-if="postsState === 'loading'"
      v-for="i in 6"
      :skeleton="true"
    />
    <!-- 文章 -->
    <card
      v-if="postsState === 'success'"
      v-for="post in posts"
      :title="post.title"
      :date="post.date"
      :content="post.content"  
    />
    <!-- 无结果 -->
    <div
      v-if="postsState === 'none'"
      class="mt-20 text-center text-purple-500"  
    >No Result.</div>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { marked } from 'marked';
import { SearchOutlined } from '@vicons/antd';
import { Icon } from '@vicons/utils';
import Card from '../components/Card.vue';
import api from '../request/api';
import { html2Text } from '../utils/utils';

/**
 * 分类
 */
// 分类列表
const categories = reactive([]);
// 获取分类列表
const getCatgories = async () => {
  const data = await api.getPostCategories();
  if (data.code === 0) {
    categories.push({ id: 0, name: 'All' });
    const { rows } = data.result;
    for (let i = 0, len = rows.length; i < len; i++) {
      const id = rows[i].id;
      const name = rows[i].name;
      categories.push({ id, name });
    }
  }
}
onBeforeMount(() => {
  getCatgories();
});
// 当前选中分类
const currentCategory = ref(0);
// 处理分类点击事件
const handleCategoryClick = (id) => {
  currentCategory.value = id;
  getPosts();
}

/**
 * 搜索
 */
const searchText = ref('');
const handleSearchClick = () => {
  getPosts();
}

/**
 * 文章
 */
const posts = reactive([]);

const getPosts = async (page, pageSize) => {
  postsState.value = 'loading';
  const title = searchText.value;
  const categoryId = currentCategory.value;
  const data = await api.getPosts(page, pageSize, title, categoryId);
  if (data.code === 0) {
    const { rows } = data.result;
    posts.length = 0;
    for (let i = 0, len = rows.length; i < len; i++) {
      const id = rows[i].id;
      const title = rows[i].title;
      const date = new Date(rows[i].createdAt).toLocaleDateString();
      const content = html2Text(marked(rows[i].content));
      posts.push({
        id,
        title,
        date,
        content,
      });
    }
    postsState.value = posts.length === 0 ? 'none' : 'success';
  }
}

onBeforeMount(() => {
  getPosts();
});

// 文章列表状态（'loading', 'success', 'none'）
const postsState = ref('loading');

</script>
