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
          <div class="upload" @click="uploadImage">
            <div v-if="imageUrl">
              <img :src="imageUrl" style="object-fit: cover" alt="avatar" />
            </div>
            <div v-else class="no-image">
              <a-icon style="font-size: 32px" :type="loadingImage ? 'loading' : 'plus'" />
            </div>
          </div>
        </a-form-model-item>
      </a-col>
    </a-row>
    <cropper ref="imageUpload" @save="saveImage"></cropper>
  </a-form-model>
</template>
<script>
import Cropper from '@/components/CropImageUpload/cropper'
export default {
  components: {
    'cropper': Cropper
  },
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
        name_ru: [{ required: true, message: 'Name ru Required', trigger: 'blur' }],
        name_uz: [{ required: true, message: 'Name uz Required', trigger: 'blur' }],
        image: [{ required: true, message: 'Image Required', trigger: 'change' }],
        status: [{ required: true, message: 'Status Required', trigger: 'blur' }]
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
    uploadImage() {
      this.$refs.imageUpload.show()
    },
    saveImage (e) {
      this.$refs.imageUpload.hide()
      this.loadingImage = true
      const image = new FormData()
      image.append('image', e.data)
      this.$store.dispatch('uploadData', image).then(res => {
        this.imageUrl = e.url
        this.form.image = res.data.path
      })
        .finally(() => {
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

.upload {
  width: 200px;
  height: 200px;
  cursor: pointer;
  transition: all 0.5s;
}
.upload::after {
  opacity: 0;
  transition: opacity .5s;
}
.upload:hover::after {
  width: 200px;
  height: 200px;
  opacity: 1;
  background-color: rgba(0,0,0, .2);
  content: '';
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
}
.upload .no-image {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position-x: -55px;
  background-image: url('../../assets/uploadPNG.png');
}
</style>
