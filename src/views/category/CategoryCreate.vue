<template>
  <a-modal width="800px" centered v-model="visible" @cancel="hide" :title="!editable ? $t('add_category') : $t('edit_category')">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loading" @click="updateData">{{ $t('update') }}</a-button>
    </template>
    <!-- FORM -->
      <FormModel v-if="!editable" ref="categoryCreate" />
      <FormModel v-if="editable" ref="categoryEdit" :edit="true"/>
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
    ...mapActions(['postCategory', 'getAllCategory', 'updateCategory', 'getCategoryBySlug']),
    hide() {
      this.visible = false
      this.clear()
    },
    show(data) {
      if (this.editable) {
        console.log(data)
        setTimeout(() => {
          const e = this.$refs.categoryEdit.form
          this.$refs.categoryEdit.item = data
          this.$refs.categoryEdit.imageUrl = data.image_url
          e.name_ru = data.name_ru
          e.name_uz = data.name_uz
          e.is_popular = data.is_popular
          e.description = data.description
          e.image = data.image
          e.keyword = data.keyword
          e.status = data.status
        }, 1)
        this.visible = true
      }
      if (!this.editable) {
        this.visible = true
      }
    },
    clear() {
      if (this.editable) {
        this.$refs.categoryEdit.resetForm()
      }
      if (!this.editable) {
        this.$refs.categoryCreate.resetForm()
      }
    },
    saveDate  () {
      this.$refs.categoryCreate.validateForm().then(res => {
        console.log(res)
          this.loading = true
          this.postCategory(res.data).then(res => {
            console.log(res)
            this.getAllCategory(this.params)
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
    updateData () {
      this.$refs.categoryEdit.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.updateCategory(res).then(res => {
          console.log(res)
          this.getAllCategory(this.params)
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
