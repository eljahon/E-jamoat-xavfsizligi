<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('name_uz')" prop="name_uz">
          <a-input v-model="form.name_uz" allow-clear/>
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('name_ru')" prop="name_ru">
          <a-input v-model="form.name_ru" allow-clear/>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('region')" prop="parent_id">
          <a-select v-model="form.parent_id" style="width: 100%" allow-clear >
            <a-select-option v-for="item in parentLocation" :key="item.id" :value="item.id">
              {{ item.name_uz + ' ' + item.name_ru }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-row>
          <a-col :span="11">
            <a-form-model-item :label="$t('has_delivery')">
              <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="form.has_delivery" />
            </a-form-model-item>
          </a-col>
          <a-col :span="11" :offset="1">
            <a-form-model-item :label="$t('status')">
              <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="status" />
            </a-form-model-item>
          </a-col>
        </a-row>
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
      status: true,
      form: {
        name_ru: '',
        name_uz: '',
        has_delivery: true,
        parent_id: null,
        status: 10
      },
      rules: {
        name_ru: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        name_uz: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        status: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
      }
    }
  },
  watch: {
    status (val) {
      if (val) this.form.status = 10
      else this.form.status = 0
    }
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
      this.$refs.ruleForm.resetFields();
    }
  },
  computed: {
    ...mapGetters(['parentLocation'])
  }
}
</script>
