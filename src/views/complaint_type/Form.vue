<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('name_ru')" prop="title_ru">
          <a-input v-model="form.title_ru" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('name_uz')" prop="title_en">
          <a-input v-model="form.title_en" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('description_ru')">
          <a-input type="textarea" v-model="form.description_ru" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('description_uz')">
          <a-input type="textarea" v-model="form.description_en" />
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
        title_ru: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        title_en: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
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
