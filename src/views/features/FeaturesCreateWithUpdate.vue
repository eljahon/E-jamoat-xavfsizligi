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
          <a-form-model-item :label="$t('name_uz')" prop="name_uz">
            <a-input v-model="form.name_uz" />
          </a-form-model-item>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-form-model-item :label="$t('name_ru')" prop="name_ru">
            <a-input v-model="form.name_ru" />
          </a-form-model-item>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-form-model-item :label="$t('type')" prop="type">
            <a-select style="width: 100%" v-model="form.type">
              <a-select-option v-for="(t, i) in types" :key="'key' + i" :value="t">
                {{ t }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="7">
          <a-form-model-item :label="$t('filter_type')" prop="filter_type">
            <a-select style="width: 100%" v-model="form.filter_type">
              <a-select-option v-for="(t, i) in types" :key="'key' + i" :value="t">
                {{ t }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-form-model-item :label="$t('color')" prop="color">
            <a-input v-model="form.color" type="color"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-form-model-item :label="$t('unit')" prop="unit">
            <a-input v-model="form.unit"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="7">
          <a-row>
            <a-col :span="11">
              <a-form-model-item :label="$t('order')" prop="order">
                <a-input-number style="width: 100%" v-model="form.order"></a-input-number>
              </a-form-model-item>
            </a-col>
            <a-col :span="11" :offset="2">
              <a-form-model-item :label="$t('required')" prop="is_required">
                <a-switch checked-children="Active" un-checked-children="Deactivated" v-model="form.is_required" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-row>
            <a-col :span="11">
              <a-form-model-item :label="$t('status')">
                <a-switch checked-children="Active" un-checked-children="Deactivated" v-model="status" />
              </a-form-model-item>
            </a-col>
            <a-col :span="11" :offset="2">
              <a-form-model-item :label="$t('filter')" prop="is_filter">
                <a-switch checked-children="Active" un-checked-children="Deactivated" v-model="form.is_filter" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="7" :offset="1">
          <a-row>
            <a-col :span="11">
              <a-form-model-item :label="$t('main')" prop="is_main">
                <a-switch checked-children="Active" un-checked-children="Deactivated" v-model="form.is_main" />
              </a-form-model-item>
            </a-col>
            <a-col :span="11" :offset="2">
              <a-form-model-item :label="$t('variant')" prop="is_variant">
                <a-switch checked-children="Active" un-checked-children="Deactivated" v-model="form.is_variant" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="16">
          <a-row v-for="(f, j) in form.feature_values" :key="'features_values' + j">
            <a-col :span="10">
              <a-form-model-item :label="$t('features.value.uz')">
                <a-select style="width: 100%" v-model="f.value_uz">
                  <a-select-option v-for="(t, i) in types" :key="'key' + i" :value="t">
                    {{ t }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="10" :offset="1">
              <a-form-model-item :label="$t('features.value.ru')">
                <a-select style="width: 100%" v-model="f.value_ru">
                  <a-select-option v-for="(t, a) in types" :key="'key' + a" :value="t">
                    {{ t }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="2" :offset="1">
                <a-button v-if="form.feature_values.length > 1" @click="removeFeatures(i)" style="margin-top: 43px" type="danger" icon="delete" ghost/>
            </a-col>
          </a-row>
          <a-row>
            <a-button type="dashed" @click="addFeatures" icon="plus">{{ $t('add') }}</a-button>
          </a-row>
        </a-col>
        <a-col :span="6" :offset="1">
          <a-form-model-item :label="$t('categories')" prop="categories">
            <a-tree
              v-model="form.categories"
              checkable
              :check-strictly="true"
              :tree-data="treeCategory"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-button type="primary" html-type="submit">
          {{ $t('save') }}
        </a-button>
      </a-row>
    </a-form-model>
  </a-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Tree } from 'ant-design-vue'
import notification from 'ant-design-vue/lib/notification'
export default {
  components: {
    'a-tree': Tree
  },
  watch: {
    'form.color': function (val) {
      console.log(val)
    },
    'form.categories': function (val) {
      console.log(val)
    }
  },
  data() {
    return {
      loading: false,
      status: true,
      form: {
        name_uz: '',
        name_ru: '',
        parent_id: '',
        unit: '',
        color: '',
        type: '',
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
            value_uz: ''
          }
        ],
        categories: [],
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
    ...mapGetters(['treeCategory']),
  },
  methods: {
    ...mapActions(['getTreeCategory', 'postFeatures']),
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
    this.getTreeCategory()
  }
}
</script>
<style>
</style>
