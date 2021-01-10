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
          const _form = this.$refs.supplierStoreEdit.form
          this.$refs.supplierStoreEdit.id = data.id
          _form.supplier_id = this.$route.params.id
          _form.phone = data.phone.toString().slice(3)
          _form.second_phone = data.second_phone ? data.second_phone.toString().slice(3) : ''
          _form.location_id = data.location_id
          _form.address_uz = data.address_uz
          _form.address_ru = data.address_ru
          const _coords = JSON.parse(data.coordinates)
          console.log(_coords)
          this.$refs.supplierStoreEdit.location = [_coords.lat, _coords.lng]
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
