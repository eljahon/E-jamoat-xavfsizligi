<template>
  <a-card :title="$t('fill')">
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
            <ckeditor :config="editorConfig" :editor="editor" v-model="form.content_uz" ></ckeditor>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item :label="$t('content_ru')" prop="content_ru">
            <ckeditor :editor="editor" v-model="form.content_ru" ></ckeditor>
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
  </a-card>
</template>
<script>
import { mapActions } from 'vuex'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import uploadAdapter from '@/utils/ckUploadAdapter'
// import Image from '@ckeditor/ckeditor5-image/src/image'
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
export default {
  data() {
    return {
      loading: false,
      ckEditor: null,
      editor: ClassicEditor,
      editorConfig: {
        extraPlugins: [this.uploader],
        language: 'ru'
      },
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
  watch: {
    ckEditor (e) {
      console.log(e)
    }
  },
  methods: {
    ...mapActions(['getAllArticles', 'postArticle', 'updateArticle']),
    hide() {
      this.visible = false
      this.clear()
    },
    show(data) {
      if (this.editable) {
        console.log(data)
        console.log(this.$refs.articleEdit)
        setTimeout(() => {
          this.$refs.articleEdit.id = data.id
          this.$refs.articleEdit.form.name_uz = data.name_uz
          this.$refs.articleEdit.form.name_ru = data.name_ru
          this.$refs.articleEdit.form.symbol = data.symbol
          this.$refs.articleEdit.form.status = data.status
        }, 10)
        this.visible = true
      }
      if (!this.editable) {
        this.visible = true
      }
    },
    clear() {
      if (this.editable) {
        this.$refs.articleEdit.resetForm()
      } else {
        this.$refs.articleCreate.resetForm()
      }
    },
    saveDate() {
      this.$refs.articleCreate.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.postArticle(res.data).then(res => {
          this.getAllArticles(this.params)
          console.log(res)
          this.hide()
        })
          .finally(() => {
            this.loading = false
          })
      }).catch(error => {
        console.log(error, 'ERRROORRRRRRRRRRRR')
      })
    },
    updateData() {
      this.$refs.articleEdit.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.updateMeasure({
          id: res.id,
          data: res.data
        }).then(res => {
          this.getAllMeasures(this.params)
          this.hide()
          console.log(res)
        })
          .finally(() => {
            this.loading = false
          })
      })
    },
    uploader (editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        // eslint-disable-next-line
        return new uploadAdapter(loader)
      }
    }
  }
}
</script>
<style>

.flag-icon {
  min-width: 26px;
  min-height: 26px;
  border-radius: 50%;
  box-shadow: 0px 0px 4px black;
  margin-right: 2px;
  transform: translateY(-5px);
}
</style>
