import request from "../request";

export default {
  getPosts(page, pageSize, title, categoryId) {
    return request({
      method: 'get',
      url: '/articles',
      params: { page, pageSize, title, categoryId }
    });
  },

  getPostCategories(page, pageSize, name) {
    return request({
      method: 'get',
      url: '/categories',
      params: { page, pageSize, name }
    });
  },

  getProjects(page, pages, name) {
    return request({
      method: 'get',
      url: '/projects',
      params: { page, pages, name }
    });
  },
}