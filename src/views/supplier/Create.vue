<template>
  <a-card :title="$route.params.id ? $t('supplier.product.update') : $t('supplier.product.create')">
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-row>
        <a-col :span="11">
          <a-form-model-item :label="$t('product')" prop="product_id">
            <a-spin :spinning='spinning'>
              <a-auto-complete
                :allowClear="true"
                :data-source="products"
                v-model='product_name'
                style='width: 100%'
                :placeholder="$t('search_product')"
                @search='getItems'
                @select='selectProduct'
              />
            </a-spin>
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
          <a-form-model-item :label="$t('ball')" prop="ball">
            <a-input type='number' v-model="form.ball" />
          </a-form-model-item>
<!--          <a-form-model-item :label="$t('stock')" prop="stock">-->
<!--            <a-input type='number' v-model="form.stock" />-->
<!--          </a-form-model-item>-->
        </a-col>
        <a-col :span="11">
          <a-form-model-item :label="$t('discount')" prop="discount">
            <a-input type='number' :min='0' :max='99' v-model="form.discount" />
          </a-form-model-item>
        </a-col>
        <a-col :span="11" :offset="1">
          <a-form-model-item :label="$t('discount_price')">
            <a-input type='number' disabled :value="Math.round((form.price * (1 - (form.discount / 100))) / 100) * 100"/>
          </a-form-model-item>
        </a-col>
<!--        <a-col :span="11">-->
<!--          -->
<!--        </a-col>-->
<!--        <a-col :span="11" :offset="1">-->
<!--          <a-form-model-item :label="$t('old_price')" prop="old_price">-->
<!--            <a-input type='number' v-model="form.old_price" />-->
<!--          </a-form-model-item>-->
<!--        </a-col>-->
      </a-row>
    </a-form-model>
    <h1 v-if="variants.length > 0"><strong>{{ $t('variants') }}</strong></h1>
    <div v-if="variants.length > 0">
      <div v-for="(v, j) in variants" :key="v.id">
        <a-divider v-if="variants.length > 0" orientation="left">
          {{ v.name_uz + ' - ' + v.name_ru }}
        </a-divider>
        <div class="variant">
          <a-card size="small" v-for="(card, i) in v.variants" :key="i" :title="card.name" class="cardCustom">
            <div slot="extra" class="extraButtons">
              <a-button style="margin: 0 2px" size="small" type="primary" shape="circle" icon="edit" @click="updateVariant(v.values, j,i)"/>
              <a-button style="margin: 0 2px" size="small" type="danger" shape="circle" icon="delete" @click="v.variants.splice(i, 1)"/>
            </div>
            <p>Price: {{ card.price }}</p>
          </a-card>
        </div>
        <a-button type="primary" @click="addVariant(v.values, j)" style="margin: 15px 0px 15px 10px">{{ $t('add_variant') }}</a-button>
      </div>
    </div>
    <variant @input="variantChange" ref="variant"/>
    <a-button @click="validateForm" :loading='loading'>{{ $route.params.id ? $t('update_product') : $t('create_product') }}</a-button>
  </a-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { AutoComplete } from 'ant-design-vue'
import Variant from '@/views/supplier/Variant'
import debounce from 'lodash/debounce'
export default {
  components: {
    'a-auto-complete': AutoComplete,
    'variant': Variant
  },
  data () {
    this.getItems = debounce(this.getItems, 1000)
    return {
      product_name: '',
      id: null,
      status: true,
      products: [],
      loading: false,
      productGrId: null,
      spinning: false,
      form: {
        product_id: null,
        price: null,
        discount: null,
        // old_price: null,
        ball: null,
        // stock: null,
        supplier_store_id: null,
        supplier_id: this.$route.query.supplierID
      },
      variants: [],
      rules: {
        product_id: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        price: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        // stock: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        supplier_store_id: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        discount: [{
          validator: (rule, value, callback) => {
            if (value >= 0 && value <= 100) {
              callback()
            } else {
              callback(new Error(this.$t('percentRequired')))
            }
          },
          trigger: 'change'
        }]
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
    ...mapActions(['getAllProduct', 'getAllSupplierStores', 'getSupplierIsNotProduct', 'getProductVariants', 'postSupplierProduct', 'getSupplierProductWithId', 'updateSupplierProduct']),
    variantChange (e) {
      if (e.update) {
        console.log(e.data)
        const v = [...this.variants[e.index].variants];
        v[e.child_id] = e.data
        this.variants[e.index].variants = v
        console.log(this.variants[e.index].variants[e.child_id])
      } else {
        this.variants[e.index].variants.push(e.data)
      }
      console.log(e)
    },
    addVariant (variant, index) {
      this.$refs.variant.switchModal(true, variant, index)
    },
    updateVariant (variant, j, i) {
      this.$refs.variant.form = { ...this.variants[j].variants[i] }
      this.$refs.variant.switchModal(true, variant, j, i, true)
    },
    selectProduct (e) {
      const _data = e.split(':')
      console.log(_data)
      this.getProductVariants(_data[1]).then(res => {
        const _data = [ ...res.data ]
        const newData = _data.map(e => {
          return {
            ...e,
            variants: []
          }
        })
        this.variants = newData
      })
      this.form.product_id = parseInt(_data[0])
      this.productGrId = parseInt(_data[1])
    },
    getItems (e) {
      if (e.length === 0) {
        this.variants = []
      }
      console.log(e)
      this.spinning = true
      this.getSupplierIsNotProduct({
        id: this.$route.query.supplierID,
        search: e
      }).then(res => {
        this.products = res.data.map(e => {
          return {
            text: e.name,
            value: e.id.toString() + ':' + e.group_id.toString()
          }
        })
      }).finally(() => {
        this.spinning = false
      })
    },
    validateForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            const _form = { ...this.form }
            _form.product_id = parseInt(this.form.product_id)
            _form.old_price = parseInt(this.form.price)
            _form.supplier_id = parseInt(this.form.supplier_id)
            if (this.variants.length > 0) {
              let v = []
              for (let i = 0; i < this.variants.length; i++) {
                for (let j = 0; j < this.variants[i].variants.length; j++) {
                  v.push(this.variants[i].variants[j])
                }
              }
              _form.variants = v
            } else _form.variants = []
            this.loading = true
            if (this.$route.params.id) {
              this.updateSupplierProduct({
                id: this.$route.params.id,
                data: _form
              }).then(res => {
                // this.$router.go(-1)
                this.$router.push({
                  name: 'supplierPreview',
                  params: {
                    id: this.$route.query.supplierID
                  },
                  query: {
                    key: 3
                  }
                })
              }).finally(() => {
                this.loading = false
              })
            } else {
              this.postSupplierProduct(_form).then(res => {
                this.$router.go(-1)
              }).finally(() => {
                this.loading = false
              })
            }
            console.log(_form)
          }
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
    if (this.$route.params.id) {
      this.getSupplierProductWithId(this.$route.params.id).then(res => {
        // this.$router.push({
        //   name: 'supplierProductUpdate',
        //   params: {
        //     id: this.$route.params.id
        //   },
        //   query: {
        //     supplierID: this.$route.query.supplierID,
        //     prodcuct_id: res.data.product_id
        //   }
        // })
        const _data = res.data
        const _form = this.form
        this.product_name = _data.product_name
        _form.product_id = _data.product_id
        // _form.price = _data.price
        _form.discount = _data.discount
        _form.price = _data.old_price
        _form.ball = _data.ball
        _form.supplier_store_id = _data.supplier_store_id
      })
    }
  }
}
</script>
<style lang="less">
.variant {
  display: flex;
  width: 100%;
  .cardCustom {
    width: 25%;
    padding: 0 10px;
    margin: 5px 10px;
    .extraButtons {
      display: flex;
    }
  }
}
</style>
