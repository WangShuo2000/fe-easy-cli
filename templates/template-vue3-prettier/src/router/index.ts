import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/views/index.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Index,
        },
        {
            path: '/table',
            name: 'Table',
            component: () => import('@/views/list/index.vue'),
        },
        {
            path: '/modal',
            name: 'Modal',
            component: () => import('@/views/modal/index.vue'),
        },
        {
            path: '/combination',
            name: 'Combination',
            component: () => import('@/views/combination/index.vue')
        }
    ],
});

export default router;
