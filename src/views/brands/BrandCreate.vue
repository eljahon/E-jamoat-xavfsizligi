<template>
  <a-modal width="700px" centered v-model="visible" :maskClosable="false" @cancel="hide" :title="!editable ? $t('add_form') : $t('update_form')">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loading" @click="updateData">{{ $t('update') }}</a-button>
    </template>
    <!-- FORM -->
    <FormModel v-if="!editable" ref="brandCreate"/>
    <FormModel v-if="editable" ref="brandEdit"/>
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
      visible: false,
    }
  },
  methods: {
    ...mapActions(['postBrand', 'getAllBrands', 'updateBrand']),
    hide() {
      this.visible = false
      this.clear()
    },
    show(data) {
      if (this.editable) {
        console.log(data)
        setTimeout(() => {
          this.$refs.brandEdit.id = data.id
          this.$refs.brandEdit.imageUrl = data.logo_url
          data.status === 10 ? this.$refs.brandEdit.status = true : this.$refs.brandEdit.status = false
          this.$refs.brandEdit.form = { ...data }
          this.$refs.brandEdit.form.id = undefined
          this.$refs.brandEdit.form.slug = undefined
          this.$refs.brandEdit.form.logo_url = undefined
        }, 0)
        this.visible = true
      }
      if (!this.editable) {
        this.visible = true
      }
    },
    clear() {
      if (this.editable) {
        this.$refs.brandEdit.resetForm()
      } else {
        this.$refs.brandCreate.resetForm()
      }
    },
    saveDate  () {
      this.$refs.brandCreate.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.postBrand(res.data).then(res => {
          this.getAllBrands(this.params)
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
    updateData () {
      this.$refs.brandEdit.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.updateBrand({
          id: res.id,
          data: res.data
        }).then(res => {
          this.getAllBrands(this.params)
          this.hide()
          console.log(res)
        })
          .finally(() => {
            this.loading = false
          })
      })
    }
  },
}
</script>
<style>
.imagePreview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
