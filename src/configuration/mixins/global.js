export default {
    methods: {
        $showLoading() {
            this.$store.commit('setLoading', true)
        },
        $clearLoading() {
            this.$store.commit('setLoading', false)
        },
        $setErrors({title = 'Ошибка', text = 'Произошла ошибка'}) {
            this.$notify({
                title,
                text,
                type: "error"
            })
        },
        $setResponseError({title = 'Ошибка', error}) {
            const text = error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message
            this.$notify({
                title,
                text,
                type: "error"
            })
        },
        $setSuccess({title, text, type}) {
            this.$notify({
                title: title,
                text: text,
                type
            })
        },
        $setFormError({error, obs}) {
            if (obs) {
                const errors = error.response && error.response.data && error.response.data.errors ? error.response.data.errors : {}
                obs.setErrors(errors)
            } else {
                console.warn(`Observer not found`)
            }

        }
    }
}