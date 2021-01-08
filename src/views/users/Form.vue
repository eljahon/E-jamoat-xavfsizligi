<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('phone')" prop="phone">
          <a-input v-model="form.phone" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('email')" prop="email">
          <a-input v-model="form.email" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('password')" prop="password">
          <a-input-password v-model="form.password" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('password_confirm')" prop="password_confirm">
          <a-input-password v-model="form.password_confirm" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
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
        callback(new Error(this.$t('errorPhone')))
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        callback()
      } else {
        callback(new Error(this.$t('errorEmail')))
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length >= 6 && value.length <= 50) {
        callback()
      } else {
        callback(new Error(this.$t('passwordLength')))
      }
    }
    const validateNotEqual = (rule, value, callback) => {
      if (value === this.form.password) {
        callback()
      } else {
        callback(new Error(this.$t('passwordError')))
      }
    }
    return {
      id: null,
      status: true,
      form: {
        phone: null,
        email: '',
        role_name: 'stuff',
        password_confirm: '',
        password: '',
        status: 10
      },
      rules: {
        phone: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }, { validator: validatePhone, trigger: 'change' }],
        email: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }, { validator: validateEmail, trigger: 'change' }],
        password: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }, { validator: validatePassword, trigger: 'change' }],
        password_confirm: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }, { validator: validateNotEqual, trigger: 'blur' }],
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
  }
}
</script>
