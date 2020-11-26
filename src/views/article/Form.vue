<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Title UZ" prop="title_uz">
          <a-input v-model="form.title_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Title RU" prop="title_ru">
          <a-input v-model="form.title_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Keyword UZ" prop="keywords_uz">
          <a-input v-model="form.keywords_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Keyword RU" prop="keywords_ru">
          <a-input v-model="form.keywords_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-form-model-item label="Content UZ" prop="content_uz">
<!--          <a-input v-model="form.content_uz" />-->
          <ckeditor :editor="editor" v-model="form.content_uz" ></ckeditor>
        </a-form-model-item>
      </a-col>
      <a-col :span="24">
        <a-form-model-item label="Content RU" prop="content_ru">
          <ckeditor :editor="editor" v-model="form.content_ru" ></ckeditor>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Description UZ" prop="description_uz">
          <a-input type="textarea" v-model="form.description_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Description RU" prop="description_ru">
          <a-input type="textarea" v-model="form.description_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  data () {
    return {
      id: null,
      ckEditor: null,
      editor: ClassicEditor,
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
        title_uz: [{ required: true, message: 'Title UZ Required', trigger: 'blur' }],
        title_ru: [{ required: true, message: 'Title UZ Required', trigger: 'blur' }],
        content_uz: [{ required: true, message: 'Content UZ Required', trigger: 'blur' }],
        content_ru: [{ required: true, message: 'Content RU Required', trigger: 'blur' }],
        keywords_uz: [{ required: true, message: 'Keywords UZ Required', trigger: 'blur' }],
        keywords_ru: [{ required: true, message: 'Keywords RU Required', trigger: 'blur' }],
        description_uz: [{ required: true, message: 'Description UZ Required', trigger: 'blur' }],
        description_ru: [{ required: true, message: 'Description RU Required', trigger: 'blur' }],
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
