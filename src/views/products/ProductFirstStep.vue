<template>
  <a-card size='small' :title="$t('fill')">
    <a-form-model
      @submit.prevent="saveData"
      ref="ruleForm"
      :model="form"
      :rules="rules"
    >
      <a-row>
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
                {{ b.name_ru }}
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
              <a-input v-model="form.name_ru"/>
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
        <a-switch checked-children="Active" un-checked-children="Deactivated" slot="tabBarExtraContent" v-model="status" />
      </a-tabs>
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
        keywords_ru: null,
        keywords_uz: null,
        content_ru: null,
        content_uz: null,
        description_ru: null,
        description_uz: null,
        status: 10,
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
    }
  },
  computed: {
    ...mapGetters(['allBrands', 'listCategory', 'allMeasures']),
  },
  methods: {
    ...mapActions(['postProduct', 'updateProduct', 'getAllProduct', 'getAllMeasures', 'getListCategory', 'getAllBrands']),
    callback (e) {
      console.log(e)
    },
    saveData () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.postProduct(this.form).finally(() => {
            this.loading = false
            this.$router.push({ name: 'ProductsCreate' })
          })
        } else this.loading = true
      })
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
