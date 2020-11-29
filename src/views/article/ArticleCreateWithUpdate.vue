<template>
  <a-modal width="700px" centered v-model="visible" @cancel="hide" :title="!editable ? $t('add_form') : $t('update_form')">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loading" @click="updateData">{{ $t('update') }}</a-button>
    </template>
    <!-- FORM -->
    <FormModel v-if="!editable" ref="articleCreate"/>
    <FormModel v-if="editable" ref="articleEdit"/>
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
    ...mapActions(['getAllArticles', 'postArticle', 'updateArticle']),
    hide() {
      this.visible = false
      this.clear()
    },
    show(data) {
      if (this.editable) {
        console.log(data)
        console.log(this.$refs.articleEdit)
        setTimeout(() => {
          this.$refs.articleEdit.id = data.id
          this.$refs.articleEdit.form.name_uz = data.name_uz
          this.$refs.articleEdit.form.name_ru = data.name_ru
          this.$refs.articleEdit.form.symbol = data.symbol
          this.$refs.articleEdit.form.status = data.status
        }, 10)
        this.visible = true
      }
      if (!this.editable) {
        this.visible = true
      }
    },
    clear() {
      if (this.editable) {
        this.$refs.articleEdit.resetForm()
      } else {
        this.$refs.articleCreate.resetForm()
      }
    },
    saveDate() {
      this.$refs.articleCreate.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.postArticle(res.data).then(res => {
          this.getAllArticles(this.params)
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
      this.$refs.articleEdit.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.updateMeasure({
          id: res.id,
          data: res.data
        }).then(res => {
          this.getAllMeasures(this.params)
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

.flag-icon {
  min-width: 26px;
  min-height: 26px;
  border-radius: 50%;
  box-shadow: 0px 0px 4px black;
  margin-right: 2px;
  transform: translateY(-5px);
}
</style>
