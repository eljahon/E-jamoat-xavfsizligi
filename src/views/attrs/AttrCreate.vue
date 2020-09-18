<template>
  <a-modal width="500px" centered v-model="visible" @cancel="hide" :title="!editable ? $t('add_attr') : $t('update_attr')">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loadingEdit" @click="editAttr">{{ $t('update') }}</a-button>
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
    <FormModel v-if="!editable" ref="attrCreate" :edit="false"/>
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
      attrLangList: [],
      loadingEdit: false,
      boolUpdateLoad: {}
    }
  },
  watch: {
    activeKey (e) {
      console.log(e)
      if (e === '1') this.pushDataUpdate({ slug: this.slug, lang: 'ru', e: e })
      if (e === '2') this.pushDataUpdate({ slug: this.slug, lang: 'uz', e: e })
      if (e === '3') this.pushDataUpdate({ slug: this.slug, lang: 'en', e: e })
    }
  },
  methods: {
    ...mapActions(['postAttr', 'getAllAttrs', 'getAttrBySlug', 'updateAttr']),
    hide() {
      this.visible = false
      this.clear()
    },
    refUtil (lang) {
      if (lang === 'ru') return this.$refs.ruUpdate
      if (lang === 'uz') return this.$refs.uzUpdate
      if (lang === 'en') return this.$refs.enUpdate
    },
    show() {
      if (this.editable) {
        this.attrLangList = []
        this.pushDataUpdate({ slug: this.slug, lang: 'ru', e: '1' })
        this.visible = true
      }
      if (!this.editable) {
        this.visible = true
      }
    },
    pushDataUpdate (attr) {
      if (!this.attrLangList.includes(attr.e)) {
        this.attrLangList.push(attr.e)
        this.getAttrBySlug({
          slug: attr.slug,
          lang: attr.lang
        }).then(res => {
          console.log(res.product_property)
          if (this.refUtil(attr.lang)) {
            const item = res.product_property
            this.refUtil(attr.lang).item = item
            this.refUtil(attr.lang).form.name = item.name
            this.refUtil(attr.lang).form.order = item.order
            this.refUtil(attr.lang).form.description = item.description
            this.refUtil(attr.lang).form.type = item.type
            this.refUtil(attr.lang).active = item.active
          }
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
        this.attrLangList = []
        if (this.$refs.ruUpdate) this.$refs.ruUpdate.resetForm()
        if (this.$refs.uzUpdate) this.$refs.uzUpdate.resetForm()
        if (this.$refs.enUpdate) this.$refs.enUpdate.resetForm()
      } else this.$refs.attrCreate.resetForm()
    },
    saveDate  () {
      this.$refs.attrCreate.validateForm().then(res => {
        console.log(res)
        if (res.valid) {
          console.log(res.data)
          this.loading = true
          this.postAttr(res.data).then(res => {
            console.log(res)
            this.getAllAttrs(this.params)
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
        }
      }).catch(error => {
        console.log(error, 'ERRROORRRRRRRRRRRR')
      })
    },
    saveEditAttr (id, data) {
      this.updateAttr({ id: id, data: data }).then(res => {
        console.log(res)
        this.getAllAttrs(this.params)
      })
    },
    editAttr () {
      this.loadingEdit = true
      if (this.refUtil('ru')) {
        this.refUtil('ru').validateForm().then(resRU => {
          this.activeKey = '2'
          setTimeout(() => {
            if (this.refUtil('uz')) {
              this.refUtil('uz').validateForm().then(resUZ => {
                this.activeKey = '3'
                setTimeout(() => {
                  if (this.refUtil('en')) {
                    this.refUtil('en').validateForm().then(resEN => {
                      this.saveEditAttr(resRU.id, resRU.data)
                      this.saveEditAttr(resUZ.id, resUZ.data)
                      this.saveEditAttr(resEN.id, resEN.data)
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
    }
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
