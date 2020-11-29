<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('name_uz')" prop="title_uz">
          <a-input v-model="form.title_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('name_ru')" prop="title_ru">
          <a-input v-model="form.title_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('content_uz')" prop="content_uz">
          <a-input v-model="form.content_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('content_ru')" prop="content_ru">
          <a-input v-model="form.content_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('location')">
          <a-select
            show-search
            option-filter-prop="children"
            style="width: 100%"
            v-model="form.location_id"
            :filter-option="filterOption"
          >
            <a-select-option v-for="item in allLocationList" :key="item.id" :value="item.id">
              {{ item.name_uz }} - {{ item.name_ru }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      id: null,
      form: {
        location_id: null,
        title_ru: '',
        title_uz: '',
        content_ru: '',
        content_uz: ''
      },
      rules: {
        title_ru: [{ required: true, message: 'Title RU Required', trigger: 'blur' }],
        title_uz: [{ required: true, message: 'Title UZ Required', trigger: 'blur' }],
      }
    }
  },
  computed: {
    ...mapGetters(['allLocationList'])
  },
  methods: {
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            resolve({
              id: this.id ? this.id : undefined,
              data: this.form
            })
          } else reject(valid)
        })
      })
    },
    resetForm () {
      this.form.location_id = null
      this.$refs.ruleForm.resetFields();
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    }
  }
}
</script>
