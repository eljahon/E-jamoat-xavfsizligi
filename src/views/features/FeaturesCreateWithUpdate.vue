<template>
  <div>
    <a-spin :spinning="loadingPage" :tip="$t('loading')" size="large">
      <a-form-model
        @submit.prevent="saveData"
        ref="ruleForm"
        :model="form"
        :rules="rules"
      >
        <a-col :span="18" style="padding-right: 5px">
          <a-card :title="$t('fill')">
            <a-row>
              <a-col :span="8">
                <a-form-model-item :label="$t('name_uz')" prop="name_uz">
                  <a-input v-model="form.name_uz"/>
                </a-form-model-item>
              </a-col>
              <a-col style="padding-left: 5px; padding-right: 5px" :span="8">
                <a-form-model-item :label="$t('name_ru')" prop="name_ru">
                  <a-input v-model="form.name_ru"/>
                </a-form-model-item>
              </a-col>
              <a-col style="padding-left: 5px" :span="8">
                <a-form-model-item :label="$t('type')">
                  <a-select style="width: 100%" v-model="form.type">
                    <a-select-option v-for="(t, i) in types" :key="'key' + i" :value="t">
                      {{ t }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col style="padding-right: 5px" :span="8">
                <a-form-model-item :label="$t('features')">
                  <a-select style="width: 100%" v-model="form.parent_id" :filter-option="filterOption" show-search>
                    <a-select-option v-for="(parent, p) in parentFeatures" :key="'parent' + p" :value="parent.id">
                      {{ parent.name_uz }} - {{ parent.name_ru }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col style="padding-right: 5px" :span="8">
                <a-form-model-item :label="$t('filter_type')">
                  <a-select style="width: 100%" v-model="form.filter_type">
                    <a-select-option v-for="(t, i) in types" :key="'key' + i" :value="t">
                      {{ t }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col style="padding-left: 5px; padding-right: 5px" :span="8">
                <a-form-model-item :label="$t('unit')" prop="unit">
                  <a-input v-model="form.unit"/>
                </a-form-model-item>
              </a-col>
              <a-col style="padding-left: 5px" :span="8">
                <a-form-model-item :label="$t('order')" prop="order">
                  <a-input type="number" :maxLength='3' style="width: 100%" v-model="form.order"></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col style="margin-right: 10px" :span="3">
                <a-form-model-item :label="$t('required')" prop="is_required">
                  <a-switch checked-children="Active" un-checked-children="Deactivated" v-model="form.is_required"/>
                </a-form-model-item>
              </a-col>
              <a-col style="margin-right: 10px; margin-left: 5px" :span="3">
                <a-form-model-item :label="$t('status')">
                  <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="status"/>
                </a-form-model-item>
              </a-col>
              <a-col style="margin-right: 10px; margin-left: -5px" :span="3">
                <a-form-model-item :label="$t('filter')" prop="is_filter">
                  <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')"
                            v-model="form.is_filter"/>
                </a-form-model-item>
              </a-col>
              <a-col style="margin-right: 10px; margin-left: 5px" :span="3">
                <a-form-model-item :label="$t('main')" prop="is_main">
                  <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="form.is_main"/>
                </a-form-model-item>
              </a-col>
              <a-col style="margin-right: 10px; margin-left: 5px" :span="3">
                <a-form-model-item :label="$t('variant')" prop="is_variant">
                  <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')"
                            v-model="form.is_variant"/>
                </a-form-model-item>
              </a-col>
              <a-col style="margin-right: 10px; margin-left: 5px" :span="3">
                <a-form-model-item label="Мултьтиязычный">
                  <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="multilanguage"/>
                </a-form-model-item>
              </a-col>
              <a-col style="margin-left: 10px" :span="3">
                <a-form-model-item label="Цветные">
                  <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="colorable"/>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card v-if="isHaveFtValue" title="Возможные значения">
            <a-button slot="extra" type="dashed" @click="addFeatures" icon="plus">{{ $t('add') }}</a-button>
            <!--          <div style="width: 100%; height: 300px; overflow-y: scroll">-->
            <a-row v-for="(f, j) in form.feature_values" :key="'features_values' + j">
              <a-col :span="8" style="padding-right: 5px">
                <a-form-model-item :label="multilanguage ? $t('features.value.uz') : $t('features.value')">
                  <a-input v-model="f.value_uz"/>
                </a-form-model-item>
              </a-col>
              <a-col v-if="multilanguage" :span="8" style="padding-left: 5px">
                <a-form-model-item :label="$t('features.value.ru')">
                  <a-input v-model="f.value_ru"/>
                </a-form-model-item>
              </a-col>
              <a-col v-if="colorable" :span="2" style="padding-left: 10px; margin-top: 2px">
                <a-form-model-item :label="$t('color')">
                  <verte picker="square" model="rgb" style="cursor: pointer" v-model="f.color" menuPosition="top"></verte>
                </a-form-model-item>
              </a-col>
              <a-col :span="2" style="padding-left: 10px">
                <a-button v-if="form.feature_values.length > 1" @click="removeFeatures(j)" style="margin-top: 43px"
                          type="danger" icon="delete" ghost/>
              </a-col>
            </a-row>
            <!--          </div>-->
          </a-card>
          <a-card size="small" style="width: 100%">
            <a-button type="primary" html-type="submit">
              {{ $route.params.id ? $t('update') : $t('save') }}
            </a-button>
          </a-card>
        </a-col>
        <a-col :span="6" style="padding-left: 5px">
          <a-card :title="$t('categories')">
            <a-form-model-item label="" :prop="$route.params.id ? 'category_id' : 'categories'">
              <a-tree v-if='!$route.params.id'
                v-model="form.categories"
                :checkable='true'
                :check-strictly="true"
                :tree-data="treeData"
              />
              <a-radio-group v-else v-model="form.category_id">
                <a-radio v-for='ct in listCategory' :key='ct.id' :value="ct.id">
                  {{ ct.name_uz }}
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-card>
        </a-col>
      </a-form-model>
    </a-spin>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import {Tree} from 'ant-design-vue'
import notification from 'ant-design-vue/lib/notification'
function treeDataMap (category) {
  return category.map((c) => {
    if (!c.children) {
      return {
        title: c.name_uz,
        key: c.id
      }
    } else {
      return {
        title: c.name_uz,
        key: c.id,
        children: treeDataMap(c.children)
      }
    }
  })
}
export default {
  components: {
    'a-tree': Tree
  },
  watch: {
    'form.color': function (val) {
      console.log(val)
    },
    'form.feature_values': function (val) {
      console.log(val)
    }
  },
  data() {
    return {
      loading: false,
      status: true,
      colorable: false,
      loadingPage: false,
      multilanguage: false,
      parentFeatures: [],
      form: {
        name_uz: '',
        name_ru: '',
        parent_id: '',
        unit: '',
        color: '',
        type: null,
        filter_type: '',
        order: null,
        status: 10,
        is_filter: false,
        is_main: false,
        is_variant: false,
        is_required: false,
        feature_values: [
          {
            value_ru: '',
            value_uz: '',
            color: null
          }
        ],
        categories: [],
      },
      types: [
        'dropdown', 'radio', 'checkbox', 'text', 'number', 'date', 'datetime', 'textarea'
      ],
      rules: {
        name_uz: [ {required: true, message: this.$t('required'), trigger: 'change'} ],
        name_ru: [{required: true, message: this.$t('required'), trigger: 'change'}],
        type: [{required: true, message: this.$t('required'), trigger: 'change'}],
        filter_type: [{required: true, message: this.$t('required'), trigger: 'change'}],
        is_filter: [{required: true, message: this.$t('required'), trigger: 'change'}],
        is_main: [{required: true, message: this.$t('required'), trigger: 'change'}],
        is_variant: [{required: true, message: this.$t('required'), trigger: 'change'}],
        is_required: [{required: true, message: this.$t('required'), trigger: 'change'}],
        categories: [{required: true, message: this.$t('required'), trigger: 'change'}],
        category_id: [{required: true, message: this.$t('required'), trigger: 'change'}],
      }
    }
  },
  computed: {
    ...mapGetters(['treeCategory', 'listCategory']),
    treeData() {
      return treeDataMap(this.treeCategory)
    },
    isHaveFtValue () {
      return this.form.type && (this.form.type !== 'text') && (this.form.type !== 'number') && (this.form.type !== 'textarea') && (this.form.type !== 'date') && (this.form.type !== 'datetime')
    }
  },
  methods: {
    ...mapActions(['getTreeCategory', 'postFeatures', 'getFeaturesById', 'updateFeatures', 'getListCategory', 'getParentFeatures']),
    saveData() {
      this.$refs.ruleForm.validate((valid) => {
        console.log(valid)
        if (valid) {
          let _form = { ...this.form }
          // debugger
          if (!this.multilanguage) {
            // eslint-disable-next-line camelcase
            let _feature_values = [..._form.feature_values]
            const newList = _feature_values.map(e => {
              return {
                value_ru: e.value_uz,
                value_uz: e.value_uz,
                color: e.color
              }
            })
            _form.feature_values = (this.form.type === 'dropdown' || this.form.type === 'radio' || this.form.type === 'checkbox') ? newList : undefined
          }
          if (this.validateFeatures(_form.feature_values)) {
            if (!this.$route.params.id) {
              _form.categories = this.form.categories.checked
            }
            _form.order = parseInt(this.form.order)
            if (this.$route.params.id) {
              this.updateFeatures({
                id: this.$route.params.id,
                data: _form
              }).then(res => {
                  console.log(res)
                  this.$router.push({
                    name: 'FeaturesList'
                  })
                })
                .finally(() => {
                  this.loading = false
                })
              return
            }
            this.postFeatures(_form)
              .then(res => {
                console.log(res)
                this.$router.push({
                  name: 'FeaturesList'
                })
              })
              .finally(() => {
                this.loading = false
              })
          }
        } else this.loading = true
      })
    },
    addFeatures() {
      this.form.feature_values.push({
        value_ru: '',
        value_uz: '',
        color: null
      })
    },
    removeFeatures(i) {
      this.form.feature_values.splice(i, 1)
    },
    validateFeatures(array) {
      // debugger
      if (this.form.type === 'dropdown' || this.form.type === 'radio' || this.form.type === 'checkbox') {
        for (var i = 0; i < array.length; i++) {
          if (array[i].value_ru === '' || array[i].value_uz === '') {
            notification.error({
              message: 'Ошибка',
              description: 'Значения функций предупреждения пусты',
              duration: 5
            })
            return false
          }
        }
      }
      return true
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getListCategory()
      this.multilanguage = true
      this.loadingPage = true
      this.getFeaturesById(this.$route.params.id).then(res => {
        console.log(res)
        const _data = { ...res.data }
        this.form = _data
        this.form.feature_values = _data.feature_values.map(e => {
          return {
            value_ru: e.value_ru,
            value_uz: e.value_uz,
            color: e.color
          }
        })
        this.form.category_id = _data.category_id
        // this.form.categories.push(_data.category_id)
      })
      .finally(() => {
        this.loadingPage = false
      })
    }
    this.getTreeCategory()
    this.getParentFeatures().then(res => {
      this.parentFeatures = res.data
    })
  }
}
</script>
<style>
</style>
