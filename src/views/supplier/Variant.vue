<template>
  <a-modal v-model="visible" :title="$t('add_variant')" centered @cancel="hide">
    <template slot="footer">
      <a-button key="back" @click="hide">
        {{ $t('cancel') }}
      </a-button>
      <a-button key="submit" type="primary" @click="save">
        {{ $t('save') }}
      </a-button>
    </template>
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-row>
        <a-col :span="11">
          <a-form-model-item :label="$t('variant')" prop="value_id">
            <a-select v-model="form.value_id" @change="selectVariant">
              <a-select-option v-for="variant in variants" :key="variant.id + ':' + (variant.value_uz + ' - ' + variant.value_ru)" :value="variant.id">{{ variant.value_uz + ' - ' + variant.value_ru }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="11" :offset="1">
          <a-form-model-item :label="$t('price')" prop="price">
            <a-input type='number' v-model="form.price" />
          </a-form-model-item>
        </a-col >
        <a-col :span="11">
          <a-form-model-item :label="$t('unicode')" prop="unicode">
            <a-input type='number' v-model="form.unicode" />
          </a-form-model-item>
        </a-col>
        <a-col :span="11" :offset="1">
          <a-form-model-item :label="$t('stock')" prop="stock">
            <a-input type='number' v-model="form.stock" />
          </a-form-model-item>
        </a-col>
        <a-col :span="11">
          <a-form-model-item :label="$t('discount')" prop="discount">
            <a-input type='number' v-model="form.discount" />
          </a-form-model-item>
        </a-col>
        <a-col :span="11" :offset="1">
          <a-form-model-item :label="$t('old_price')" prop="old_price">
            <a-input type='number' v-model="form.old_price" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      visible: false,
      variants: [],
      isUpdate: false,
      index: null,
      child_id: null,
      form: {
        name: '',
        value_id: null,
        unicode: null,
        price: null,
        discount: null,
        old_price: null,
        stock: null
      },
      rules: {
        value_id: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        price: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        stock: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        unicode: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }]
      }
    }
  },
  methods: {
    hide () {
      this.clear()
      this.switchModal(false)
    },
    clear () {
      this.child_id = null
      this.isUpdate = false
      this.$refs.ruleForm.resetFields();
    },
    switchModal (e, variant, index, childId, isUpdate) {
      this.visible = e
      this.index = index
      this.isUpdate = isUpdate
      this.child_id = childId
      if (variant) {
        this.variants = variant
      } else this.variants = []
      console.log(this.form)
    },
    send () {
      this.$emit('input', {
        data: { ...this.form },
        index: this.index,
        update: this.isUpdate,
        child_id: this.child_id
      })
    },
    selectVariant (e, options) {
      const name = options.key.split(':')[1]
      this.form.name = name
    },
    save () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.send()
            setTimeout(() => {
              this.hide()
            }, 100)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
