<template>
  <div>
    <!--    <a-divider>{{ $t('features.main') }}</a-divider>-->
    <a-card :title="$t('features.main')" style='margin: 5px 10px' size='small'>
      <a-button type='primary' slot='extra' @click='addProduct'>{{ $t('add') }}</a-button>
    </a-card>
    <a-row>
      <a-col v-for='(product, i) in products' :key='i' :span='12' style='padding: 0 10px; margin: 10px 0'>
        <a-card :title="$t('product') + ' ' + (i + 1)" size='small'>
          <a-icon v-if='products.length > 1' @click='removeProduct(i)' type="close" slot='extra' style='color: red; font-size: 20px'/>
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
            <a-col class='animated' v-for='(item, j) in product.images' :key='j + 1'
                   style='padding-left: 5px; padding-right: 5px' :span='6'>
              <a-tooltip>
                <template slot='title'>
                  {{ $t('delete') }}
                </template>
                <div v-if='product.images.length > 1 && item.url' @click='removePhoto(i, j)' class='remove-image'>
                  <a-icon type='delete' class='icon' />
                </div>
              </a-tooltip>
              <!--        <a-checkbox class="status" v-model="item.status">Active</a-checkbox>-->
              <a-form-model-item :label="$t('image') + ' ' + (j +1)" prop='image'>
                <a-upload
                  list-type='picture-card'
                  :custom-request='(e) => { uploadImage(e, i, j) }'
                  class='avatar-uploader'
                  :show-upload-list='false'
                  :before-upload='beforeUpload'
                >
                  <div v-if='item.url' class='upload-image'>
                    <img :src='item.url' alt='avatar' />
                  </div>
                  <div class='upload-empty' v-else>
                    <a-icon v-if='!(item.loading && onUpload)' type='upload' style='font-size: 48px' />
                    <a-progress v-if='item.loading && onUpload' :percent='progress' />
                    <div v-if='!(item.loading && onUpload)' class='ant-upload-text'>
                      {{ $t('upload_photo') }}
                    </div>
                  </div>
                </a-upload>
              </a-form-model-item>
            </a-col>
          </draggable>
        </a-card>
      </a-col>
    </a-row>

    <a-row style='margin: 20px 0'>
      <a-button type='primary' @click='saveProduct' :loading='loading'>
        {{ $t('save') }}
      </a-button>
      <a-button style='margin-left: 10px' @click='clear' type='primary' ghost>
        {{ $t('clear') }}
      </a-button>
    </a-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import { findDuplicates } from '@/utils/util'

export default {
  components: {
    draggable
  },
  data() {
    return {
      loading: false,
      products: [
        {
          images: [
            {
              loading: false,
              url: null,
              image: '',
              status: true
            }
          ],
          features: [],
          sku: ''
        }
      ]
    }
  },
  methods: {
    ...mapActions(['getMainFeatures', 'postProduct']),
    uploadImage(e, productIndex, i) {
      console.log(e)
      this.products[productIndex].images[i].url = null
      this.products[productIndex].images[i].loading = true
      this.$imageUp(e).then(res => {
        console.log(res)
        this.products[productIndex].images[i].image = res.image
        this.products[productIndex].images[i].url = res.image_url
        this.products[productIndex].images.push({
          loading: false,
          url: null,
          image: '',
          status: true
        })
      })
        .finally(() => {
          this.products[productIndex].images[i].loading = false
        })
    },
    beforeUpload(file) {
      return this.$beforeUpImage(file)
    },
    removeProduct (i) {
      this.products.splice(i, 1)
    },
    clear () {
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
    skuValidate () {
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
          features: e.features.map(f => {
            return {
              feature_id: f.feature_id,
              value_id: f.values.id
            }
          }),
          sku: e.sku,
          attachments: e.images.filter(i => i.url).map(image => {
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
      } else if (!this.skuValidate()) this.$message.error('Артикуль не был выбран')
      else if (hasDuplicates) this.$message.error('Некоторые продукты дублированы')
    },

    equalsFeatures(arr1, arr2) {
      if (arr1 === arr2) return true
      if (arr1.length !== arr2.length) return false
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].value_id !== arr2[i].value_id) {
          console.log('teng emas')
          return false
        }
      }
      return true;

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
  }
}
</script>

<style lang='less'>
.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
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
}

.avatar-uploader > .ant-upload.ant-upload-select-picture-card {
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
