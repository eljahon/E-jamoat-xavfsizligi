<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Name UZ" prop="name_uz">
          <a-input v-model="form.name_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Name RU" prop="name_ru">
          <a-input v-model="form.name_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Price" prop="price">
          <a-input-number style="width: 100%" :min="0" v-model="form.price" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Status" prop="status">
          <a-input-number style="width: 100%" :min="0" v-model="form.status" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Description UZ">
          <a-input v-model="form.description_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Description RU">
          <a-input v-model="form.description_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Short Info UZ">
          <a-input type="textarea" v-model="form.short_info_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Short Info RU">
          <a-input type="textarea" v-model="form.short_info_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
export default {
  data () {
    return {
      id: null,
      form: {
        name_uz: '',
        name_ru: '',
        price: null,
        status: 10,
        description_ru: '',
        description_uz: '',
        short_info_uz: '',
        short_info_ru: '',
        is_default: false
      },
      rules: {
        name_uz: [{ required: true, message: 'Name UZ Required', trigger: 'blur' }],
        name_ru: [{ required: true, message: 'Name RU Required', trigger: 'blur' }],
        price: [{ required: true, message: 'Price Required', trigger: 'blur' }],
        status: [{ required: true, message: 'Status Required', trigger: 'blur' }],
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
              data: this.form,
            })
          } else reject(valid)
        })
      })
    },
    resetForm () {
      this.form.description_ru = ''
      this.form.description_uz = ''
      this.form.short_info_uz = ''
      this.form.short_info_ru = ''
      this.$refs.ruleForm.resetFields();
    }
  }
}
</script>
