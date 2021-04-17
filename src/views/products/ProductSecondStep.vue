<template>
  <div>
    <!--    <a-divider>{{ $t('features.main') }}</a-divider>-->
    <a-card :title="$t('features.main')" style='margin: 5px 10px' size='small'>
      <a-button type='primary' slot='extra' @click='addProduct'>{{ $t('add') }}</a-button>
    </a-card>
    <a-row>
      <a-col v-for='(product, i) in products' :key='i' :span='12' style='padding: 0 10px; margin: 10px 0'>
        <a-card :title="$t('product') + ' ' + (i + 1)" size='small'>
          <a-icon v-if='products.length > 1' @click='removeProduct(i)' type='close' slot='extra'
                  style='color: red; font-size: 20px' />
          <a-row>
            <a-col v-for='(ft, f) in product.features' :key='f' :span='12' style='padding: 0 5px' size='small'>
              <a-form-model-item :label='ft.feature.name_ru'>
                <a-select style='width: 100%' v-model='ft.values.id'>
                  <a-select-option v-for='vl in ft.feature.values' :key='vl.id' :value='vl.id'>
                    {{ vl.value_uz }} - {{ vl.value_ru }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                v-if="ft.feature_id && !(ft.feature.type === 'dropdown' || ft.feature.type === 'radio' || ft.feature.type === 'checkbox')"
                :label='ft.feature.name_ru'>
                <a-input v-if="ft.feature.type === 'text'" v-model='ft.values.value'></a-input>
                <a-input v-if="ft.feature.type === 'number'" v-model='ft.values.value'></a-input>
                <a-input v-if="ft.feature.type === 'textarea'" type='textarea' v-model='ft.values.value'></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-form-model-item label='Артикуль' style='padding: 0 5px'>
            <a-input v-model='product.sku'></a-input>
          </a-form-model-item>
          <a-divider>{{ $t('features.upload.image') }}</a-divider>
          <draggable
            tag='a-row'
            v-bind='dragOptions'
            class='animated'
            :list='product.images'
          >
            <a-col class='animated' v-for='(item, j) in product.images' :key='j + 1' style='padding-left: 5px; padding-right: 5px' :span='6'>
              <a-tooltip>
                <template slot='title'>
                  {{ $t('delete') }}
                </template>
                <div v-if="product.images.length > 1 && item.image_url" @click='removePhoto(i, j)' class='remove-image'>
                  <a-icon type='delete' class='icon' />
                </div>
              </a-tooltip>
              <!--        <a-checkbox class="status" v-model="item.status">Active</a-checkbox>-->
              <a-form-model-item :label="(item.image_url ? $t('image') : '') + ' ' + (item.image_url ? (j +1) : $t('upload_photo'))" prop='image'>
                <div class='avatar-uploader attach'>
                  <div @click="$refs.fileManager.open(i, j)" v-if="item.image_url" class='upload-image'>
                    <img :src='item.image_url' alt='avatar' />
                  </div>
                  <div v-if="!item.image_url" @click="$refs.fileManager.open(i, j)" class='upload-empty'>
                    <a-icon type='upload' style='font-size: 48px' />
                    <div class='ant-upload-text'>
                      {{ $t('upload_photo') }}
                    </div>
                  </div>
                </div>
              </a-form-model-item>
            </a-col>
          </draggable>
        </a-card>
      </a-col>
    </a-row>

    <a-row style='margin: 20px 0'>
      <a-button type='primary' @click='saveProduct' :loading='loading'>
        {{ $route.name !== 'ProductsEdit' ? $t('save') : $t('update') }}
      </a-button>
      <a-button style='margin-left: 10px' @click='clear' type='primary' ghost>
        {{ $t('clear') }}
      </a-button>
    </a-row>
    <filemanager ref="fileManager" v-model="fileManagerData"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import { findDuplicates } from '@/utils/util'
import filemanager from '@/views/filemanager/index'

export default {
  components: {
    draggable,
    filemanager
  },
  data() {
    return {
      loading: false,
      fileManagerData: null,
      products: [
        {
          images: [
            {
              image_url: null,
              image: null
            }
          ],
          features: [],
          sku: ''
        }
      ]
    }
  },
  watch: {
    fileManagerData (val) {
      console.log(val)
      const indexes = val.indexes
      const _image = [ ...this.products[indexes.product_id].images ]
      console.log([...val.data, ..._image])
      this.products[indexes.product_id].images = [...val.data, ..._image]
    }
  },
  methods: {
    ...mapActions(['getMainFeatures', 'postProduct', 'getProductsById', 'updateProduct']),
    beforeUpload(file) {
      return this.$beforeUpImage(file)
    },
    removeProduct(i) {
      this.products.splice(i, 1)
    },
    clear() {
      this.products = [
        {
          images: [
            {
              loading: false,
              url: null,
              image: '',
              status: true
            }
          ],
          features: this.mainFeatures.map(e => {
            return {
              feature: e,
              feature_id: e.id,
              values: {
                id: null,
                value: null
              }
            }
          }),
          sku: ''
        }
      ]
    },
    addProduct() {
      this.products.push({
        images: [
          {
            loading: false,
            url: null,
            image: '',
            status: true
          }
        ],
        features: this.mainFeatures.map(e => {
          return {
            feature: e,
            feature_id: e.id,
            values: {
              id: null,
              value: null
            }
          }
        }),
        sku: ''
      })
    },
    removePhoto(productIndex, i) {
      this.products[productIndex].images.splice(i, 1)
    },
    skuValidate() {
      const _arr = this.products
      for (let i = 0; i < _arr.length; i++) {
        if (_arr[i].sku === '') return false
      }
      return true
    },
    saveProduct() {
      console.log(this.products)
      // eslint-disable-next-line no-unused-vars
      let _products = []
      _products = this.products.map(e => {
        return {
          id: e?.id,
          features: e.features.map(f => {
            return {
              feature_id: f.feature_id,
              value_id: f.values.id
            }
          }),
          sku: e.sku,
          attachments: e.images.filter(i => i.image_url).map(image => {
            return image.image
          })
        }
      })

      const hasDuplicates = findDuplicates(_products, product => product.features, this.equalsFeatures)

      // if (hasDuplicates) {
      //   alert('Dub bor')
      // }

      console.log(_products)
      if (this.skuValidate() && !hasDuplicates) {
        if (this.$route.name === 'ProductsEdit') {
          this.updateProduct({
            id: this.$route.query.productGroupId,
            data: {
              products: _products
            }
          }).then(res => {
            this.$message.success('Продукт успешно oбновлен')
            this.$router.push({
              name: 'ProductsList'
            })
          }).finally(() => {
            this.loading = false
          })
        } else {
          this.postProduct({
            id: this.$route.query.productGroupId,
            data: {
              products: _products
            }
          }).then(res => {
            this.$message.success('Продукт успешно создан')
            this.$router.push({
              name: 'ProductsList'
            })
          }).finally(() => {
            this.loading = false
          })
        }
      } else if (!this.skuValidate()) {
        this.$message.error('Артикуль не был выбран')
      } else if (hasDuplicates) this.$message.error('Некоторые продукты дублированы')
    },
    equalsFeatures(arr1, arr2) {
      // if (arr1 === arr2 || arr1.length !== 0 && arr2.length !== 0) return true
      if (arr1?.length === 0 && arr2?.length === 0) {
        return false
      }
      if (arr1.length !== arr2.length) return false
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].value_id !== arr2[i].value_id) {
          console.log('teng emas')
          return false
        }
      }
      return true

    }
  },
  computed: {
    ...mapGetters(['mainFeatures', 'onUpload', 'progress']),
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  mounted() {
    this.getMainFeatures(parseInt(this.$route.query.productGroupId)).then(res => {
      this.products[0].features = this.mainFeatures.map(e => {
        return {
          feature: e,
          feature_id: e.id,
          values: {
            id: null,
            value: null
          }
        }
      })
    })
    if (this.$route.name === 'ProductsEdit') {
      this.getProductsById(this.$route.query.productGroupId).then(res => {
        console.log(res)
        this.products = res.map(p => {
          let _images = []
          for (let i = 0; i < p.attachments.length; i++) {
            for (let j = 0; j < p.images.length; j++) {
              if (p.images[j].indexOf(p.attachments[i]) > 0) {
                _images.push({
                  image_url: p.images[j],
                  image: p.attachments[i]
                })
              }
            }
          }
          _images.push({
            image_url: null,
            image: null
          })
          return {
            id: p.id,
            sku: p.sku,
            features: p.product_feature_values,
            images: _images
          }
        })
        console.log(this.products)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.attach {
  border: 1px solid #d9d9d9;
  border-radius: 3px;
}
.remove-image {
  position: absolute;
  z-index: 5;
  top: 4%;
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

.status {
  position: absolute;
  z-index: 5;
  top: 4%;
  right: 10%;
  cursor: pointer;
}

.upload-image {
  //height: 160px;
  height: 120px;
  width: 100%;
  object-fit: contain;
  cursor: pointer;
  img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.upload-empty {
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  cursor: pointer;
}

.avatar-uploader > .ant-upload.ant-upload-select-picture-card {
  border: 1px solid gray;
  width: 100%;
  height: 120px;
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
  width: 100px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D72323;
  border-radius: 5px;
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
