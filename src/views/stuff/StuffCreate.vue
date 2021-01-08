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
    ...mapActions(['getAllStuffs', 'postStuffs', 'updateStuffs']),
    hide() {
      this.visible = false
      this.clear()
    },
    show(data) {
      if (this.editable) {
        console.log(data)
        console.log(this.$refs.itemEdit)
        setTimeout(() => {
          data.status === 10 ? this.$refs.itemEdit.status = true : this.$refs.itemEdit.status = false
          this.$refs.itemEdit.id = data.id
          this.$refs.itemEdit.form.email = data.email
          this.$refs.itemEdit.form.phone = '+' + data.phone
          this.$refs.itemEdit.form.status = data.status
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
        this.postStuffs(res.data).then(res => {
          this.getAllStuffs(this.params)
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
        this.updateUsers({
          id: res.id,
          data: res.data
        }).then(res => {
          this.getAllStuffs(this.params)
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
