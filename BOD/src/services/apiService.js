import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log(`Received response from: ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
    }
);

// API service methods
export const apiService = {
    // Users
    getUsers: () => api.get('/users'),
    getUserById: (id) => api.get(`/users/${id}`),
    createUser: (user) => api.post('/users', user),
    updateUser: (id, user) => api.put(`/users/${id}`, user),
    deleteUser: (id) => api.delete(`/users/${id}`),

    // Posts
    getPosts: () => api.get('/posts'),
    getPostById: (id) => api.get(`/posts/${id}`),
    getPostsByUserId: (userId) => api.get(`/posts?userId=${userId}`),
    createPost: (post) => api.post('/posts', post),
    updatePost: (id, post) => api.put(`/posts/${id}`, post),
    deletePost: (id) => api.delete(`/posts/${id}`),

    // Albums
    getAlbums: () => api.get('/albums'),
    getAlbumById: (id) => api.get(`/albums/${id}`),
    getAlbumsByUserId: (userId) => api.get(`/albums?userId=${userId}`),
    createAlbum: (album) => api.post('/albums', album),
    updateAlbum: (id, album) => api.put(`/albums/${id}`, album),
    deleteAlbum: (id) => api.delete(`/albums/${id}`),

    // Todos
    getTodos: () => api.get('/todos'),
    getTodoById: (id) => api.get(`/todos/${id}`),
    getTodosByUserId: (userId) => api.get(`/todos?userId=${userId}`),
    createTodo: (todo) => api.post('/todos', todo),
    updateTodo: (id, todo) => api.put(`/todos/${id}`, todo),
    deleteTodo: (id) => api.delete(`/todos/${id}`),

    // Comments
    getComments: () => api.get('/comments'),
    getCommentsByPostId: (postId) => api.get(`/comments?postId=${postId}`),

    // Photos
    getPhotos: () => api.get('/photos'),
    getPhotosByAlbumId: (albumId) => api.get(`/photos?albumId=${albumId}`),
};

export default apiService;