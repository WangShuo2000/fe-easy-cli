import { ref, computed } from "vue"

export const useLoading = () => {
    const loadingRef = ref<boolean>(false)

    const getLoading = computed(() => loadingRef.value)
    const setLoading = (loading: boolean) => {
        loadingRef.value = loading
    }

    return {
        getLoading,
        setLoading
    }
}