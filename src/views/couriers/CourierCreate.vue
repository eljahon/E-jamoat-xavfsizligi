<template>
  <a-modal width="700px" centered v-model="visible" @cancel="hide" :title="!editable ? 'Add Couriers' : $t('edit_category')">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loading" @click="updateData">{{ $t('update') }}</a-button>
    </template>
    <!-- FORM -->
    <FormModel v-if="!editable" ref="courierCreate"/>
    <FormModel v-if="editable" ref="courierEdit"/>
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
      activeKey: '1',
      loading: false,
      visible: false,
      editableData: [],
      boolUpdateLoad: {}
    }
  },
  methods: {
    ...mapActions(['postCouriers', 'getAllCouriers', 'updateCourier', 'getCategoryBySlug']),
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
          this.$refs.courierEdit.form.phone = '+' + data.phone
          this.$refs.courierEdit.form.id = undefined
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
        this.$refs.courierEdit.resetForm()
      } else {
        this.$refs.courierCreate.resetForm()
      }
    },
    saveDate() {
      this.$refs.courierCreate.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.postCouriers(res.data).then(res => {
            this.getAllCouriers()
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
      this.$refs.courierEdit.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.updateCourier({
          id: res.id,
          data: res.data
        }).then(res => {
          this.getAllCouriers()
          this.hide()
          console.log(res)
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
