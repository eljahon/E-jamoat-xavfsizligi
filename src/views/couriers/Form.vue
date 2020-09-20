<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Name" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Phone" prop="phone">
          <a-input v-model="form.phone" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Car Type">
          <a-input v-model="form.car_type" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Car Model">
          <a-input v-model="form.car_model" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Car Number">
          <a-input v-model="form.car_number" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Status" prop="status">
          <a-input-number style="width: 100%" :min="0" v-model="form.status" />
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
        callback(new Error('Phone Error'))
      }
    }
    return {
      id: null,
      form: {
        name: '',
        phone: '',
        car_model: '',
        car_type: '',
        car_number: '',
        status: 10
      },
      rules: {
        name: [{ required: true, message: 'Name Required', trigger: 'blur' }],
        phone: [{ required: true, message: 'Phone Required', trigger: 'change' }, { validator: validatePhone, trigger: 'change' }],
        status: [{ required: true, message: 'Status Required', trigger: 'blur' }]
      }
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
