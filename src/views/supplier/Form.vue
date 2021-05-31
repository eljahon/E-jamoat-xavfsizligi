<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="12" style="padding: 0 10px 0 0">
        <a-form-model-item :label="$t('name')" prop="name">
          <a-input v-model="form.name" allow-clear/>
        </a-form-model-item>
      </a-col>
      <a-col :span="12" style="padding: 0 0 0 10px">
        <a-form-model-item :label="$t('phone')" prop="phone">
          <a-input allow-clear addon-before="+998" v-mask="'## ### ## ##'" v-model="form.phone" />
        </a-form-model-item>
      </a-col >
      <a-col :span="12" style="padding: 0 10px 0 0">
        <a-form-model-item :label="$t('email')" prop="email">
          <a-input v-model="form.email" allow-clear/>
        </a-form-model-item>
      </a-col>
      <a-col :span="12" style="padding: 0 0 0 10px">
        <a-form-model-item label="Address UZ" prop="address_uz">
          <a-input v-model="form.address_uz" allow-clear/>
        </a-form-model-item>
      </a-col>
      <a-col :span="12" style="padding: 0 10px 0 0">
        <a-form-model-item label="Address RU" prop="address_ru">
          <a-input v-model="form.address_ru" allow-clear/>
        </a-form-model-item>
      </a-col>
      <a-col :span="12" style="padding: 0 0 0 10px">
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
      if (/^\d{9}$/.test(value.replaceAll(' ', ''))) {
        callback()
      } else {
        callback(new Error('Phone Error'))
      }
    }
    const validateEmail = (rule, value, callback) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const result = re.test(String(value).toLowerCase())
      if (value === '') {
        callback()
      } else {
        if (result) {
          callback()
        } else {
          callback(new Error('Email error, Sytax Error'))
        }
      }
    }
    return {
      id: null,
      status: true,
      form: {
        name: '',
        phone: '',
        email: '',
        address_uz: '',
        address_ru: '',
        status: 10
      },
      rules: {
        name: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        address_uz: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        address_ru: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        phone: [{ required: true, message: this.$t('requiredField'), trigger: 'change' }, { validator: validatePhone, trigger: 'change' }],
        email: [{ validator: validateEmail, trigger: 'change' }],
        status: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }]
      }
    }
  },
  watch: {
    status (val) {
      if (val) this.form.status = 10
      else this.form.status = 0
    },
    'form.phone': function (val) {
      console.log(val)
    }
  },
  methods: {
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const _form = { ...this.form }
            _form.phone = this.form.phone.replaceAll(' ', '')
            resolve({
              id: this.id ? this.id : undefined,
              data: _form
            })
            console.log(this.form)
          } else reject(valid)
        })
      })
    },
    resetForm () {
      this.form.email = ''
      this.form.phone = ''
      this.$refs.ruleForm.resetFields();
    }
  }
}
</script>
