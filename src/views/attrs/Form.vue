<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-form-model-item ref="type" :label="$t('add_type')" prop="type">
        <a-select style="width: 100%" v-model="form.type">
          <a-select-option v-for="t in types" :key="t.value" :value="t.value">
            {{ t.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item ref="name" :label="$t('name')" prop="name">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item ref="description" :label="$t('description')">
        <a-input v-model="form.description" />
      </a-form-model-item>
      <a-form-model-item ref="order" :label="$t('order_number')" prop="order">
        <a-input-number style="width: 100%" :min="0" v-model="form.order" />
      </a-form-model-item>
    </a-form-model>
    <div v-if="form.type" style="border-top: 2px solid lightgrey; padding-top: 10px">
      <div v-if="form.type === 'checkbox'">
        <a-checkbox> <strong>Example 1</strong>  + 9000</a-checkbox>
        <a-checkbox> <strong>Example 2</strong>  + 8000</a-checkbox>
      </div>
      <div v-if="form.type === 'radio'">
        <a-radio-group>
          <a-radio value="Example 1"> <strong>Example 1</strong>  + 9000</a-radio>
          <a-radio value="Example 2"> <strong>Example 2</strong>  + 8000 </a-radio>
        </a-radio-group>
      </div>
      <div v-if="form.type === 'select'">
        <a-select style="width: 200px">
          <a-select-option value="Example 1"> <strong>Example 1</strong>  + 9000</a-select-option>
          <a-select-option value="Example 2"> <strong>Example 2</strong>  + 8000</a-select-option>
        </a-select>
      </div>
      <div v-if="form.type === 'text'">
        <a-select style="width: 200px">
          <strong>Example 1</strong>  + 9000
        </a-select>
      </div>
      <div v-if="form.type === 'number'">
        <a-select style="width: 200px">
          <strong>Example 1</strong>  + 9000
        </a-select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    edit: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data () {
    return {
      form: {
        name: '',
        order: null,
        description: '',
        type: null
      },
      active: true,
      item: null,
      types: [
        {
          name: 'Chekbox',
          value: 'checkbox'
        },
        {
          name: 'Radio',
          value: 'radio'
        },
        {
          name: 'Select',
          value: 'select'
        },
        {
          name: 'Text',
          value: 'text'
        },
        {
          name: 'Number',
          value: 'number'
        }
      ],
      rules: {
        name: [{ required: true, message: this.$t('name-validation'), trigger: 'blur' }],
        order: [{ required: true, message: this.$t('order-validation'), trigger: 'blur' }],
        type: [{ required: true, message: this.$t('type-validaion'), trigger: 'change' }]
      }
    }
  },
  methods: {
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid === true) {
            resolve({
              valid: true,
              id: this.edit ? this.item.id : undefined,
              data: {
                active: true,
                name: this.form.name,
                order: this.form.order,
                lang: this.edit ? this.item.lang : 'ru',
                type: this.form.type,
                description: this.form.description
              }
            })
          } else reject(valid)
        })
      })
    },
    resetForm () {
      this.form.description = ''
      this.$refs.ruleForm.resetFields();
    }
  }
}
</script>
