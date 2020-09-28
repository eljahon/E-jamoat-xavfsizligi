<template>
  <a-modal width="700px" centered v-model="visible" @cancel="hide" :title="!editable ? 'Add Measure' : 'Edit Measure'">
    <template slot="footer">
      <a-button key="back" @click="hide">{{ $t('cancel') }}</a-button>
      <a-button html-type="submit" v-if="!editable" type="primary" :loading="loading" @click="saveDate">{{ $t('add') }}</a-button>
      <a-button html-type="submit" v-if="editable" type="primary" :loading="loading" @click="updateData">{{ $t('update') }}</a-button>
    </template>
    <!-- FORM -->
    <FormModel v-if="!editable" ref="measureCreate"/>
    <FormModel v-if="editable" ref="measureEdit"/>
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
    ...mapActions(['getAllMeasures', 'postMeasure', 'updateMeasure']),
    hide() {
      this.visible = false
      this.clear()
    },
    show(data) {
      if (this.editable) {
        console.log(data)
        console.log(this.$refs.measureEdit)
        setTimeout(() => {
          this.$refs.measureEdit.id = data.id
          this.$refs.measureEdit.form.name_uz = data.name_uz
          this.$refs.measureEdit.form.name_ru = data.name_ru
          this.$refs.measureEdit.form.symbol = data.symbol
          this.$refs.measureEdit.form.status = data.status
        }, 10)
        this.visible = true
      }
      if (!this.editable) {
        this.visible = true
      }
    },
    clear() {
      if (this.editable) {
        this.$refs.measureEdit.resetForm()
      } else {
        this.$refs.measureCreate.resetForm()
      }
    },
    saveDate() {
      this.$refs.measureCreate.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.postMeasure(res.data).then(res => {
          this.getAllMeasures(this.params)
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
      this.$refs.measureEdit.validateForm().then(res => {
        console.log(res)
        this.loading = true
        this.updateMeasure({
          id: res.id,
          data: res.data
        }).then(res => {
          this.getAllMeasures(this.params)
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
