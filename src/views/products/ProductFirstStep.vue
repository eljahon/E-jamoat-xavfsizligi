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
        <a-divider>Features</a-divider>
        <a-card style='margin-bottom: 10px; margin-top: 10px;' :title="$t('features') + ' ' + (f +1)" size='small' v-for='(ft, f) in form.features' :key='f'>
            <div slot='extra' :span="24" style="width: 300px; display: flex">
              <a-select :style="form.features.length > 1 ? 'width: 85%' : 'width: 100%'" :placeholder="$t('features')" @change='changeFt($event, f)'>
                <a-select-option v-for="(cf, i) in categoryFeatures" :key="'cf' + i" :value="cf.id">
                  {{ cf.name_ru }} - {{ cf.name_uz }}
                </a-select-option>
              </a-select>
              <a-button v-if='form.features.length > 1' style='margin-left: 10px' ghost type="danger" icon="delete" />
            </div>
          <a-row v-if="ft.feature_id && (ft.feature.type === 'dropdown' || ft.feature.type === 'radio' || ft.feature.type === 'checkbox')">
            <a-col v-for="(val, v) in ft.values" :key="v + val.id" :span="7" style="padding-left: 10px">
              <a-form-model-item :label="$t('value')">
                <a-select style="width: 100%" v-model="val.id">
                  <a-icon v-if='form.features[f].values.length > 1' slot="suffixIcon" type="delete" style='font-size: 15px; color: red' @click='removeValue(f,v)'/>
                  <a-select-option v-for="vl in ft.feature.values" :key="vl.id" :value="vl.id">
                    {{ vl.value_uz }} - {{ vl.value_ru }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span='2' style='padding-left: 10px'>
              <a-form-model-item label=' '>
                <a-button type="primary" icon="plus" @click='addValue(f)'/>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row v-if="ft.feature_id && !(ft.feature.type === 'dropdown' || ft.feature.type === 'radio' || ft.feature.type === 'checkbox')">
            <a-col :span="24">
              <a-form-model-item :label="$t('value')">
                <a-input v-if="ft.feature.type === 'text'" v-model='ft.values[0].value'></a-input>
                <a-input v-if="ft.feature.type === 'number'" v-model='ft.values[0].value'></a-input>
                <a-input v-if="ft.feature.type === 'textarea'" type='textarea' v-model='ft.values[0].value'></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-card>
        <a-button style='margin-top: 10px' @click='addFeatures'>
          Add Features
        </a-button>
        <a-divider></a-divider>
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
      <a-row>
        <a-button type="primary" html-type="submit">
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
        features: [
          {
            feature: null,
            feature_id: null,
            values: [{
              id: null,
              value: null
            }]
          }
        ]
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
      this.getCategoryFeatures(val)
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
          let _form = { ...this.form }
          let f = []
          for (let i = 0; i < _form.features.length; i++) {
            for (let j = 0; j < _form.features[i].values.length; j++) {
              f.push({
                feature_id: _form.features[i].feature_id,
                value_id: _form.features[i].values[j].id,
                value: _form.features[i].values[j].value
              })
            }
          }
          _form.features = f
          console.log(_form)
          this.postProductGroup(_form).finally(() => {
            this.$emit('success')
            this.$message.success('Success')
            this.loading = false
            // this.$router.push({ name: 'ProductsCreate' })
          })
        } else this.loading = true
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
