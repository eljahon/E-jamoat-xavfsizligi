<template>
  <div>
    <a-tabs type="card" v-model="activeKey">
      <a-tab-pane key="1" tab="main">
        <a-form-model ref="mainForm" :model="main" :rules="rules">
          <a-switch checked-children="Active" un-checked-children="Deactive" v-model="active" />
          <a-row>
            <a-col style="margin-right: 20px" :span="11">
              <a-form-model-item ref="name" :label="$t('name')" prop="name">
                <a-input v-model="main.name" />
              </a-form-model-item>
            </a-col>
            <a-col style="margin-left: 20px" :span="11">
              <a-form-model-item ref="name" label="Category" prop="category_id">
                <a-select v-model="main.category_id" style="width: 100%">
                  <a-select-option v-for="ct in category" :key="ct.id" :value="ct.id">
                    {{ ct.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col style="margin-right: 20px" :span="11">
              <a-form-model-item ref="name" label="Description">
                <a-input v-model="main.description" />
              </a-form-model-item>
            </a-col>
            <a-col style="margin-left: 20px" :span="11">
              <a-form-model-item ref="order" :label="$t('order_number')" prop="order">
                <a-input-number style="width: 100%" :min="0" v-model="main.order" />
              </a-form-model-item>
            </a-col>
            <a-col style="margin-right: 20px" :span="11">
              <a-form-model-item ref="order" label="Price" prop="price">
                <a-input-number style="width: 100%" :min="0" v-model="main.price" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-tab-pane>
      <a-tab-pane key="2" tab="image">
        <a-form-item label="Image">
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
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane key="3" tab="meta">
        <a-form-model ref="metaForm" :model="meta" :rules="rules">
          <a-row>
            <a-col style="margin-right: 20px" :span="11">
              <a-form-model-item ref="name" label="title" prop="title">
                <a-input v-model="meta.title" />
              </a-form-model-item>
            </a-col>
            <a-col style="margin-left: 20px" :span="11">
              <a-form-model-item ref="order" label="description">
                <a-input v-model="meta.description" />
              </a-form-model-item>
            </a-col>
            <a-col style="margin-right: 20px" :span="11">
              <a-form-model-item label="keywords">
                <input-tag style="margin: 0" v-model="meta.keywords"></input-tag>
<!--                <a-input v-model="meta.keywords" />-->
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </a-tab-pane>
      <a-tab-pane key="4" v-if="edit" tab="attributes">
        <a-card size="small" :title="$t('attrs_list')" style="width: 100%">
          <div slot="extra">
            <a-button size="small" type="primary" @click="addAttr">{{ $t('add') }}</a-button>
          </div>
          <attr-list v-if="item" :language="item.lang" :data="attrList" @delAttr="delAttr"></attr-list>
          <a-modal width="900px" centered v-model="visible" :maskClosable="false" @cancel="hide" :title="$t('add_attr')">
            <template slot="footer">
              <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
              <a-button html-type="submit" type="primary" @click="saveAttr">
                {{ $t('save') }}
              </a-button>
            </template>
            <div style="height: 300px;  overflow-y: scroll">
              <attr-form v-if="item" :language="item.lang" ref="attrForm"></attr-form>
            </div>
          </a-modal>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="5" tab="related Products">
        <a-select
          mode="multiple"
          style="width: 100%"
          placeholder="Please select"
          @change="relatedProducts"
        >
          <a-select-option v-for="prod in allProduct" :key="prod.id" :value="prod.id">
            {{ prod.name }}
          </a-select-option>
        </a-select>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import request from '@/utils/request'
import attrTable from './AttrList'
import attrForm from './AttrForm'
import { mapActions, mapGetters } from 'vuex'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

// eslint-disable-next-line no-unused-vars
function getBase64Gallery(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
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
  components: {
    'attr-list': attrTable,
    'attr-form': attrForm
  },
  data() {
    return {
      visible: false,
      activeKey: '1',
      main: {
        name: '',
        order: null,
        description: '',
        price: null,
        category_id: null
      },
      attrList: [],
      active: true,
      image: '',
      imageUrl: null,
      loadingImage: false,
      meta: {
        description: '',
        keywords: [],
        title: ''
      },
      item: null,
      rules: {
        name: [{ required: true, message: this.$t('name-validation'), trigger: 'blur' }],
        order: [{ required: true, message: this.$t('order-validation'), trigger: 'blur' }],
        category_id: [{ required: true, message: 'Select required', trigger: 'change' }],
        price: [{ required: true, message: 'Select required', trigger: 'blur' }],
        title: [{ required: true, message: 'Select required', trigger: 'blur' }]
      },
      relatedProductsList: []
    }
  },
  methods: {
    ...mapActions(['getAllAttrs']),
    addAttr () {
      console.log('attr')
      this.visible = true
    },
    saveAttr () {
      const attrId = this.$refs.attrForm.property_id
      const options = this.$refs.attrForm.options
      const type = this.$refs.attrForm.attrType
      if (attrId && options) {
        console.log(type)
        this.attrList.push({
          type: type,
          property_id: attrId,
          values: options
        })
      }
      this.hide()
    },
    hide () {
      this.$refs.attrForm.clear()
      this.visible = false
    },
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.mainForm.validate((validMain) => {
          if (validMain) {
            this.activeKey = '3'
            setTimeout(() => {
              if (this.$refs.metaForm) {
                this.$refs.metaForm.validate((validMeta) => {
                  if (validMeta) {
                    this.activeKey = '1'
                    resolve({
                      // eslint-disable-next-line no-undef
                      id: this.item ? this.item.id : undefined,
                      attributes: this.attrList.map(e => {
                        return {
                          property_id: e.property_id,
                          values: e.values
                        }
                      }),
                      data: {
                        active: this.active,
                        description: this.main.description,
                        image: this.image,
                        images: '',
                        lang: this.item ? this.item.lang : 'ru',
                        meta: this.meta,
                        name: this.main.name,
                        order: this.main.order,
                        price: this.main.price,
                        vendor_category_id: this.main.category_id,
                        related_products: this.relatedProductsList.toString(),
                        vendor_id: '5f4a2611c001ec0012f23596'
                      }
                    })
                    // eslint-disable-next-line prefer-promise-reject-errors
                  } else reject()
                })
              } else {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject()
                this.activeKey = '3'
              }
            }, 500)
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject()
            this.activeKey = '1'
          }
        })
      })
      // this.customValue()
      // return new Promise((resolve, reject) => {
      //   this.$refs.mainForm.validate((valid) => {
      //     // debugger
      //     if (valid) {
      //       resolve()
      //     } else reject(valid)
      //   })
      // })
    },
    clear () {
      this.main = {
          name: '',
            order: null,
          description: '',
          price: null,
          category_id: null
      }
      this.activeKey = '1'
      this.meta = {
        description: '',
        keywords: '',
        title: ''
      }
    },
    resetForm() {
      this.$refs.mainForm.resetFields()
      if (this.$refs.metaForm) this.$refs.metaForm.resetFields()
      this.item = null
      this.image = ''
      this.imageUrl = null
    },
    delAttr(item) {
      let index = this.attrList.indexOf(item)
      this.attrList.splice(index, 1)
    },
    relatedProducts (e) {
      this.relatedProductsList = e
      console.log(e)
    },
    // uploadGalleryImage (e) {
    //   console.log(e)
    //   var data = new FormData()
    //   data.append('file', e.file)
    //   request({
    //     url: '/upload',
    //     method: 'post',
    //     data: data
    //   }).then(response => {
    //     this.product.gallery.push(response.filename)
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },
    uploadImage(e) {
      this.loadingImage = true
      var data = new FormData()
      data.append('file', e.file)
      request({
        url: '/upload',
        method: 'post',
        data: data
      }).then(response => {
        console.log(response)
        getBase64(e.file, imageUrl => {
          this.imageUrl = imageUrl
        })
        this.loadingImage = false
        this.image = response.filename
      }).catch(error => {
        this.loadingImage = false
      })
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG, PNG file!')
      }
      return isJpgOrPng
    }
  },
  computed: {
    ...mapGetters(['allProduct']),
    category() {
      return this.$store.getters.allCategory
    }
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
