<template>
    <a-button type="primary" @click="openModal">Open Modal</a-button>
    <Modal @register="registerModal" />
</template>

<script lang="ts" setup>
    import { useModal } from '@/components/Modal';
    import Modal from './Modal.vue';

    const [ registerModal, { openModal } ] = useModal()
</script>
