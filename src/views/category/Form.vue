<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item ref="name" label="Name UZ" prop="name_uz">
          <a-input v-model="form.name_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item ref="name" label="Name RU" prop="name_ru">
          <a-input v-model="form.name_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
<!--    <a-row>-->
<!--      <a-col :span="11">-->
<!--        <a-form-model-item ref="name" label="Category" prop="categories">-->
<!--          <a-select mode="multiple" v-model="form.categories" style="width: 100%">-->
<!--            <a-select-option value="jack">-->
<!--              Jack-->
<!--            </a-select-option>-->
<!--          </a-select>-->
<!--        </a-form-model-item>-->
<!--      </a-col>-->
<!--      <a-col :span="11" :offset="1">-->
<!--        <a-form-model-item label="Region" prop="region_id">-->
<!--          <a-select style="width: 100%" v-model="form.region_id">-->
<!--            <a-select-option value="jack">-->
<!--              Jack-->
<!--            </a-select-option>-->
<!--          </a-select>-->
<!--        </a-form-model-item>-->
<!--      </a-col>-->
<!--    </a-row>-->
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Description">
          <a-input v-model="form.description" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Keyword">
          <a-input v-model="form.keyword" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="7">
        <a-form-model-item label="Status" prop="status">
            <a-input-number style="width: 100%" :min="0" v-model="form.status" />
        </a-form-model-item>
      </a-col>
      <a-col :span="3" :offset="1">
        <a-form-model-item label="Popular">
          <a-switch checked-children="Active" un-checked-children="Deactive" v-model="form.is_popular" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Image" prop="file">
          <a-upload
            :custom-request="uploadImage"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Image View
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
  data () {
    return {
      imageUrl: null,
      allData: null,
      form: {
        name_ru: '',
        name_uz: '',
        is_popular: true,
        description: '',
        file: null,
        keyword: '',
        status: 10
      },
      item: null,
      rules: {
        name_ru: [{ required: true, message: 'Name ru Required', trigger: 'blur' }],
        name_uz: [{ required: true, message: 'Name uz Required', trigger: 'blur' }],
        file: [{ required: true, message: 'Image Required', trigger: 'change' }],
        status: [{ required: true, message: 'Status Required', trigger: 'blur' }]
      }
    }
  },
  methods: {
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid === true) {
            const dataPost = new FormData()
            dataPost.append('file', this.form.file)
            dataPost.append('name_ru', this.form.name_ru)
            dataPost.append('name_uz', this.form.name_uz)
            dataPost.append('is_popular', this.form.is_popular)
            dataPost.append('description', this.form.description)
            dataPost.append('keyword', this.form.keyword)
            dataPost.append('status', this.form.status)
            resolve({
              valid: true,
              id: this.edit ? this.item.id : undefined,
              data: dataPost
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
      this.form.file = e.file
      getBase64(e.file, imageUrl => {
        this.imageUrl = imageUrl
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
