<template>
  <a-modal width="700px" centered v-model="visible" @cancel="hide" :title="!editable ? $t('add_form') : $t('update_form')">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loading" @click="updateData">{{ $t('update') }}</a-button>
    </template>
    <!-- FORM -->
    <FormModel v-if="!editable" ref="vacancyCreate"/>
    <FormModel v-if="editable" ref="vacancyEdit"/>
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
    ...mapActions(['getAllVacancys', 'postVacancy', 'updateVacancy']),
    hide() {
      this.visible = false
      this.clear()
    },
    show(data) {
      if (this.editable) {
        console.log(data)
        setTimeout(() => {
          this.$refs.vacancyEdit.id = data.id
          this.$refs.vacancyEdit.form.title_uz = data.title_uz
          this.$refs.vacancyEdit.form.title_ru = data.title_ru
          this.$refs.vacancyEdit.form.content_ru = data.content_ru
          this.$refs.vacancyEdit.form.content_uz = data.content_uz
          this.$refs.vacancyEdit.form.location_id = data.location_id
        }, 10)
        this.visible = true
      }
      if (!this.editable) {
        this.visible = true
      }
    },
    clear() {
      if (this.editable) {
        this.$refs.vacancyEdit.resetForm()
      } else {
        this.$refs.vacancyCreate.resetForm()
      }
    },
    saveDate() {
      this.$refs.vacancyCreate.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.postVacancy(res.data).then(res => {
          this.getAllVacancys(this.params)
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
      this.$refs.vacancyEdit.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.updateVacancy({
          id: res.id,
          data: res.data
        }).then(res => {
          this.getAllVacancys(this.params)
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
