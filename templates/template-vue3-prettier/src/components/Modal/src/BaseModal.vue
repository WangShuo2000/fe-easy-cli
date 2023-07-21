<template>
    <Modal
        v-bind="getBindProperties"
        @cancel="handleCancel"
        @ok="handleOk"
        @afterClose="afterClose"
    >
        <template #title v-if="$slots.title">
            <slot name="title"></slot>
        </template>
        <div class="modal-wrapper">
            <slot></slot>
        </div>
        <template #footer v-if="$slots.footer">
            <slot name="footer"></slot>
        </template>
    </Modal>
</template>

<script lang="ts" setup>
    import { Modal, type ModalProps } from 'ant-design-vue';
    import { computed, ref, unref } from 'vue';
    import type { ModalCommonMethod } from './types/modal';
    import { modalBasicProps } from './props'

    defineOptions({
        name: 'BaseModal'
    })

    const outProps = defineProps(modalBasicProps)

    const emits = defineEmits(['register', 'ok', 'cancel', 'afterClose'])

    const openRef = ref<boolean>(false);
    const propsRef = ref<Partial<ModalProps>>()
    const getBindProperties = computed(() => {
        return {
            ...unref(propsRef),
            ...unref(outProps),
            open: unref(openRef)
        }
    })
    const handleOk = (e: MouseEvent) => {
        emits('ok', e)
    };
    const handleCancel = (e: MouseEvent) => {
        openRef.value = false
        emits('cancel', e)
    }
    const afterClose = () => {
        emits('afterClose')
    }

    const action: ModalCommonMethod = {
        setProps(props: Partial<ModalProps>) {
            propsRef.value = { ...unref(propsRef), ...props }
            Reflect.has(props, 'open') && (openRef.value = props.open!)
        }
    }

    emits('register', action)

</script>