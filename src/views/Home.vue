<template>

  <div class="py-5 grid grid-cols-1 gap-10">
    <div class="h-96 bg-home-banner bg-cover bg-center bg-fixed">
      <div class="h-full bg-purple-800 bg-opacity-30 flex justify-center items-center">
        <div class="text-white text-5xl">Hello World!</div>
      </div>
    </div>

    <!-- 最近文章 -->
    <div class="lg:container flex flex-col gap-5">
      <div class="p-4 bg-white text-purple-500 rounded-lg shadow-md select-none">最新文章</div>
      <div class="grid gap-5 grid-cols-1">
        <!-- 骨架 -->
        <card
          v-if="postLoading"
          :skeleton="true"
          v-for="i in 3"
        />
        <!-- 文章 -->
        <card
          v-else
          v-for="post in posts"
          :key="post"
          :title="post.title"
          :date="post.date"
          :content="post.content"
          @click.native="handlePostClick(post.id)"
        />
        
      </div>
    </div>

    <!-- 最近项目 -->
    <div class="lg:container flex flex-col gap-5">
      <div class="p-4 bg-white text-purple-500 rounded-lg shadow-md select-none">最新项目</div>
      <div class="grid gap-5 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        <!-- 骨架 -->
        <card
          v-if="projectLoading"
          :skeleton="true"
          v-for="i in 6"
        />
        <!-- 项目 -->
        <card
          v-else
          v-for="project in projects"
          :key="project"
          :cover="project.cover"
          :title="project.name"
          :date="project.date"
          :content="project.content"
        />
      </div>
    </div>

  </div>
  
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { marked } from 'marked';
import Card from '../components/Card.vue';
import api from '../request/api';
import { html2Text } from '../utils/utils';

// 最近文章
const posts = reactive([]);
const postLoading = ref(true);

// 获取最后几篇文章（默认6篇）
const getLatestPosts = async (num = 6) => {
  const data = await api.getPosts();
  if (data.code === 0) {
    const list = [];
    const { rows } = data.result;
    for (let i = 0, len = rows.length; i < len; i++) {
      if (len - i <= num) {
        const id = rows[i].id;
        const title = rows[i].title;
        const date = new Date(rows[i].createdAt).toLocaleDateString();
        const content = html2Text(marked(rows[i].content));
        list.push({
          id,
          title,
          date,
          content,
        });
      }
    }
    postLoading.value = false;
    return list;
  }
}

onBeforeMount(async () => {
  const list = await getLatestPosts(3);
  posts.push.apply(posts, list);
});

const handlePostClick = (id) => {
  console.log('click post ', id);
}

/**
 * 最近项目
 */
const projects = reactive([]);
const projectLoading = ref(true);

const getLatestProjects = async (num = 6) => {
  const data = await api.getProjects();
  if (data.code === 0) {
    const list = [];
    const { rows } = data.result;
    for (let i = 0, len = rows.length; i < len; i++) {
      if (len - i <= num) {
        list.push({
          id: rows[i].id,
          name: rows[i].name,
          date: new Date(rows[i].createdAt).toLocaleDateString(),
          content: html2Text(marked(rows[i].content)),
          url: rows[i].url,
          cover: rows[i].cover,
        });
      }
    }
    projectLoading.value = false;
    return list;
  }
}

onBeforeMount(async () => {
  const list = await getLatestProjects();
  projects.push.apply(projects, list);
});


</script>
