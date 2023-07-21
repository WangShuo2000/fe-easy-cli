<template>
    <BaseModal
        title="标题"
        @register="registerModal"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <!-- <template #title>
            插槽标题
        </template> -->
        <a-button @click="closeModal">关闭弹窗</a-button>
        <div>传递给弹窗的参数  {{ params }}</div>
    </BaseModal>
</template>

<script lang="ts" setup>
    import { BaseModal, useModalSelf } from '@/components/Modal';
    import { reactive } from 'vue';

    const emits = defineEmits(['register', 'success'])

    const params = reactive({})
    const [ registerModal, { closeModal, setProps } ] = useModalSelf((data: object) => {
        Object.assign(params, data)
    })

    const handleCancel = () => {
        console.log('处理取消')
    }

    const handleOk = async () => {
        setProps({ confirmLoading: true })
        try {
            setTimeout(() => {
                console.log('完成请求')
                emits('success')
                closeModal()
                setProps({ confirmLoading: false })
            }, 2000);
        } catch (error) {
            console.error(error)
        } finally {
            // setProps({ confirmLoading: false })
        }
    }
</script>