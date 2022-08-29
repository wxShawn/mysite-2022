<template>
  <div class="p-5 max-w-4xl bg-white shadow-md rounded-xl flex flex-col gap-5">
    <div class="">
      <div class="mb-2 text-lg">Search Posts</div>
      <div class="relative flex gap-2">
        <select
          class="
            absolute h-8 text-center text-sm text-purple-600
            border border-solid border-purple-400
            rounded-md rounded-r-none outline-none
          "
        >
          <option value="blog" selected>Blog</option>
          <option value="project">Project</option>
        </select>
        <input class="p-2 pl-20 h-8 outline-none border border-solid border-purple-400 rounded-md" type="text">
        <button class="px-2 h-8 bg-purple-400 text-purple-50 text-sm rounded-md hover:bg-purple-500">search</button>
      </div>
    </div>
    <hr />
    <div class="">
      <div class="mb-2 text-lg">Post Categories</div>
      <ul class="flex flex-wrap gap-2">
        <li
          class="text-base text-purple-400 hover:text-purple-600 cursor-pointer"
          v-for="category in categoryList"
          :key="category"
          @click="handleCategoryClick(category.id)"
        >{{ category.name }}</li>
      </ul>
    </div>
  </div>
  
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue';
import api from '../../request/api';

const categoryList = reactive([]);

const getCatgoryList = async () => {
  const data = await api.getPostCategories();
  if (data.code === 0) {
    const { rows } = data.result;
    for (let i = 0, len = rows.length; i < len; i++) {
      const id = rows[i].id;
      const name = rows[i].name;
      categoryList.push({ id, name });
    }
  }
}

onBeforeMount(() => {
  getCatgoryList();
});

const handleCategoryClick = (category) => {
  console.log('click', category);
}
</script>