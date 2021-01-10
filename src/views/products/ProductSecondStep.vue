<template>
  <a-card size='small' title='Features Assign'>
      <a-row>
        <a-col :span="8" v-for='(item,i) in form.features' :key='i' style="padding-right: 10px">
          <a-form-model-item :label="$t('features')">
            <a-select v-model='item.feature_id' style="width: 100%">
              <a-select-option v-for='f in allFeatures' :key='f.id' :value="f.id">
                {{ f.name_uz }} {{ f.name_ru }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding-right: 10px">
        </a-col>
      </a-row>
  </a-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      form: {
        features: [
          {
            feature_id: null,
            values: []
          }
        ]
      },
      rules: {
        feature_id: [{ required: true, message: this.$t('required'), trigger: 'change' }],
      }
    }
  },
   methods: {
    ...mapActions(['getAllFeatures']),
     saveData () {
       console.log('dsfdsf')
     }
   },
  computed: {
    ...mapGetters(['allFeatures'])
  },
  mounted() {
    this.getAllFeatures({
      pagination: {
        current: 1
      }
    })
  }
}
</script>

<style scoped>

</style>
