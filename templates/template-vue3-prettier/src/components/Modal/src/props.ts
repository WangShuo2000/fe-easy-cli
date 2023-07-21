
export const modalBasicProps = {
    title: {
        type: String,
    },
    width: {
        type: String,
        default: '40%'
    },
    maskClosable: {
        type: Boolean,
        default: false
    },
    okText: {
        type: String,
        default: 'Ok'
    },
    cancelText: {
        type: String,
        default: 'cancel'
    },
    closable: {
        type: Boolean,
        default: true
    },
    wrapClassName: {
        type: String
    },
    zIndex: {
        type: Number
    }
}