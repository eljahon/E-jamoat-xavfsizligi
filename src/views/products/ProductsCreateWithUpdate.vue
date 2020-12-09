<template>
  <a-card :title="$t('fill')">
    <a-form-model
      @submit.prevent="saveData"
      ref="ruleForm"
      :model="form"
      :rules="rules"
    >
      <a-row>
        <a-col :span="7">
          <a-form-model-item :label="$t('categories')" prop="category_id">
            <a-select style="width: 100%" v-model="form.category_id">
              <a-select-option v-for="(c, i) in listCategory" :key="'category' + i" :value="c.id">
                {{ c.name_ru }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-form-model-item :label="$t('brands')" prop="brand_id">
            <a-select style="width: 100%" v-model="form.brand_id">
              <a-select-option v-for="(b, i) in allBrands" :key="'brand' + i" :value="b.id">
                {{ b.name_ru }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-form-model-item :label="$t('measures')" prop="measure_id">
            <a-select style="width: 100%" v-model="form.measure_id">
              <a-select-option v-for="(m, i) in allMeasures" :key="'measure' + i" :value="m.id">
                {{ m.name_ru }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" :tab="$t('uzbek')" force-render>
          <a-row>
            <a-col :span="11">
              <a-form-model-item :label="$t('name_uz')" prop="name_uz">
                <a-input v-model="form.name_uz" />
              </a-form-model-item>
            </a-col>
            <a-col :span="11" :offset="1">
              <a-form-model-item :label="$t('keyword_uz')" prop="keywords_uz">
                <a-input v-model="form.keywords_uz" />
              </a-form-model-item>
            </a-col>
            <a-col :span="11">
              <a-form-model-item :label="$t('content_uz')" prop="content_uz">
                <a-input type="textarea" v-model="form.content_uz" />
              </a-form-model-item>
            </a-col>
            <a-col :span="11" :offset="1">
              <a-form-model-item :label="$t('description_uz')" prop="description_uz">
                <a-input type="textarea" v-model="form.description_uz" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('russian')" force-render>
          <a-col :span="11">
            <a-form-model-item :label="$t('name_ru')" prop="name_ru">
              <a-input v-model="form.name_uz"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="11" :offset="1">
            <a-form-model-item :label="$t('keyword_ru')" prop="keywords_ru">
              <a-input v-model="form.keywords_ru"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="11">
            <a-form-model-item :label="$t('content_ru')" prop="content_ru">
              <a-input type="textarea" v-model="form.content_ru" />
            </a-form-model-item>
          </a-col>
          <a-col :span="11" :offset="1">
            <a-form-model-item :label="$t('description_ru')" prop="description_ru">
              <a-input type="textarea" v-model="form.description_ru" />
            </a-form-model-item>
          </a-col>
        </a-tab-pane>
      </a-tabs>
    </a-form-model>
  </a-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import notification from 'ant-design-vue/lib/notification'
export default {
  data() {
    return {
      loading: false,
      status: true,
      form: {
        measure_id: null,
        category_id: null,
        brand_id: null
      },
      types: [
        'select', 'multiselect', 'checkbox', 'string', 'range'
      ],
      rules: {
        name_uz: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        name_ru: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        type: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        filter_type: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        is_filter: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        is_main: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        is_variant: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        is_required: [{ required: true, message: this.$t('required'), trigger: 'change' }],
        categories: [{ required: true, message: this.$t('required'), trigger: 'change' }],
      }
    }
  },
  computed: {
    ...mapGetters(['allBrands', 'listCategory', 'allMeasures']),
  },
  methods: {
    ...mapActions(['getAllMeasures', 'getListCategory', 'getAllBrands']),
    callback (e) {
      console.log(e)
    },
    saveData () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.validateFeatures(this.form.feature_values)) {
            this.form.categories = this.form.categories.checked
            this.postFeatures(this.form).finally(() => {
              this.loading = false
            })
          }
        } else this.loading = true
      })
      console.log('submit')
    },
    addFeatures () {
      this.form.feature_values.push({
        value_ru: '',
        value_uz: ''
      })
    },
    removeFeatures (i) {
      this.form.feature_values.splice(i, 1)
    },
    clear() {
      if (this.editable) {
        this.$refs.brandEdit.resetForm()
      } else {
        this.$refs.brandCreate.resetForm()
      }
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
  mounted () {
    this.getAllBrands()
    this.getAllMeasures()
    this.getListCategory()
  }
}
</script>
<style>
</style>
