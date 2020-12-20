<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('categories')" prop="category_id">
          <a-select style="width: 100%" v-model="form.category_id">
            <a-select-option v-for="category in listCategory" :key="category.id" :value="category.id">
              {{ category.name_uz }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('brands')" prop="brand_id">
          <a-select style="width: 100%" v-model="form.brand_id">
            <a-select-option v-for="brand in allBrands" :key="brand.id" :value="brand.id">
              {{ brand.name_uz }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('key')" prop="key">
          <a-input v-model="form.key" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('order')" prop="order">
          <a-input-number style="width: 100%" v-model="form.order" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-divider>Images</a-divider>
    <a-row>
      <a-col style="margin-top: 5px; margin-bottom: 5px" v-for="(item, i) in items" :key="i" :span="7" :offset="i % 3 !== 0 ? 1 : 0">
        <a-tooltip>
          <template slot="title">
            {{ $t('delete') }}
          </template>
          <div v-if="items.length > 1" @click="removePhoto(i)" class="remove-image"><a-icon type="delete" class="icon"/></div>
        </a-tooltip>
        <a-form-model-item :label="$t('image')" prop="image">
          <a-upload
            list-type="picture-card"
            :custom-request="(e) => { uploadImage(e, i) }"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
          >
            <div v-if="item.url" class="upload-image">
              <img :src="item.url" alt="avatar" />
            </div>
            <div class="upload-empty" v-else>
              <a-icon v-if="!(item.loading && onUpload)" type="upload" style="font-size: 48px" />
              <a-progress v-if="item.loading && onUpload" :percent="progress" />
              <div v-if="!(item.loading && onUpload)" class="ant-upload-text">
                {{ $t('upload_photo') }}
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
        <div style="display: flex; margin-top: -40px; width: 100%;">
          <a-switch style="width: 50%; margin-right: 10px; margin-top: 5px" :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="item.status" />
          <a-input style="width: 50%" v-model="item.order" type="number" :placeholder="$t('order')"/>
        </div>
      </a-col>
      <a-col :span="2" :offset="1">
        <div @click="addPhoto" class="add-upload">
          <a-icon type="plus" style="font-size: 32px" />
          <p>{{ $t('add_photo') }}</p>
        </div>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
import { mapGetters } from 'vuex'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  data () {
    return {
      id: null,
      items: [
        {
          loading: false,
          url: null,
          image: '',
          status: true,
          order: null
        }
      ],
      form: {
        category_id: '',
        brand_id: '',
        key: '',
        order: null,
        items: []
      },
      rules: {
        category_id: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        brand_id: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        key: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        order: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }]
      }
    }
  },
  watch: {
    items (val) {
      console.log(val)
    }
  },
  methods: {
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.form.items = this.items.map(e => {
              return {
                image: e.image,
                status: e.status ? 10 : 0,
                order: e.order ? parseInt(e.order) : null
              }
            })
            this.form.order = parseInt(this.form.order)
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
      this.$refs.ruleForm.resetFields();
    },
    uploadImage(e, index) {
      console.log(e)
      this.items[index].url = null
      this.items[index].loading = true
      const image = new FormData()
      image.append('image', e.file)
      this.$store.dispatch('uploadData', image).then(res => {
        getBase64(e.file, imageUrl => {
          this.items[index].image = res.data.data.path
          this.items[index].url = imageUrl
        })
      })
        .catch(err => {
          console.log('FINALLLY')
          this.items[index].loading = false
        })
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG, PNG file!')
      }
      return isJpgOrPng
    },
    addPhoto() {
      this.items.push(
        {
          loading: false,
          url: null,
          image: '',
          status: true,
          order: null
        }
      )
    },
    removePhoto (i) {
      this.items.splice(i, 1)
    }
  },
  computed: {
    ...mapGetters(['listCategory', 'allBrands', 'progress', 'onUpload'])
  }
}
</script>
<style lang="less">
.remove-image {
  position: absolute;
  z-index: 10;
  top: 5%;
  right: 2%;
  cursor: pointer;
  .icon {
    font-size: 18px;
    color: #484747;
    transition: all, .5s;
    :hover {
      color: #D72323;
    }
  }
}
.upload-image {
  //height: 160px;
  height: 180px;
  width: 100%;
  object-fit: contain;
  img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.upload-empty {
  height: 180px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
.avatar-uploader > .ant-upload.ant-upload-select-picture-card {
  width: 100%;
  height: 180px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.add-upload {
  padding: 10px;
  text-align: center;
  margin-top: 90px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D72323;
  border-radius: 5px;
  flex-flow: column;
  color: white;
  font-size: 14px;
  transition: all, .4s;
  cursor: pointer;
}
.add-upload:hover {
  color: #999;
  background-color: white;
  border: 1px dashed #D72323;
}
.ant-upload {
  padding: 0;
}
</style>
