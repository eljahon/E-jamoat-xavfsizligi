<template>
  <a-modal width="800px" centered v-model="visible" :maskClosable="false" @cancel="hide" :title="$t('add_category')">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button v-if="!editable" html-type="submit" type="primary" @click="addProduct" :loading="loading">
        {{ $t('add') }}
      </a-button>
      <a-button v-if="editable" html-type="submit" type="primary" @click="editProduct" :loading="loadingEdit">
        {{ $t('update') }}
      </a-button>
    </template>
    <div style="height: 450px; overflow-y: scroll">
      <a-tabs v-if="editable" type="card" v-model="activeKey">
        <a-tab-pane key="1">
          <span slot="tab">
            <flag iso="ru" />
            Русский
          </span>
          <product-create :edit="editable" ref="ruUpdate" />
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <flag iso="uz" />
            O'zbekcha
          </span>
          <product-create :edit="editable" ref="uzUpdate" />
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab">
            <flag iso="us" />
            English
          </span>
          <product-create :edit="editable" ref="enUpdate" />
        </a-tab-pane>
      </a-tabs>
      <!-- FORM -->
      <product-create v-if="!editable" ref="createProduct"></product-create>
    </div>
  </a-modal>
</template>

<script>
import FormCreate from '@/views/products/FormCreate'
import { mapActions } from 'vuex'
export default {
  props: {
    editable: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
    slug: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  components: {
    'product-create': FormCreate
  },
  data() {
    return {
      activeKey: '1',
      loading: false,
      visible: false,
      productLangList: [],
      loadingEdit: false
    }
  },
  watch: {
    activeKey (e) {
      if (e === '1') this.pushProduct({ slug: this.slug, lang: 'ru', e: e })
      if (e === '2') this.pushProduct({ slug: this.slug, lang: 'uz', e: e })
      if (e === '3') this.pushProduct({ slug: this.slug, lang: 'en', e: e })
    }
  },
  methods: {
    ...mapActions(['postProduct', 'getAllProduct', 'getProductBySlug', 'updateProduct', 'updateProductAttr']),
    hide() {
      this.visible = false
      this.clear()
    },
    refUtil (lang) {
      if (lang === 'ru') return this.$refs.ruUpdate
      if (lang === 'uz') return this.$refs.uzUpdate
      if (lang === 'en') return this.$refs.enUpdate
    },
    validateRefs (ref) {
      if (ref) {
        return true
      } else return false
    },
    pushProduct (product) {
      return new Promise((resolve, reject) => {
        if (!this.productLangList.includes(product.e)) {
          this.productLangList.push(product.e)
          this.getProductBySlug({ slug: product.slug, lang: product.lang }).then(res => {
            resolve()
            if (this.refUtil(product.lang)) {
              const item = res.product
              this.refUtil(product.lang).item = item
              this.refUtil(product.lang).active = item.active
              this.refUtil(product.lang).main.name = item.name
              this.refUtil(product.lang).main.description = item.description
              this.refUtil(product.lang).main.order = item.order
              this.refUtil(product.lang).main.price = item.price
              this.refUtil(product.lang).main.category_id = item.vendor_category.id
              this.refUtil(product.lang).image = item.image.slice(-36)
              this.refUtil(product.lang).imageUrl = item.image
              this.refUtil(product.lang).meta = item.meta
              this.refUtil(product.lang).attrList = item.properties.length > 0 ? item.properties.map(e => {
                return {
                  property_id: e.property.id,
                  values: e.values,
                  type: e.property.type
                }
              }) : []
            }
          })
        }
      })
    },
    show () {
      if (this.editable) {
        this.productLangList = []
        this.visible = true
        this.pushProduct({ slug: this.slug, lang: 'ru', e: '1' })
      } else this.visible = true
    },
    addProduct () {
      this.$refs.createProduct.validateForm().then(res => {
        this.postProduct(res.data).then(response => {
          this.$refs.createProduct.clear()
          this.hide()
          this.getAllProduct(this.params)
        })
      })
    },
    saveEditProducts (id, attrs, data) {
      this.updateProduct({ id: id, data: data }).then(res => {
        this.getAllProduct(this.params)
        console.log(res)
      })
      this.updateProductAttr({ id: id, data: { properties: attrs } })
    },
    editProduct () {
      this.loadingEdit = true
      if (this.validateRefs(this.refUtil('ru'))) {
        this.refUtil('ru').validateForm().then(resRU => {
          this.activeKey = '2'
          setTimeout(() => {
            if (this.validateRefs(this.refUtil('uz'))) {
              this.refUtil('uz').validateForm().then(resUZ => {
                this.activeKey = '3'
                setTimeout(() => {
                  if (this.validateRefs(this.refUtil('en'))) {
                    this.refUtil('en').validateForm().then(resEN => {
                      this.saveEditProducts(resRU.id, resRU.attributes, resRU.data)
                      this.saveEditProducts(resUZ.id, resUZ.attributes, resUZ.data)
                      this.saveEditProducts(resEN.id, resEN.attributes, resEN.data)
                      this.loadingEdit = false
                      this.hide()
                    }).catch(err => {
                      this.loadingEdit = false
                      this.activeKey = '3'
                    })
                  } else {
                    this.loadingEdit = false
                    this.activeKey = '3'
                  }
                }, 1000)
              }).catch(err => {
                this.loadingEdit = false
                this.activeKey = '2'
              })
            } else {
              this.loadingEdit = false
              this.activeKey = '2'
            }
          }, 1000)
        }).catch(err => {
          this.loadingEdit = false
          this.activeKey = '1'
        })
      } else {
        this.loadingEdit = false
        this.activeKey = '1'
      }
    },
    clear () {
      this.productLangList = []
      this.activeKey = '1'
      if (this.$refs.createProduct) this.$refs.createProduct.resetForm()
      if (this.editable) {
        if (this.refUtil('ru')) this.refUtil('ru').resetForm()
        if (this.refUtil('uz')) this.refUtil('uz').resetForm()
        if (this.refUtil('en')) this.refUtil('en').resetForm()
      }
    }
  }
}
</script>
