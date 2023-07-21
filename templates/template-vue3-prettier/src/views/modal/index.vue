<template>
    <context-holder />
    <a-button type="primary" @click="openModalFn">Open Modal</a-button>
    <Modal @register="registerModal" @success="handleSuccess" />
</template>

<script lang="ts" setup>
    import { useModal } from '@/components/Modal';
    import Modal from './Modal.vue';
    import useMessage from 'ant-design-vue/es/message/useMessage';

    const [ registerModal, { openModal } ] = useModal()

    const openModalFn = () => {
        openModal({
            id: '123',
            title: 'ceshi'
        })
    }

    const [ messageApi, contextHolder ] = useMessage()
    const handleSuccess = () => {
        messageApi.success('通知父组件')
    }
</script>
