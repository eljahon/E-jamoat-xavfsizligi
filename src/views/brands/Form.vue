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
      <a-col :span="6">
        <a-form-model-item label="Image" prop="image">
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
                Image View
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
      </a-col>
      <a-col :span="5" :offset="1">
        <a-form-model-item label="Is Popular">
          <a-switch checked-children="Active" un-checked-children="Deactive" v-model="form.is_popular" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="0">
        <a-form-model-item label="Status" prop="status">
          <a-input-number style="width: 100%" :min="0" v-model="form.status" />
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
  data () {
    return {
      id: null,
      imageUrl: null,
      loadingImage: false,
      form: {
        name_uz: '',
        name_ru: '',
        logo: '',
        is_popular: true,
        status: 10
      },
      rules: {
        name_uz: [{ required: true, message: 'Name Required', trigger: 'blur' }],
        name_ru: [{ required: true, message: 'Name ru Required', trigger: 'blur' }],
        status: [{ required: true, message: 'Status Required', trigger: 'blur' }],
        logo: [{ required: true, message: 'Image Required', trigger: 'blur' }]
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
      this.imageUrl = null
      this.$refs.ruleForm.resetFields();
    },
    uploadImage(e) {
      console.log(e)
      this.loadingImage = true
      const image = new FormData()
      image.append('image', e.file)
      this.$store.dispatch('uploadData', image).then(res => {
        getBase64(e.file, imageUrl => {
          this.form.logo = res.data.path
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
