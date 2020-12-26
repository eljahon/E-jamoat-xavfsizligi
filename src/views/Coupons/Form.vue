<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="12" style="padding-right: 10px">
        <a-form-model-item :label="$t('coupon_amount')" prop="coupon_amount">
          <a-input type="number" v-model="form.coupon_amount" />
        </a-form-model-item>
      </a-col>
      <a-col :span="12" style="padding-left: 10px">
        <a-form-model-item :label="$t('coupon_percent')" prop="coupon_percent">
          <a-input type="number" v-model="form.coupon_percent" />
        </a-form-model-item>
      </a-col>
      <a-col :span="12" style="padding-right: 10px">
        <a-form-model-item :label="$t('min_amount')" prop="min_amount">
          <a-input type="number" v-model="form.min_amount" />
        </a-form-model-item>
      </a-col>
      <a-col :span="12" style="padding-left: 10px">
        <a-form-model-item :label="$t('max_amount')" prop="max_amount">
          <a-input type="number" v-model="form.max_amount" />
        </a-form-model-item>
      </a-col>
      <a-col :span="12" style="padding-right: 10px">
        <a-form-model-item :label="$t('left_amount')" prop="left_amount">
          <a-input type="number" v-model="form.left_amount" />
        </a-form-model-item>
      </a-col>
      <a-col :span="12" style="padding-left: 10px">
        <a-form-model-item :label="$t('status')">
          <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="status" />
        </a-form-model-item>
      </a-col>
      <a-col :span="12" style="padding-right: 10px">
        <a-form-model-item :label="$t('begin_at')" prop="begin_at">
          <a-date-picker style="width: 100%" :placeholder="$t('begin_at')" v-model="form.begin_at" value-format="YYYY-MM-DD" format="YYYY-MM-DD"/>
        </a-form-model-item>
      </a-col>
      <a-col :span="12" style="padding-left: 10px">
        <a-form-model-item :label="$t('finish_at')" prop="finish_at">
          <a-date-picker style="width: 100%" :placeholder="$t('finish_at')" v-model="form.finish_at" value-format="YYYY-MM-DD" format="YYYY-MM-DD"/>
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
      status: true,
      form: {
        coupon_amount: null,
        coupon_percent: null,
        min_amount: null,
        max_amount: null,
        left_amount: null,
        begin_at: '',
        finish_at: '',
        status: 10
      },
      rules: {
        coupon_amount: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        coupon_percent: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        begin_at: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        finish_at: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
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
            let _form = { ...this.form }
            _form.coupon_amount = parseInt(this.form.coupon_amount)
            _form.coupon_percent = parseInt(this.form.coupon_percent)
            _form.min_amount = this.form.min_amount ? parseInt(this.form.min_amount) : undefined
            _form.max_amount = this.form.max_amount ? parseInt(this.form.max_amount) : undefined
            _form.left_amount = this.form.left_amount ? parseInt(this.form.left_amount) : undefined
            resolve({
              id: this.id ? this.id : undefined,
              data: _form
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
