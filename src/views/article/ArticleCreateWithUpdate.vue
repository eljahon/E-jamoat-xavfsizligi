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
      <a-divider orientation="left">{{ $t('attachments') }}</a-divider>
      <div class="clearfix">
        <a-upload
          :custom-request="uploadImage"
          :before-upload="beforeUpload"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              {{ $t('upload') }}
            </div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </a-form-model>
    <a-divider></a-divider>
    <a-button @click="$router.push({ name: 'ArticleList' })" style="margin-right: 5px" type="danger" icon="close" ghost>{{ $t('cancel') }}</a-button>
    <a-button @click="clear" style="margin: 0 5px" type="primary" icon="redo" ghost>{{ $t('clear') }}</a-button>
    <a-button @click="saveDate" :loading="loading" style="margin-left: 5px" type="primary" icon="save">{{ $t('save') }}</a-button>
  </a-card>
</template>
<script>
import { mapActions } from 'vuex'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import uploadAdapter from '@/utils/ckUploadAdapter'
// import Image from '@ckeditor/ckeditor5-image/src/image'
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
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
      },
      previewVisible: false,
      previewImage: '',
      fileList: [],
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
      this.fileList = []
      this.$refs.ruleForm.resetFields()
    },
    saveDate() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.fileList.length > 1) {
            this.loading = true
            let _data = { ...this.form }
            _data.attachments = this.fileList.map(e => e.name)
            this.postArticle(_data).then(res => {
              console.log(res)
            })
              .finally(() => {
                this.loading = false
              })
          } else this.$message.error('Please Enter Attachments')
        }
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
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      console.log(fileList)
    },
    uploadImage(e) {
      console.log(e)
      this.imageUrl = null
      this.loadingImage = true
      this.$imageUp(e).then(res => {
        console.log(res)
        let a = {
          name: res.image,
          uid: res.image,
          status: 'done',
          url: res.image_url
        }
        this.fileList.push(a)
      })
        .catch(err => {
          let a = {
            uid: err.image,
            status: 'error'
          }
          this.fileList.push(a)
        })
        .finally(() => {
          this.loadingImage = false
        })
    },
    beforeUpload(file) {
      return this.$beforeUpImage(file)
    }
  }
}
</script>
<style>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
