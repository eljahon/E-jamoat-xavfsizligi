<template>
  <a-modal width="700px" centered v-model="visible" @cancel="hide" :title="!editable ? $t('add_form') : $t('update_form')">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loading" @click="updateData">{{ $t('update') }}</a-button>
    </template>
    <!-- FORM -->
    <FormModel v-if="!editable" ref="itemCreate"/>
    <FormModel v-if="editable" ref="itemEdit"/>
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
    ...mapActions(['getAllCoupons', 'postCoupons', 'updateCoupons']),
    hide() {
      this.visible = false
      this.clear()
    },
    show(data) {
      if (this.editable) {
        console.log(data)
        setTimeout(() => {
          const _edit = this.$refs.itemEdit
          const _form = this.$refs.itemEdit.form
          data.status === 10 ? _edit.status = true : _edit.status = false
          _edit.id = data.id
          _form.coupon_amount = data.coupon_amount
          _form.coupon_percent = data.coupon_percent
          _form.min_amount = data.min_amount
          _form.max_amount = data.max_amount
          _form.left_amount = data.left_amount
          _form.begin_at = data.begin_at
          _form.finish_at = data.finish_at
          _form.status = data.status
        }, 10)
        this.visible = true
      }
      if (!this.editable) {
        this.visible = true
      }
    },
    clear() {
      if (this.editable) {
        this.$refs.itemEdit.resetForm()
      } else {
        this.$refs.itemCreate.resetForm()
      }
    },
    saveDate() {
      this.$refs.itemCreate.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.postCoupons(res.data).then(res => {
          this.getAllCoupons(this.params)
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
      this.$refs.itemEdit.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.updateCoupons({
          id: res.id,
          data: res.data
        }).then(res => {
          this.getAllCoupons(this.params)
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
