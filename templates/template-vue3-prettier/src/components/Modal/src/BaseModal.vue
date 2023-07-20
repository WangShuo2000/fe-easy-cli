<template>
    <Modal
        v-model:open="open"
        title="Basic Modal"
        @cancel="handleCancel"
        @ok="handleOk"
    />
</template>

<script lang="ts" setup>
    import { Modal } from 'ant-design-vue';
    import { ref } from 'vue';
    import type { ModalAction } from './types/modal';

    defineOptions({
        name: 'BaseModal'
    })

    const emits = defineEmits(['register'])

    const open = ref<boolean>(false);
    const handleOk = (e: MouseEvent) => {
        console.log(e);
        open.value = false;
    };
    const handleCancel = () => {
        
    }

    const action: ModalAction = {
        openModal() {
            open.value = true
        },
        closeModal() {
            open.value = false
        },
    }

    emits('register', action)

</script>