<template>
  <a-modal width="800px" centered v-model="visible" @cancel="hide" :title="!editable ? $t('add_category') : $t('edit_category')">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loading" @click="updateData">{{ $t('update') }}</a-button>
    </template>
      <a-tabs v-if="editable" type="card" v-model="activeKey">
        <a-tab-pane key="1">
          <span slot="tab">
            <flag iso="ru" />
            Русский
          </span>
        <FormModel ref="ruUpdate" :edit="true"/>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <flag iso="uz" />
            O'zbekcha
          </span>
          <FormModel ref="uzUpdate" :edit="true"/>
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab">
            <flag iso="us" />
            English
          </span>
          <FormModel ref="enUpdate" :edit="true"/>
        </a-tab-pane>
      </a-tabs>
    <!-- FORM -->
      <FormModel v-if="!editable" ref="categoryCreate" :edit="false"/>
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
      langs: ['ru', 'uz', 'en'],
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
    ...mapActions(['postCategory', 'getAllCategory', 'updateCategory', 'getCategoryBySlug']),
    hide() {
      this.visible = false
      this.clear()

    },
    show() {
      if (this.editable) {
        this.editableData = []
        // debugger
        if (!this.editableData.includes('1')) {
          this.editableData.push('1')
          this.getCategoryBySlug({
            slug: this.slug,
            lang: 'ru'
          }).then(res => {
            this.visible = true
            setTimeout(() => {
              this.$refs.ruUpdate.item = res.vendor_category
              this.$refs.ruUpdate.form.name = res.vendor_category.name
              this.$refs.ruUpdate.form.order = res.vendor_category.order
            }, 150)
          }).catch(err => {
            this.$notification.error({
              message: 'Error Request or Response',
              description: err.message,
            })
          })
        } else this.visible = true
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
        this.activeKey = '1'
        this.editableData = []
        if (this.$refs.ruUpdate) this.$refs.ruUpdate.resetForm()
        if (this.$refs.uzUpdate) this.$refs.uzUpdate.resetForm()
        if (this.$refs.enUpdate) this.$refs.enUpdate.resetForm()
      } else this.$refs.categoryCreate.resetForm()
    },
    saveDate  () {
      this.$refs.categoryCreate.validateForm().then(res => {
        console.log(res)
          this.loading = true
          this.postCategory(res.data).then(res => {
            console.log(res)
            this.getAllCategory()
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
      this.$refs.ruUpdate.validateForm().then(resRU => {
        this.activeKey = '2'
        setTimeout(() => {
          this.$refs.uzUpdate.validateForm().then(resUZ => {
            this.activeKey = '3'
            setTimeout(() => {
              this.$refs.enUpdate.validateForm().then(resEN => {
                this.loading = true
                this.updateFiles(resRU.id, 'ru', resRU.data)
                this.updateFiles(resUZ.id, 'uz', resUZ.data)
                this.updateFiles(resEN.id, 'en', resEN.data).then(res => {
                  if (this.boolUpdateLoad.uz || this.boolUpdateLoad.ru || this.boolUpdateLoad.uz) {
                    this.loading = false
                    this.getAllCategory(this.params)
                    this.hide()
                  } else this.loading = false
                })
              }).catch(error => {
                this.activeKey = '3'
              })
            }, 1000)
          }).catch(error => { this.activeKey = '2' })
        }, 1000)
      }).catch(error => { this.activeKey = '1' })
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
