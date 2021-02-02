<template>
  <a-modal width="700px" :maskClosable='false' centered v-model="visible" @cancel="hide" :title="!editable ? $t('add_form') : $t('update_form')">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loading" @click="updateData">{{ $t('update') }}</a-button>
    </template>
    <!-- FORM -->
    <FormModel v-if="!editable" ref="supplierCreate"/>
    <FormModel v-if="editable" ref="supplierEdit"/>
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
    ...mapActions(['getAllSuppliers', 'postSupplier', 'updateSupplier']),
    hide() {
      this.visible = false
      this.clear()
    },
    show(data) {
      if (this.editable) {
        console.log(data)
        setTimeout(() => {
          this.$refs.supplierEdit.id = data.id
          this.$refs.supplierEdit.form = { ...data }
          this.$refs.supplierEdit.form.name = data.name
          this.$refs.supplierEdit.form.phone = data.phone
          this.$refs.supplierEdit.form.id = undefined
          this.$refs.supplierEdit.form.slug = undefined
        }, 10)
        this.visible = true
      }
      if (!this.editable) {
        this.visible = true
      }
    },
    clear() {
      if (this.editable) {
        this.$refs.supplierEdit.resetForm()
      } else {
        this.$refs.supplierCreate.resetForm()
      }
    },
    saveDate() {
      this.$refs.supplierCreate.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.postSupplier(res.data).then(res => {
          this.getAllSuppliers(this.params)
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
      this.$refs.supplierEdit.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.updateSupplier({
          id: res.id,
          data: res.data
        }).then(res => {
          this.getAllSuppliers(this.params)
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
