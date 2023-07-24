<template>
    <a-result status="404" title="404" sub-title="Sorry, this page is not existed">
        <template #extra>
            <a-button type="primary" @click="toHome">Back Home</a-button>
        </template>
  </a-result>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

defineOptions({
    name: 'NotFound'
})

const router = useRouter()

const toHome = () => {
    router.replace({
        name: 'Home'
    })
}
</script>