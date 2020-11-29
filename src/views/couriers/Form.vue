<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('name')" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('phone')" prop="phone">
          <a-input v-model="form.phone" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('car_type')">
          <a-input v-model="form.car_type" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('car_model')">
          <a-input v-model="form.car_model" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('car_number')">
          <a-input v-model="form.car_number" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('status')">
          <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="status" />
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
export default {
  data () {
    const validatePhone = (rule, value, callback) => {
      if (/^[+][9][9][8]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error(this.$t('phone.syntax.error')))
      }
    }
    return {
      id: null,
      status: true,
      form: {
        name: '',
        phone: '',
        car_model: '',
        car_type: '',
        car_number: '',
        status: 10
      },
      rules: {
        name: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        phone: [{ required: true, message: this.$t('requiredField'), trigger: 'change' }, { validator: validatePhone, trigger: 'change' }],
        status: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }]
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
      this.form.car_model = ''
      this.form.car_number = ''
      this.form.car_type = ''
      this.$refs.ruleForm.resetFields();
    }
  }
}
</script>
