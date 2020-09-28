<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Name UZ" prop="name_uz">
          <a-input v-model="form.name_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Name RU" prop="name_ru">
          <a-input v-model="form.name_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Symbol" prop="symbol">
          <a-input v-model="form.symbol" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Status" prop="status">
          <a-input-number style="width: 100%" :min="0" v-model="form.status" />
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
export default {
  data () {
    return {
      id: null,
      form: {
        name_ru: '',
        name_uz: '',
        symbol: '',
        status: 10
      },
      rules: {
        name_ru: [{ required: true, message: 'Name RU Required', trigger: 'blur' }],
        name_uz: [{ required: true, message: 'Name UZ Required', trigger: 'blur' }],
        symbol: [{ required: true, message: 'Symbol Required', trigger: 'blur' }],
        status: [{ required: true, message: 'Status Required', trigger: 'blur' }],
      }
    }
  },
  methods: {
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            resolve({
              id: this.id ? this.id : undefined,
              data: this.form
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
