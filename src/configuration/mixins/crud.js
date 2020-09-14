export default {
    data() {
        return {
            loading: false
        }
    },
    methods: {
        $showFormLoading () {
            this.loading = true
        },
        $clearFormLoading () {
            this.loading = false
        }
    }
}