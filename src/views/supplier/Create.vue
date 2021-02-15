<template>
  <a-card title="Supplier product create">
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-row>
        <a-col :span="11">
          <a-form-model-item :label="$t('product')" prop="product_id">
            <a-auto-complete
              v-model='form.product_id'
              :data-source="products"
              style='width: 100%'
              placeholder='input here'
              @search='getItems'
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="11" :offset='1'>
          <a-form-model-item :label="$t('supplier_store')" prop="supplier_store_id">
            <a-select style="width: 100%" v-model='form.supplier_store_id'>
              <a-select-option v-for='sup in allSupplierStores' :key='sup.id' :value="sup.id">
                {{ sup.location }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="11">
          <a-form-model-item :label="$t('price')" prop="price">
            <a-input type='number' v-model="form.price" />
          </a-form-model-item>
        </a-col >
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
        <a-col :span="11">
          <a-form-model-item :label="$t('ball')" prop="ball">
            <a-input type='number' v-model="form.ball" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </a-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { AutoComplete } from 'ant-design-vue'
import debounce from 'lodash/debounce'
export default {
  components: {
    'a-auto-complete': AutoComplete
  },
  data () {
    this.getItems = debounce(this.getItems, 1000)
    return {
      id: null,
      status: true,
      products: [],
      form: {
        product_id: '',
        price: null,
        discount: null,
        old_price: null,
        ball: null,
        stock: null,
        supplier_store_id: null,
        supplier_id: this.$route.params.id
      },
      rules: {
        product_id: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        price: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        stock: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        supplier_store_id: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
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
  computed: {
    ...mapGetters(['allSupplierStores'])
  },
  methods: {
    ...mapActions(['getAllProduct', 'getAllSupplierStores']),
    getItems (e) {
      console.log(e)
      this.getAllProduct({
        pagination: {
          current: 1
        },
        name: e
      }).then(res => {
        this.products = res.data.map(e => {
          return {
            text: e.name_uz + ' ' + e.name_ru,
            value: e.id.toString()
          }
        })
      })
    },
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const _form = { ...this.form }
            // _form.phone = this.form.phone.replaceAll(' ', '')
            _form.stock = parseInt(this.form.stock)
            _form.product_id = parseInt(this.form.product_id)
            _form.price = parseInt(this.form.price)
            _form.supplier_id = parseInt(this.form.supplier_id)
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
  },
  mounted() {
    console.log(this.$route.query.supplierID)
    this.getAllSupplierStores({
      id: this.$route.query.supplierID
    })
  }
}
</script>
