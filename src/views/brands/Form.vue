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
        <a-form-model-item :label="$t('image')" prop="image">
          <a-upload
            :custom-request="uploadImage"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
          >
            <div v-if="imageUrl" class="upload-image">
              <img :src="imageUrl" alt="avatar" />
            </div>
            <div class="upload-empty" v-else>
              <a-icon v-if="!(loadingImage && onUpload)" type="upload" style="font-size: 48px" />
              <a-progress v-if="loadingImage && onUpload" :percent="progress" />
              <div v-if="!(loadingImage && onUpload)" class="ant-upload-text">
                {{ $t('upload_photo') }}
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
      </a-col>
      <a-col :span="5" :offset="1">
        <a-form-model-item :label="$t('popular')">
          <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="form.is_popular" />
        </a-form-model-item>
      </a-col>
      <a-col :span="6" :offset="1">
        <a-form-model-item :label="$t('status')">
          <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="status" />
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      id: null,
      imageUrl: null,
      loadingImage: false,
      status: true,
      form: {
        name_uz: '',
        name_ru: '',
        logo: '',
        is_popular: true,
        status: 10
      },
      rules: {
        name_uz: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        name_ru: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        status: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        // logo: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }]
      }
    }
  },
  watch: {
    status (val) {
      if (val) this.form.status = 10
      else this.form.status = 0
    }
  },
  computed: {
    ...mapGetters(['progress', 'onUpload'])
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
      this.loadingImage = false
      this.form.logo = ''
      this.$refs.ruleForm.resetFields();
    },
    uploadImage(e) {
      console.log(e)
      this.imageUrl = null
      this.loadingImage = true
      this.$imageUp(e).then(res => {
        this.form.logo = res.image
        this.imageUrl = res.image_url
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
</style>
