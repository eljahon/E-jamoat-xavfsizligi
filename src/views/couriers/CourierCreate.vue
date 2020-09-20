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
  watch: {
    activeKey (e) {
      console.log(e)
      if (e === '1') this.pushDataUpdate('ru', e)
      if (e === '2') this.pushDataUpdate('uz', e)
      if (e === '3') this.pushDataUpdate('en', e)
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
    pushDataUpdate (lang, key) {
      if (!this.editableData.includes(key)) {
        this.editableData.push(key)
        this.getCategoryBySlug({
          slug: this.slug,
          lang: lang
        }).then(res => {
          console.log(res.vendor_category.lang)
          setTimeout(() => {
            switch (res.vendor_category.lang) {
              case 'ru':
                console.log(res.vendor_category.id)
                this.$refs.ruUpdate.item = res.vendor_category
                this.$refs.ruUpdate.form.name = res.vendor_category.name
                this.$refs.ruUpdate.form.order = res.vendor_category.order
                break;
              case 'uz':
                this.$refs.uzUpdate.item = res.vendor_category
                this.$refs.uzUpdate.form.name = res.vendor_category.name
                this.$refs.uzUpdate.form.order = res.vendor_category.order
                break;
              case 'en':
                this.$refs.enUpdate.item = res.vendor_category
                this.$refs.enUpdate.form.name = res.vendor_category.name
                this.$refs.enUpdate.form.order = res.vendor_category.order
                break;
              default:
                break;
            }
          }, 150)
        }).catch(err => {
          this.$notification.error({
            message: 'Error Request or Response',
            description: err.message,
          })
        })
      }
    },
    clear() {
      if (this.editable) {
        this.$refs.courierEdit.resetForm()
      } else {
        this.$refs.courierCreate.resetForm()
      }
    },
    saveDate  () {
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
    updateFiles(id, lang, data) {
      return new Promise((resolve, reject) => {
        this.updateCategory({
          id: id,
          locker: false,
          data: data
        }).then(res => {
          if (lang === 'ru') this.boolUpdateLoad.ru = true
          if (lang === 'uz') this.boolUpdateLoad.uz = true
          if (lang === 'en') this.boolUpdateLoad.en = true
          resolve()
          console.log(res)
        }).catch(err => {
          if (lang === 'ru') this.boolUpdateLoad.ru = false
          if (lang === 'uz') this.boolUpdateLoad.uz = false
          if (lang === 'en') this.boolUpdateLoad.en = false
          this.$notification.error({
            message: 'Error Request or Response',
            description: err.message,
          })
        })
      })
    },
    updateData () {
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
      // this.$refs.ruUpdate.validateForm().then(resRU => {
      //   this.activeKey = '2'
      //   setTimeout(() => {
      //     this.$refs.uzUpdate.validateForm().then(resUZ => {
      //       this.activeKey = '3'
      //       setTimeout(() => {
      //         this.$refs.enUpdate.validateForm().then(resEN => {
      //           this.loading = true
      //           this.updateFiles(resRU.id, 'ru', resRU.data)
      //           this.updateFiles(resUZ.id, 'uz', resUZ.data)
      //           this.updateFiles(resEN.id, 'en', resEN.data).then(res => {
      //             if (this.boolUpdateLoad.uz || this.boolUpdateLoad.ru || this.boolUpdateLoad.uz) {
      //               this.loading = false
      //               this.getAllCategory(this.params)
      //               this.hide()
      //             } else this.loading = false
      //           })
      //         }).catch(error => {
      //           this.activeKey = '3'
      //         })
      //       }, 1000)
      //     }).catch(error => { this.activeKey = '2' })
      //   }, 1000)
      // }).catch(error => { this.activeKey = '1' })
    }
  },
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
