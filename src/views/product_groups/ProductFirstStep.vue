<template>
  <a-card size='small' :title="$t('fill')">
    <a-switch @click="showTreeData" slot="extra" :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model='status' />
    <a-form-model
      @submit.prevent='saveData'
      ref='ruleForm'
      :model='form'
      :rules='rules'
    >
      <a-row>
        <a-col :span='8' style='padding-right: 10px'>
          <a-form-model-item :label="$t('name_uz')" prop='name_uz'>
            <a-input v-model='form.name_uz' allow-clear/>
          </a-form-model-item>
        </a-col>
        <a-col :span='8' style='padding: 0 10px'>
          <a-form-model-item :label="$t('name_ru')" prop='name_ru'>
            <a-input v-model='form.name_ru' allow-clear/>
          </a-form-model-item>
        </a-col>
        <a-col :span='8' style='padding-left: 10px'>
          <a-form-model-item :label="$t('keyword')" prop='keywords'>
            <a-input v-model='form.keywords' allow-clear/>
          </a-form-model-item>
        </a-col>
        <a-col :span='8' style='padding-right: 10px'>
          <a-form-model-item :label="$t('categories')" prop='category_id'>
            <a-tree-select
              show-search
              v-model='form.category_id'
              :treeData='treeCategoryReBuild()'
              treeNodeFilterProp='name_ru'
              :filterTreeNode='filterTreeNode'
              style='width: 100%'
              :dropdown-style="{ maxHeight: '300px', overflow: 'auto' }"
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
            <a-select style='width: 100%' v-model='form.brand_id' show-search :filter-option='filterOption' allow-clear>
              <a-select-option v-for='(b, i) in allBrands' :key="'brand' + i" :value='b.id'>
                {{ b.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span='8' style='padding-left: 10px'>
          <a-form-model-item :label="$t('measures')" prop='measure_id' >
            <a-select style='width: 100%' v-model='form.measure_id' show-search allow-clear :filter-option='filterOption'>
              <a-select-option v-for='(m, i) in allMeasures' :key="'measure' + i" :value='m.id'>
                {{ m.name_ru }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span='24'>
          <a-form-model-item :label="$t('description')" prop='description'>
            <a-input allow-clear type='textarea' @input='event => form.description = event.target.value' />
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
      <a-row v-for='parent in form.features' :key='parent.id'>
        <h1 v-if="parent && parent.parent && parent.parent.name_uz" class='parent_title'>{{ parent.parent.name_uz }} | {{ parent.parent.name_ru }}:</h1>
        <a-col
          :span='8'
          v-for='(ft, f) in parent.child'
          :key='f'
          :style='style(f)'
        >
          <div v-if="ft.feature.type === 'dropdown' || ft.feature.type === 'checkbox'" style='width: 100%'>
            <a-form-model-item :label='ft.feature.name_ru'>
              <a-select style='width: 100%' v-model='ft.value.id' allow-clear>
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
              <a-input allow-clear v-if="ft.feature.type === 'text'" v-model='ft.value.value'></a-input>
              <a-input allow-clear v-if="ft.feature.type === 'number'" v-model='ft.value.value'></a-input>
              <a-input allow-clear v-if="ft.feature.type === 'textarea'" type='textarea' v-model='ft.value.value'></a-input>
            </a-form-model-item>
          </div>
          <div v-if="ft.feature.type === 'date'" style='width: 100%'>
            <a-form-model-item :label='ft.feature.name_ru'>
              <a-date-picker :placeholder="$t('select_data')" allow-clear v-model='ft.value.value' valueFormat='YYYY-MM-DD'
                             format='YYYY-MM-DD' />
            </a-form-model-item>
          </div>
          <div v-if="ft.feature.type === 'datetime'" style='width: 100%'>
            <a-form-model-item :label='ft.feature.name_ru'>
              <a-row>
                <a-col :span='11'>
                  <a-date-picker allow-clear :placeholder="$t('select_data')" v-model='ft.value.value' valueFormat='YYYY-MM-DD'
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
          {{ $route.name === 'ProductGroupsEdit' ? $t('update') : $t('save') }}
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
      categoryFt: [],
      productFt: [],
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
          const oldProductFeatures = [...this.form.features]
          this.form.features = res.data.map(e => {
            return {
              parent: e,
              child: e.children.map(child => {
                return {
                  feature: child,
                  feature_id: child.id,
                  value: {
                    // eslint-disable-next-line camelcase
                    id: oldProductFeatures.filter(e => e.feature_id === child.id)[0]?.value_id,
                    value: null
                  }
                }
              })
            }
          })
          // console.log('all features', res)
          // console.log('product features', this.form.features)
          // const featuresById = {}
          // const features = res.data.flatMap(per => per.children.map(child => ({ parent: per, child })))
          //
          // features.forEach(el => {
          //   featuresById[el.child.id] = el
          // })
          //
          // const newFt = this.form.features.map(e => {
          //   return {
          //     parent: featuresById[e.feature_id].parent,
          //     child: featuresById[e.feature_id].parent.children.map(child => {
          //       return {
          //         feature: child,
          //         feature_id: child.id,
          //         value: {
          //           id: e.value_id,
          //           value: null
          //         }
          //       }
          //     })
          //   }
          // })
          // this.form.features = newFt
          //
          // console.log('this form features', this.form.features)
          // console.log('newFt', newFt)

        })
      }
    }
  },
  computed: {
    ...mapGetters(['allBrands', 'treeCategory', 'allMeasures', 'categoryFeatures'])
  },
  methods: {
    showTreeData () {
      console.log(this.treeCategory)
    },
    ...mapActions(['updateProductGroup', 'postProduct', 'updateProduct', 'postProductGroup', 'getAllProduct', 'getCategoryFeatures', 'getAllMeasures', 'getTreeCategory', 'getAllBrandsList', 'getProductGroupById']),
    saveData() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          let _form = { ...this.form }
          let f = []
          for (let i = 0; i < _form.features.length; i++) {
            for (let j = 0; j < _form.features[i].child.length; j++) {
              if (_form.features[i].child[j].value.id || _form.features[i].child[j].value.value) {
                f.push({
                  feature_id: _form.features[i].child[j].feature_id,
                  value_id: _form.features[i].child[j].value.id,
                  value: _form.features[i].child[j].value.value
                })
              }
            }
          }
          _form.features = f
          if (this.$route.name === 'ProductGroupsEdit') {
            this.updateProductGroup({
              id: this.$route.query.group_id,
              data: _form
            }).then((res) => {
              this.$message.success('Updated Successfully')
              this.$router.push({
                name: 'ProductGroupsEdit',
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
                name: 'ProductGroupsCreate',
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
            value: c.id,
            key: c.name_ru + c.id + Math.random()
          }
        } else {
          return {
            title: c.name_uz + ' - ' + c.name_ru,
            value: c.id,
            key: c.name_ru + c.id + Math.random(),
            children: this.treeDataMap(c.children)
          }
        }
      })
    },
    treeCategoryReBuild() {
      return this.treeDataMap(this.treeCategory)
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    filterTreeNode(value, node) {
      const title = node.data.props.title
      // const result = title.toLowerCase().indexOf(value.toLowerCase()) > 0
      const result = title.toLowerCase().startsWith(value.toLowerCase())
      // console.log(title + ' <==> ' + value + ': ' + result);
      return result
    },
    // changeFt(val, f) {
    //   this.form.features[f].feature_id = val
    //   for (let i = 0; i < this.categoryFeatures.length; i++) {
    //     if (this.categoryFeatures[i].id === val) {
    //       this.form.features[f].feature = this.categoryFeatures[i]
    //     }
    //   }
    // },
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
    // removeValue(f, v) {
    //   this.form.features[f].values.splice(v, 1)
    // },
    // addValue(i) {
    //   if (this.form.features[i].feature) {
    //     if (this.form.features[i].feature.values.length - 1 >= this.form.features[i].values.length) {
    //       this.form.features[i].values.push({
    //         id: null,
    //         value: null
    //       })
    //     }
    //   }
    // },
    style(index) {
      if ((index + 1) % 3 === 1) return 'padding-right: 10px'
      if ((index + 1) % 3 === 0) return 'padding-left: 10px'
      if ((index + 1) % 3 === 2) return 'padding-left: 10px; padding-right: 10px'
    }
  },
  mounted() {
    this.getAllBrandsList()
    this.getAllMeasures()
    this.getTreeCategory()
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
        // setTimeout(() => {
        _form.features = res.features
        // }, 1000)
      })
    }
  }
}
</script>
<style>
.parent_title {
  font-size: 20px;
  font-weight: 500;
  padding-left: 10px;
  background-color: #e9e9e9;
}
</style>
