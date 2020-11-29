<template>
  <a-modal width="700px" centered v-model="visible" @cancel="hide" :title="!editable ? $t('add_form') : $t('update_form')">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loading" @click="updateData">{{ $t('update') }}</a-button>
    </template>
    <!-- FORM -->
    <FormModel v-if="!editable" ref="deliveryTypeCreate"/>
    <FormModel v-if="editable" ref="deliveryTypeEdit"/>
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
    }
  },
  data() {
    return {
      loading: false,
      visible: false
    }
  },
  methods: {
    ...mapActions(['getAllDeliveryTypes', 'postDeliveryTypes', 'updateDeliveryType', 'getCategoryBySlug']),
    hide() {
      this.visible = false
      this.clear()
    },
    show(data) {
      if (this.editable) {
        console.log(data)
        setTimeout(() => {
          this.$refs.deliveryTypeEdit.id = data.id
          this.$refs.deliveryTypeEdit.form = { ...data }
          data.status === 10 ? this.$refs.deliveryTypeEdit.status = true : this.$refs.deliveryTypeEdit.status = false
          this.$refs.deliveryTypeEdit.form.id = undefined
        }, 0)
        this.visible = true
      }
      if (!this.editable) {
        this.visible = true
      }
    },
    clear() {
      if (this.editable) {
        this.$refs.deliveryTypeEdit.resetForm()
      } else {
        this.$refs.deliveryTypeCreate.resetForm()
      }
    },
    saveDate() {
      this.$refs.deliveryTypeCreate.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.postDeliveryTypes(res.data).then(res => {
          this.getAllDeliveryTypes(this.params)
          console.log(res)
          this.hide()
        })
          .finally(() => {
            this.loading = false
          })
      }).catch(error => {
        console.log(error, 'ERRROORRRRRRRRRRRR')
      })
    },
    updateData() {
      this.$refs.deliveryTypeEdit.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.updateDeliveryType({
          id: res.id,
          data: res.data
        }).then(res => {
          this.getAllDeliveryTypes(this.params)
          this.hide()
          console.log(res)
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
</style>
