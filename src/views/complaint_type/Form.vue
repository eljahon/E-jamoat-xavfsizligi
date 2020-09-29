<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Title RU" prop="title_ru">
          <a-input v-model="form.title_ru" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Title EN" prop="title_en">
          <a-input v-model="form.title_en" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Description RU">
          <a-input v-model="form.description_ru" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Description EN">
          <a-input v-model="form.description_en" />
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
        title_ru: '',
        title_en: '',
        description_ru: '',
        description_en: ''
      },
      rules: {
        title_ru: [{ required: true, message: 'Title RU Required', trigger: 'blur' }],
        title_en: [{ required: true, message: 'Title EN Required', trigger: 'blur' }],
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
      this.form.description_en = ''
      this.form.description_ru = ''
      this.$refs.ruleForm.resetFields();
    }
  }
}
</script>
