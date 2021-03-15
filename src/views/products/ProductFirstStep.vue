<template>
  <a-card size='small' :title="$t('fill')">
    <a-switch checked-children='Active' slot='extra' un-checked-children='Deactivated' v-model='status' />
    <a-form-model
      @submit.prevent='saveData'
      ref='ruleForm'
      :model='form'
      :rules='rules'
    >
      <a-row>
        <a-col :span='8' style='padding-right: 10px'>
          <a-form-model-item :label="$t('name_uz')" prop='name_uz'>
            <a-input v-model='form.name_uz' />
          </a-form-model-item>
        </a-col>
        <a-col :span='8' style='padding: 0 10px'>
          <a-form-model-item :label="$t('name_ru')" prop='name_ru'>
            <a-input v-model='form.name_ru' />
          </a-form-model-item>
        </a-col>
        <a-col :span='8' style='padding-left: 10px'>
          <a-form-model-item :label="$t('keyword')" prop='keywords'>
            <a-input v-model='form.keywords' />
          </a-form-model-item>
        </a-col>
        <a-col :span='8' style='padding-right: 10px'>
          <a-form-model-item :label="$t('categories')" prop='category_id'>
            <a-tree-select
              v-model='form.category_id'
              :treeData='treeCategory'
              style='width: 100%'
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :placeholder="$t('category')"
              allow-clear
            />
<!--            <a-select style='width: 100%' v-model='form.category_id'>-->
<!--              <a-select-option v-for='(c, i) in listCategory' :key="'category' + i" :value='c.id'>-->
<!--                {{ c.name_ru }}-->
<!--              </a-select-option>-->
<!--            </a-select>-->
          </a-form-model-item>
        </a-col>
        <a-col :span='8' style='padding: 0 10px'>
          <a-form-model-item :label="$t('brands')" prop='brand_id'>
            <a-select style='width: 100%' v-model='form.brand_id' show-search :filter-option='filterOption'>
              <a-select-option v-for='(b, i) in allBrands' :key="'brand' + i" :value='b.id'>
                {{ b.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span='8' style='padding-left: 10px'>
          <a-form-model-item :label="$t('measures')" prop='measure_id'>
            <a-select style='width: 100%' v-model='form.measure_id' show-search :filter-option='filterOption'>
              <a-select-option v-for='(m, i) in allMeasures' :key="'measure' + i" :value='m.id'>
                {{ m.name_ru }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span='24'>
          <a-form-model-item :label="$t('description')" prop='description'>
            <a-input type='textarea' @input='event => form.description = event.target.value' />
<!--            <a-input type='textarea' v-model='form.description' />-->
          </a-form-model-item>
        </a-col>
<!--        <a-col :span='24'>-->
<!--          <a-form-model-item :label="$t('content_uz')" prop='content_uz'>-->
<!--            <editor-->
<!--              ref='uz'-->
<!--              v-model='form.content_uz'-->
<!--              api-key='43hzrms710evup3megfjv61a1a2mutt7dtqur4smu4bvp5jf'-->
<!--              :init="{-->
<!--             height: 500,-->
<!--             menubar: 'insert',-->
<!--             selector: 'textarea',-->
<!--             a11y_advanced_options: true,-->
<!--             image_title: true,-->
<!--             automatic_uploads: true,-->
<!--             images_upload_handler: this.uploader,-->
<!--             plugins: [-->
<!--                'advlist autolink lists link image charmap print preview anchor',-->
<!--                'searchreplace visualblocks code fullscreen',-->
<!--                'insertdatetime media table paste imagetools wordcount'-->
<!--             ],-->
<!--             toolbar:-->
<!--               'undo redo | formatselect | bold italic backcolor | \-->
<!--               alignleft aligncenter alignright alignjustify | image media | \-->
<!--               bullist numlist outdent indent | removeformat | help',-->
<!--          }"-->
<!--            />-->
<!--            &lt;!&ndash;            <a-input type="textarea" v-model="form.content_uz" />&ndash;&gt;-->
<!--          </a-form-model-item>-->
<!--        </a-col>-->
<!--        <a-col :span='24'>-->
<!--          <a-form-model-item :label="$t('content_ru')" prop='content_ru'>-->
<!--            <editor-->
<!--              ref='uz'-->
<!--              v-model='form.content_ru'-->
<!--              api-key='43hzrms710evup3megfjv61a1a2mutt7dtqur4smu4bvp5jf'-->
<!--              :init="{-->
<!--             height: 500,-->
<!--             menubar: 'insert',-->
<!--             selector: 'textarea',-->
<!--             a11y_advanced_options: true,-->
<!--             image_title: true,-->
<!--             automatic_uploads: true,-->
<!--             images_upload_handler: this.uploader,-->
<!--             plugins: [-->
<!--                'advlist autolink lists link image charmap print preview anchor',-->
<!--                'searchreplace visualblocks code fullscreen',-->
<!--                'insertdatetime media table paste imagetools wordcount'-->
<!--             ],-->
<!--             toolbar:-->
<!--               'undo redo | formatselect | bold italic backcolor | \-->
<!--               alignleft aligncenter alignright alignjustify | image media | \-->
<!--               bullist numlist outdent indent | removeformat | help',-->
<!--          }"-->
<!--            />-->
<!--            &lt;!&ndash;            <a-input type="textarea" v-model="form.content_ru" />&ndash;&gt;-->
<!--          </a-form-model-item>-->
<!--        </a-col>-->
      </a-row>
      <a-divider v-if='form.features.length > 0'>{{ $t('features') }}</a-divider>
      <a-row>
        <a-col
          :span='8'
          v-for='(ft, f) in form.features'
          :key='f'
          :style='style(f)'
        >
          <div v-if="ft.feature.type === 'dropdown' || ft.feature.type === 'checkbox'" style='width: 100%'>
            <a-form-model-item :label='ft.feature.name_ru'>
              <a-select style='width: 100%' v-model='ft.value.id'>
                <a-select-option v-for='vl in ft.feature.values' :key='vl.id' :value='vl.id'>
                  {{ vl.value_ru }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </div>
          <div v-if="ft.feature.type === 'radio'" style='width: 100%'>
            <a-form-model-item :label='ft.feature.name_ru'>
              <a-radio-group name='radioGroup' v-model='ft.value.id'>
                <a-radio v-for='vl in ft.feature.values' :key="'radio' + vl" :value='vl.id'>
                  {{ vl.value_ru }}
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </div>
          <div v-if="!(ft.feature.type === 'radio' || ft.feature.type === 'dropdown' || ft.feature.type === 'checkbox')"
               style='width: 100%'>
            <a-form-model-item :label='ft.feature.name_ru'>
              <a-input v-if="ft.feature.type === 'text'" v-model='ft.value.value'></a-input>
              <a-input v-if="ft.feature.type === 'number'" v-model='ft.value.value'></a-input>
              <a-input v-if="ft.feature.type === 'textarea'" type='textarea' v-model='ft.value.value'></a-input>
            </a-form-model-item>
          </div>
          <div v-if="ft.feature.type === 'date'" style='width: 100%'>
            <a-form-model-item :label='ft.feature.name_ru'>
              <a-date-picker :placeholder="$t('select_data')" v-model='ft.value.value' valueFormat='YYYY-MM-DD'
                             format='YYYY-MM-DD' />
            </a-form-model-item>
          </div>
          <div v-if="ft.feature.type === 'datetime'" style='width: 100%'>
            <a-form-model-item :label='ft.feature.name_ru'>
              <a-row>
                <a-col :span='11'>
                  <a-date-picker :placeholder="$t('select_data')" v-model='ft.value.value' valueFormat='YYYY-MM-DD'
                                 format='YYYY-MM-DD' />
                </a-col>
                <a-col :span='11' :offset='2'>
                  <a-time-picker valueFormat='HH:mm' format='HH:mm' />
                </a-col>
              </a-row>
            </a-form-model-item>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-button type='primary' html-type='submit' :loading='loading'>
          {{ $route.name === 'ProductsEdit' ? $t('update') : $t('save') }}
        </a-button>
        <a-button style='margin-left: 10px' @click='$refs.ruleForm.resetFields()' type='primary' ghost>
          {{ $t('clear') }}
        </a-button>
      </a-row>
    </a-form-model>
  </a-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import Editor from '@tinymce/tinymce-vue'
// import storage from 'store'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
import { TreeSelect } from 'ant-design-vue'

export default {
  components: {
    // 'editor': Editor,
    'a-tree-select': TreeSelect
  },
  data() {
    return {
      loading: false,
      status: true,
      form: {
        measure_id: null,
        category_id: null,
        brand_id: null,
        keywords: null,
        name_ru: null,
        name_uz: null,
        content_ru: null,
        content_uz: null,
        description: null,
        status: 10,
        features: []
      },
      rules: {
        measure_id: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        category_id: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        brand_id: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        name_uz: [{ required: true, message: this.$t('required'), trigger: 'blur' }],
        name_ru: [{ required: true, message: this.$t('required'), trigger: 'blur' }],
        status: [{ required: true, message: this.$t('required'), trigger: 'change' }]
      }
    }
  },
  watch: {
    status(val) {
      this.form.status = val ? 10 : 0
    },
    'form.description': function(val) {
      console.log(val)
    },
    'form.category_id': function(val) {
      if (val) {
        this.getCategoryFeatures(val).then(res => {
          this.form.features = res.data.map(e => {
            return {
              feature: e,
              feature_id: e.id,
              value: {
                id: null,
                value: null
              }
            }
          })
          console.log(res)
          console.log(this.form.features)
        })
      }
    }
  },
  computed: {
    ...mapGetters(['allBrands', 'listCategory', 'allMeasures', 'categoryFeatures']),
    treeCategory () {
      return this.treeDataMap(this.listCategory)
    }
  },
  methods: {
    ...mapActions(['updateProductGroup', 'postProduct', 'updateProduct', 'postProductGroup', 'getAllProduct', 'getCategoryFeatures', 'getAllMeasures', 'getListCategory', 'getAllBrandsList', 'getProductGroupById']),
    saveData() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          let _form = { ...this.form }
          let f = []
          for (let i = 0; i < _form.features.length; i++) {
            if (_form.features[i].value.id || _form.features[i].value.value) {
              f.push({
                feature_id: _form.features[i].feature_id,
                value_id: _form.features[i].value.id,
                value: _form.features[i].value.value
              })
            }
          }
          _form.features = f
          if (this.$route.name === 'ProductsEdit') {
            this.updateProductGroup({
              id: this.$route.query.group_id,
              data: _form
            }).then((res) => {
              this.$message.success('Updated Successfully')
              this.$router.push({
                name: 'ProductsEdit',
                params: {
                  step: '2'
                },
                query: {
                  productGroupId: res
                }
              }).finally(() => {
                this.loading = false
              })
            })
          } else {
            this.postProductGroup(_form).then((res) => {
              this.$message.success('Created Successfully')
              this.$router.push({
                name: 'ProductsCreate',
                params: {
                  step: '2'
                },
                query: {
                  productGroupId: res
                }
              }).finally(() => {
                this.loading = false
              })
            })
          }
        }
      })
    },
    treeDataMap (category) {
      return category.map((c) => {
        if (!c.children) {
          return {
            title: c.name_uz + ' - ' + c.name_ru,
            value: c.id
          }
        } else {
          return {
            title: c.name_uz + ' - ' + c.name_ru,
            value: c.id,
            children: this.treeDataMap(c.children)
          }
        }
      })
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    // uploader: function(blobInfo, success, failure, progress) {
    //   let xhr, formData
    //
    //   xhr = new XMLHttpRequest()
    //   xhr.withCredentials = false
    //   xhr.open('POST', `${process.env.VUE_APP_API_BASE_URL}/admin/category/upload`)
    //
    //   xhr.upload.onprogress = function(e) {
    //     progress((e.loaded / e.total) * 100)
    //   }
    //
    //   xhr.onload = function() {
    //     var json
    //
    //     if (xhr.status === 403) {
    //       failure('HTTP Error: ' + xhr.status, { remove: true })
    //       return
    //     }
    //
    //     if (xhr.status < 200 || xhr.status >= 300) {
    //       failure('HTTP Error: ' + xhr.status)
    //       return
    //     }
    //
    //     json = JSON.parse(xhr.responseText)
    //     console.log('json', json)
    //     console.log('xhr.responseText', xhr.responseText)
    //
    //     if (!json || typeof json.data.path !== 'string') {
    //       failure('Invalid JSON: ' + xhr.responseText)
    //       return undefined
    //     }
    //     success(json.data.full_url)
    //   }
    //
    //   xhr.onerror = function() {
    //     failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status)
    //   }
    //
    //   formData = new FormData()
    //   formData.append('image', blobInfo.blob(), blobInfo.filename())
    //
    //   console.log('formData', formData)
    //   xhr.setRequestHeader('Authorization', storage.get(ACCESS_TOKEN))
    //   xhr.send(formData)
    // },
    changeFt(val, f) {
      this.form.features[f].feature_id = val
      for (let i = 0; i < this.categoryFeatures.length; i++) {
        if (this.categoryFeatures[i].id === val) {
          this.form.features[f].feature = this.categoryFeatures[i]
        }
      }
    },
    addFeatures() {
      if (this.categoryFeatures.length > 1) {
        if (this.categoryFeatures.length > this.form.features.length) {
          this.form.features.push({
            feature: null,
            feature_id: null,
            values: [{
              id: null,
              value: null
            }]
          })
        }
      }
    },
    removeValue(f, v) {
      this.form.features[f].values.splice(v, 1)
    },
    addValue(i) {
      if (this.form.features[i].feature) {
        if (this.form.features[i].feature.values.length - 1 >= this.form.features[i].values.length) {
          this.form.features[i].values.push({
            id: null,
            value: null
          })
        }
      }
    },
    style(index) {
      if ((index + 1) % 3 === 1) return 'padding-right: 10px'
      if ((index + 1) % 3 === 0) return 'padding-left: 10px'
      if ((index + 1) % 3 === 2) return 'padding-left: 10px; padding-right: 10px'
    }
  },
  mounted() {
    this.getAllBrandsList()
    this.getAllMeasures()
    this.getListCategory()
    this.$store.commit('GET_CATEGORY_FEATURES', [])
    if (this.$route.query.group_id) {
      this.getProductGroupById(this.$route.query.group_id).then(res => {
        console.log(res)
        const _form = this.form
        _form.brand_id = res.brand_id
        _form.category_id = res.category_id
        // _form.content_ru = res.content_ru
        // _form.content_uz = res.content_uz
        _form.description = res.description
        _form.keywords = res.keywords
        _form.measure_id = res.measure_id
        _form.name_ru = res.name_ru
        _form.name_uz = res.name_uz
        setTimeout(() => {
          _form.features = res.features
        }, 1000)
      })
    }
  }
}
</script>
<style>
</style>
