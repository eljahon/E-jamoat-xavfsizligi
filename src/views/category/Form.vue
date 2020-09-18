<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-form-model-item ref="name" :label="$t('name')" prop="name">
      <a-input v-model="form.name" />
    </a-form-model-item>
    <a-form-model-item ref="order" :label="$t('order_number')" prop="order">
      <a-input-number style="width: 100%" :min="0" v-model="form.order" />
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  props: {
    edit: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data () {
    return {
      form: {
        name: '',
        order: null
      },
      item: null,
      rules: {
        name: [{ required: true, message: this.$t('name-validation'), trigger: 'blur' }],
        order: [{ required: true, message: this.$t('order-validation'), trigger: 'blur' }]
      }
    }
  },
  methods: {
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid === true) {
            resolve({
              valid: true,
              id: this.edit ? this.item.id : undefined,
              data: {
                active: true,
                name: this.form.name,
                order: this.form.order,
                lang: this.edit ? this.item.lang : 'ru',
                vendor_id: '5f4a2611c001ec0012f23596'
              }
            })
          } else reject(valid)
        })
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields();
    }
  }
}
</script>
