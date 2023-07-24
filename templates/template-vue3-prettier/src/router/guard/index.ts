import type { Router } from "vue-router"

export const setupRouterGuard = (router: Router) => {
    usePageGuard(router)
}

const usePageGuard = (router: Router) => {
    router.beforeEach((to, from, next) => {
        if (router.hasRoute(to.name!)) {
            next()
        } else {
            next('/notFound')
        }
    })
}