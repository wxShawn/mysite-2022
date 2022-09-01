<template>
  <div class="py-5">
    <div class="mt-5 p-5 rounded-lg shadow-lg bg-white">
      <div
        class="markdown-body"
        v-html="post.content"
      ></div>
      <div class="mt-2 text-gray-400 text-sm">最后编辑时间：{{ post.updatedAt }}</div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router';
import 'github-markdown-css';
import 'highlight.js/styles/atom-one-dark.css';
import api from '../request/api';
import marked from '../utils/marked';

const route = useRoute();
const { id } = route.params;

const post = reactive({
  content: '',
  updatedAt: '',
});

const getPost = async (id) => {
  const data = await api.getPost(id);
  if (data.code === 0) {
    post.content = marked(data.result.content);
    post.updatedAt = new Date(data.result.updatedAt).toLocaleString();
  }
}

onBeforeMount(() => {
  getPost(id);
})
</script>

<style>
.markdown-body ul, .markdown-body ol {
  list-style: initial;
}
</style>