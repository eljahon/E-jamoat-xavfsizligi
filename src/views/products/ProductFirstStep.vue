<template>
  <a-card size='small' :title="$t('fill')">
    <a-switch checked-children="Active" slot="extra" un-checked-children="Deactivated" v-model="status" />
    <a-form-model
      @submit.prevent="saveData"
      ref="ruleForm"
      :model="form"
      :rules="rules"
    >
      <a-row>
        <a-col :span="8" style="padding-right: 10px">
          <a-form-model-item :label="$t('name_uz')" prop="name_uz">
            <a-input v-model="form.name_uz" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding: 0 10px">
          <a-form-model-item :label="$t('name_ru')" prop="name_ru">
            <a-input v-model="form.name_ru" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding-left: 10px">
          <a-form-model-item :label="$t('keyword')" prop='keywords'>
            <a-input v-model='form.keywords' />
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding-right: 10px">
          <a-form-model-item :label="$t('categories')" prop="category_id">
            <a-select style="width: 100%" v-model="form.category_id">
              <a-select-option v-for="(c, i) in listCategory" :key="'category' + i" :value="c.id">
                {{ c.name_ru }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding: 0 10px">
          <a-form-model-item :label="$t('brands')" prop="brand_id">
            <a-select style="width: 100%" v-model="form.brand_id">
              <a-select-option v-for="(b, i) in allBrands" :key="'brand' + i" :value="b.id">
                {{ b.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding-left: 10px">
          <a-form-model-item :label="$t('measures')" prop="measure_id">
            <a-select style="width: 100%" v-model="form.measure_id">
              <a-select-option v-for="(m, i) in allMeasures" :key="'measure' + i" :value="m.id">
                {{ m.name_ru }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item :label="$t('description')" prop='description'>
            <a-input type='textarea' v-model='form.description' />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item :label="$t('content_uz')" prop="content_uz">
            <a-input type="textarea" v-model="form.content_uz" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item :label="$t('content_ru')" prop="content_ru">
            <a-input type="textarea" v-model="form.content_ru" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-divider v-if='form.features.length > 0'>{{ $t('features') }}</a-divider>
      <a-row>
        <a-col
          :span='8'
          v-for='(ft, f) in form.features'
          :key='f'
          :style="style(f)"
        >
          <div v-if="ft.feature.type === 'dropdown' || ft.feature.type === 'checkbox'" style="width: 100%">
            <a-form-model-item :label="ft.feature.name_ru + ' ' + ft.feature.name_uz">
              <a-select style="width: 100%" v-model="ft.value.id">
                <a-select-option v-for='vl in ft.feature.values' :key='vl.id' :value='vl.id'>
                  {{ vl.value_uz }} - {{ vl.value_ru }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </div>
          <div v-if="ft.feature.type === 'radio'" style="width: 100%">
            <a-form-model-item :label="ft.feature.name_ru + ' ' + ft.feature.name_uz">
              <a-radio-group name="radioGroup" v-model="ft.value.id">
                <a-radio v-for='vl in ft.feature.values' :key="'radio' + vl" :value="vl.id">
                  {{ vl.value_uz }} - {{ vl.value_ru }}
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </div>
          <div v-if="!(ft.feature.type === 'radio' || ft.feature.type === 'dropdown' || ft.feature.type === 'checkbox')" style="width: 100%">
            <a-form-model-item :label="ft.feature.name_ru + ' ' + ft.feature.name_uz">
              <a-input v-if="ft.feature.type === 'text'" v-model='ft.value.value'></a-input>
              <a-input v-if="ft.feature.type === 'number'" v-model='ft.value.value'></a-input>
              <a-input v-if="ft.feature.type === 'textarea'" type='textarea' v-model='ft.value.value'></a-input>
            </a-form-model-item>
          </div>
          <div v-if="ft.feature.type === 'date'" style="width: 100%">
            <a-form-model-item :label="ft.feature.name_ru + ' ' + ft.feature.name_uz">
              <a-date-picker :placeholder="$t('select_data')" v-model='ft.value.value' valueFormat="YYYY-MM-DD" format="YYYY-MM-DD"/>
            </a-form-model-item>
          </div>
          <div v-if="ft.feature.type === 'datetime'" style="width: 100%">
            <a-form-model-item :label="ft.feature.name_ru + ' ' + ft.feature.name_uz">
              <a-row>
                <a-col :span="11"><a-date-picker :placeholder="$t('select_data')" v-model='ft.value.value' valueFormat="YYYY-MM-DD" format="YYYY-MM-DD"/></a-col>
                <a-col :span="11" :offset='2'><a-time-picker valueFormat="HH:mm" format="HH:mm" /></a-col>
              </a-row>
            </a-form-model-item>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-button type="primary" html-type="submit" :loading='loading'>
          {{ $t('save') }}
        </a-button>
        <a-button style="margin-left: 10px" @click="$refs.ruleForm.resetFields()" type="primary" ghost>
          {{ $t('clear') }}
        </a-button>
      </a-row>
    </a-form-model>
  </a-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
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
        status: [{ required: true, message: this.$t('required'), trigger: 'change' }],
      }
    }
  },
  watch: {
    status (val) {
      this.form.status = val ? 10 : 0
    },
    'form.category_id': function (val) {
      console.log(val)
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
  },
  computed: {
    ...mapGetters(['allBrands', 'listCategory', 'allMeasures', 'categoryFeatures']),
  },
  methods: {
    ...mapActions(['postProduct', 'updateProduct', 'postProductGroup', 'getAllProduct', 'getCategoryFeatures', 'getAllMeasures', 'getListCategory', 'getAllBrands']),
    saveData () {
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
          this.postProductGroup(_form).then((res) => {
            this.$message.success('Success')
            this.$router.push({
              name: 'ProductsCreate',
              params: {
                step: 2
              },
              query: {
                productGroupId: res
              }
            }).finally(() => {
              this.loading = false
            })
          })
        }
      })
    },
    changeFt (val, f) {
      this.form.features[f].feature_id = val
      for (let i = 0; i < this.categoryFeatures.length; i++) {
        if (this.categoryFeatures[i].id === val) {
          this.form.features[f].feature = this.categoryFeatures[i]
        }
      }
    },
    addFeatures () {
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
    addValue (i) {
      if (this.form.features[i].feature) {
        if (this.form.features[i].feature.values.length - 1 >= this.form.features[i].values.length) {
          this.form.features[i].values.push({
            id: null,
            value: null
          })
        }
      }
    },
    style (index) {
      if ((index + 1) % 3 === 1) return 'padding-right: 10px'
      if ((index + 1) % 3 === 0) return 'padding-left: 10px'
      if ((index + 1) % 3 === 2) return 'padding-left: 10px; padding-right: 10px'
    }
  },
  mounted () {
    this.getAllBrands()
    this.getAllMeasures()
    this.getListCategory()
    this.$store.commit('GET_CATEGORY_FEATURES', [])
  }
}
</script>
<style>
</style>
