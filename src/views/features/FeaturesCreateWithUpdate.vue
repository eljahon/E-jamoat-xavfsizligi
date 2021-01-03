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
                <a-form-model-item :label="$t('type')" prop="type">
                  <a-select style="width: 100%" v-model="form.type">
                    <a-select-option v-for="(t, i) in types" :key="'key' + i" :value="t">
                      {{ t }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col style="padding-right: 5px" :span="8">
                <a-form-model-item :label="$t('filter_type')" prop="filter_type">
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
                  <a-input type="number" style="width: 100%" v-model="form.order"></a-input>
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
          <a-card v-if="form.type && (form.type !== 'string') && (form.type !== 'range')" title="Возможные значения">
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
              <a-col v-if="colorable" :span="2" style="padding-left: 10px; margin-top: 46px">
                <verte picker="square" model="rgb" style="cursor: pointer" v-model="f.color" menuPosition="top"></verte>
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
            <a-form-model-item label="" prop="categories">
              <a-tree
                v-model="form.categories"
                checkable
                :check-strictly="true"
                :tree-data="treeData"
              />
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
        title: c.name_uz + ' ' + c.name_ru,
        key: c.id
      }
    } else {
      return {
        title: c.name_uz + ' ' + c.name_ru,
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
      form: {
        name_uz: '',
        name_ru: '',
        parent_id: '',
        unit: '',
        color: '',
        type: null,
        filter_type: '',
        order: '',
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
        'select', 'multiselect', 'checkbox', 'string', 'range'
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
      }
    }
  },
  computed: {
    ...mapGetters(['treeCategory']),
    treeData() {
      return treeDataMap(this.treeCategory)
    }
  },
  methods: {
    ...mapActions(['getTreeCategory', 'postFeatures', 'getFeaturesById', 'updateFeatures']),
    saveData() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.multilanguage) {
            // eslint-disable-next-line
            let _feature_values = [ ...this.form.feature_values ]
            const newList = _feature_values.map(e => {
              return {
                value_ru: e.value_uz,
                value_uz: e.value_uz,
                color: e.color
              }
            })
            console.log(newList)
            this.form.feature_values = newList
            console.log(this.form)
          }
          if (this.validateFeatures(this.form.feature_values)) {
            this.form.categories = this.form.categories.checked
            if (this.$route.params.id) {
              this.updateFeatures({
                id: this.$route.params.id,
                data: this.form
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
            this.postFeatures(this.form)
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
      console.log('submit')
    },
    addFeatures() {
      this.form.feature_values.push({
        value_ru: '',
        value_uz: ''
      })
    },
    removeFeatures(i) {
      this.form.feature_values.splice(i, 1)
    },
    validateFeatures(array) {
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
      return true
    }
  },
  mounted() {
    if (this.$route.params.id) {
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
        this.form.categories = []
        this.form.categories.push(_data.category_id)
      })
      .finally(() => {
        this.loadingPage = false
      })
    }
    this.getTreeCategory()
  }
}
</script>
<style>
</style>
