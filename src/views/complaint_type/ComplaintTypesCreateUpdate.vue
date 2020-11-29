<template>
  <a-modal width="700px" centered v-model="visible" @cancel="hide" :title="!editable ? $t('add_form') : $t('update_form')">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loading" @click="updateData">{{ $t('update') }}</a-button>
    </template>
    <!-- FORM -->
    <FormModel v-if="!editable" ref="complaintCreate"/>
    <FormModel v-if="editable" ref="complaintEdit"/>
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
    ...mapActions(['getAllComplaintTypes', 'postComplaintTypes', 'updateComplaintTypes']),
    hide() {
      this.visible = false
      this.clear()
    },
    show(data) {
      if (this.editable) {
        console.log(data)
        setTimeout(() => {
          this.$refs.courierEdit.id = data.id
          this.$refs.courierEdit.form = { ...data }
          // this.$refs.courierEdit.form.phone = '+' + data.phone
          // this.$refs.courierEdit.form.id = undefined
          // this.$refs.courierEdit.form.car_number = data.car_number
          // this.$refs.courierEdit.form.car_type = data.car_type
          // this.$refs.courierEdit.form.car_model = data.car_model
          // this.$refs.courierEdit.form.status = data.status
        }, 0)
        this.visible = true
      }
      if (!this.editable) {
        this.visible = true
      }
    },
    clear() {
      if (this.editable) {
        this.$refs.complaintEdit.resetForm()
      } else {
        this.$refs.complaintCreate.resetForm()
      }
    },
    saveDate() {
      this.$refs.complaintCreate.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.postComplaintTypes(res.data).then(res => {
          this.getAllComplaintTypes(this.params)
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
      this.$refs.complaintEdit.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.updateComplaintTypes({
          id: res.id,
          data: res.data
        }).then(res => {
          this.getAllComplaintTypes(this.params)
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
