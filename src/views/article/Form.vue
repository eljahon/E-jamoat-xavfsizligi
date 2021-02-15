<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('name_uz')" prop="title_uz">
          <a-input v-model="form.title_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('name_ru')" prop="title_ru">
          <a-input v-model="form.title_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('keyword_uz')" prop="keywords_uz">
          <a-input v-model="form.keywords_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('keyword_ru')" prop="keywords_ru">
          <a-input v-model="form.keywords_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-form-model-item :label="$t('content_uz')" prop="content_uz">
<!--          <a-input v-model="form.content_uz" />-->
<!--          <ckeditor :editor="editor" v-model="form.content_uz" ></ckeditor>-->
        </a-form-model-item>
      </a-col>
      <a-col :span="24">
        <a-form-model-item :label="$t('content_ru')" prop="content_ru">
<!--          <ckeditor :editor="editor" v-model="form.content_ru" ></ckeditor>-->
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('description_uz')" prop="description_uz">
          <a-input type="textarea" v-model="form.description_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('description_ru')" prop="description_ru">
          <a-input type="textarea" v-model="form.description_ru" />
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
      ckEditor: null,
      form: {
        title_uz: '',
        title_ru: '',
        keywords_uz: '',
        keywords_ru: '',
        description_ru: '',
        description_uz: '',
        content_uz: '',
        content_ru: '',
      },
      rules: {
        title_uz: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        title_ru: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        content_uz: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        content_ru: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        keywords_uz: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        keywords_ru: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        description_uz: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        description_ru: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
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
              data: this.form,
            })
          } else reject(valid)
        })
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields();
    }
  },
  watch: {
    ckEditor (e) {
      console.log(e)
    }
  }
}
</script>
