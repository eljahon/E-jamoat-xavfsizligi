<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('name_uz')" prop="name_uz">
          <a-input v-model="form.name_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('name_ru')" prop="name_ru">
          <a-input v-model="form.name_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('description')">
          <a-input v-model="form.description" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('keyword')">
          <a-input v-model="form.keyword" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="7">
        <a-form-model-item :label="$t('status')">
          <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="status" />
        </a-form-model-item>
      </a-col>
      <a-col :span="3" :offset="1">
        <a-form-model-item :label="$t('popular')">
          <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="form.is_popular" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('image')" prop="image">
          <a-upload
            :custom-request="uploadImage"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loadingImage ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                {{ $t('image_view') }}
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  props: {
    edit: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  watch: {
    status (val) {
      if (val) this.form.status = 10
      else this.form.status = 0
    }
  },
  data () {
    return {
      status: true,
      imageUrl: null,
      allData: null,
      loadingImage: false,
      form: {
        name_ru: '',
        name_uz: '',
        is_popular: true,
        description: '',
        image: null,
        keyword: '',
        status: 10
      },
      item: null,
      rules: {
        name_ru: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        name_uz: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        image: [{ required: true, message: this.$t('requiredField'), trigger: 'change' }]
      }
    }
  },
  methods: {
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid === true) {
            resolve({
              id: this.edit ? this.item.id : undefined,
              data: this.form
            })
          } else reject(valid)
        })
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields();
    },
    uploadImage(e) {
      console.log(e)
      this.loadingImage = true
      const image = new FormData()
      image.append('image', e.file)
      this.$store.dispatch('uploadData', image).then(res => {
        getBase64(e.file, imageUrl => {
          this.form.image = res.data.path
          this.imageUrl = imageUrl
        })
      })
        .catch(err => {
          console.log('FINALLLY')
          this.loadingImage = false
        })
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG, PNG file!')
      }
      return isJpgOrPng
    },
  }
}
</script>
<style>
img, .mask {
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 250px;
  height: auto;
  overflow: hidden;
}

.avatar-uploader > .ant-upload.ant-upload-select-picture-card {
  width: 150px;
  height: 150px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
