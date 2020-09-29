<template>
  <a-modal width="800px" centered v-model="visible" @cancel="hide" :title="!editable ? 'Add Supplier Store' : 'Edit Supplier Store'">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loading" @click="updateData">{{ $t('update') }}</a-button>
    </template>
    <!-- FORM -->
    <FormModel v-if="!editable" ref="supplierStoreCreate"/>
    <FormModel v-if="editable" ref="supplierStoreEdit"/>
  </a-modal>
</template>
<script>
import FormModel from './Form'
import { mapActions } from 'vuex'
export default {
  components: {
    FormModel
  },
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
  data() {
    return {
      loading: false,
      visible: false
    }
  },
  methods: {
    ...mapActions(['getAllSupplierStores', 'postSupplierStore', 'updateSupplierStore']),
    hide() {
      this.visible = false
      this.clear()
    },
    show(data) {
      if (this.editable) {
        console.log(data)
        setTimeout(() => {
          this.$refs.supplierStoreEdit.id = data.id
          this.$refs.supplierStoreEdit.form = { ...data }
          this.$refs.supplierStoreEdit.form.phone = '+998' + data.phone
          this.$refs.supplierStoreEdit.form.id = undefined
          this.$refs.supplierStoreEdit.form.slug = undefined
        }, 10)
        this.visible = true
      }
      if (!this.editable) {
        this.visible = true
      }
    },
    clear() {
      if (this.editable) {
        this.$refs.supplierStoreEdit.resetForm()
      } else {
        this.$refs.supplierStoreCreate.resetForm()
      }
    },
    saveDate() {
      this.$refs.supplierStoreCreate.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.postSupplierStore(res.data).then(res => {
          this.getAllSupplierStores(this.params)
          console.log(res)
          this.hide()
        })
          .catch(error => {
            this.$notification.error({
              message: 'Error Request or Response',
              description: error.message,
            })
          })
          .finally(() => {
            this.loading = false
          })
      }).catch(error => {
        console.log(error, 'ERRROORRRRRRRRRRRR')
      })
    },
    updateData() {
      this.$refs.supplierStoreEdit.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.updateSupplierStore({
          id: res.id,
          data: res.data
        }).then(res => {
          this.getAllSupplierStores(this.params)
          console.log(res)
          this.hide()
        }).catch(error => {
          this.$notification.error({
            message: 'Error Request or Response',
            description: error.message,
          })
        })
          .finally(() => {
            this.loading = false
          })
      })
    },
  }
}
</script>
<style>

.flag-icon {
  min-width: 26px;
  min-height: 26px;
  border-radius: 50%;
  box-shadow: 0px 0px 4px black;
  margin-right: 2px;
  transform: translateY(-5px);
}
</style>
