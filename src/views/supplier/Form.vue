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
          <a-input addon-before="+998" v-mask="'## ### ## ##'" v-model="form.phone" />
        </a-form-model-item>
      </a-col >
      <a-col :span="11">
        <a-form-model-item :label="$t('email')" prop="email">
          <a-input v-model="form.email" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Address UZ" prop="address_uz">
          <a-input v-model="form.address_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11">
        <a-form-model-item label="Address RU" prop="address_ru">
          <a-input v-model="form.address_ru" />
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
        name_uz: [{ required: true, message: 'Name uz Required', trigger: 'blur' }],
        name_ru: [{ required: true, message: 'Name ru Required', trigger: 'blur' }],
        address_uz: [{ required: true, message: 'Address uz Required', trigger: 'blur' }],
        address_ru: [{ required: true, message: 'Address ru Required', trigger: 'blur' }],
        phone: [{ required: true, message: 'Phone Required', trigger: 'change' }, { validator: validatePhone, trigger: 'change' }],
        email: [{ validator: validateEmail, trigger: 'change' }],
        status: [{ required: true, message: 'Status Required', trigger: 'blur' }]
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
            this.form.name_ru = this.form.name
            this.form.name_uz = this.form.name
            this.form.name = undefined
            this.form.phone = '+998' + this.form.phone.replaceAll(' ', '')
            resolve({
              id: this.id ? this.id : undefined,
              data: this.form
            })
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
