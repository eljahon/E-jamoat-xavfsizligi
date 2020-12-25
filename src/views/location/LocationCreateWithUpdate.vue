<template>
  <a-modal width="700px" centered v-model="visible" @cancel="hide" :title="!editable ? $t('add_form') : $t('update_form')">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loading" @click="updateData">{{ $t('update') }}</a-button>
    </template>
    <!-- FORM -->
    <div tabindex="1" @keypress.enter="enter" style="outline: none">
      <FormModel v-if="!editable" ref="locationCreate"/>
      <FormModel v-if="editable" ref="locationEdit"/>
    </div>
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
    ...mapActions(['getAllLocations', 'postLocation', 'updateLocation']),
    hide() {
      this.visible = false
      this.clear()
    },
    enter () {
      if (!this.editable) this.saveDate()
      else this.updateData()
    },
    show(data) {
      if (this.editable) {
        console.log(data)
        console.log(this.$refs.locationEdit)
        setTimeout(() => {
          data.status === 10 ? this.$refs.locationEdit.status = true : this.$refs.locationEdit.status = false
          this.$refs.locationEdit.id = data.id
          this.$refs.locationEdit.form.name_uz = data.name_uz
          this.$refs.locationEdit.form.name_ru = data.name_ru
          this.$refs.locationEdit.form.parent_id = data.parent_id
          this.$refs.locationEdit.form.has_delivery = data.has_delivery
          this.$refs.locationEdit.form.status = data.status
        }, 10)
        this.visible = true
      }
      if (!this.editable) {
        this.visible = true
      }
    },
    clear() {
      if (this.editable) {
        this.$refs.locationEdit.resetForm()
      } else {
        this.$refs.locationCreate.resetForm()
      }
    },
    saveDate() {
      this.$refs.locationCreate.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.postLocation(res.data).then(res => {
          this.getAllLocations(this.params)
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
      this.$refs.locationEdit.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.updateLocation({
          id: res.id,
          data: res.data
        }).then(res => {
          this.getAllLocations(this.params)
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
