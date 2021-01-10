<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('phone')" prop="phone">
          <a-input addon-before="+998" v-mask="'## ### ## ##'" v-model="form.phone" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('second_phone')" prop="second_phone">
          <a-input addon-before="+998" v-mask="'## ### ## ##'" v-model="form.second_phone" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11">
        <a-form-model-item :label="$t('location')" prop="location_id">
          <a-tree-select
            show-search
            v-model="form.location_id"
            :treeData="treeData"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="Please select"
            allow-clear
          />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('address') + ' UZ'" prop="address_uz">
          <a-input v-model="form.address_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11">
        <a-form-model-item :label="$t('address') + ' RU'" prop="address_ru">
          <a-input v-model="form.address_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <yandex-map
      :coords="location"
      :zoom="15"
      style="height:200px; width: 100%"
      :controls="['zoomControl']"
      searchControlProvider="yandex#search"
      @click="mapClick"
    >
      <ymap-marker
        :coords="location"
        :options="{
          draggable: true
        }"
        marker-id="123"
        @dragend="markerDrag"
        hint-content="some hint"
      />
    </yandex-map>
  </a-form-model>
</template>
<script>
import { mapGetters } from 'vuex'
import { TreeSelect } from 'ant-design-vue'
function treeDataMap (category) {
  return category.map((c) => {
    if (!c.children) {
      return {
        title: c.name_uz + ' - ' + c.name_ru,
        value: c.id
      }
    } else {
      return {
        title: c.name_uz + ' - ' + c.name_ru,
        value: c.id,
        children: treeDataMap(c.children)
      }
    }
  })
}
export default {
  components: {
    'a-tree-select': TreeSelect
  },
  data () {
    const validatePhone = (rule, value, callback) => {
      if (/^\d{9}$/.test(value.replaceAll(' ', ''))) {
        callback()
      } else {
        callback(new Error('Phone Error'))
      }
    }
    const validatePhoneSecond = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else {
        if (/^\d{9}$/.test(value.replaceAll(' ', ''))) {
          callback()
        } else {
          callback(new Error('Phone Error'))
        }
      }
    }
    return {
      id: null,
      location: [41.31110283875746, 69.28024783730488],
      form: {
        supplier_id: this.$route.params.id,
        location_id: null,
        phone: '',
        second_phone: '',
        address_uz: '',
        address_ru: '',
        coordinates: {}
      },
      rules: {
        address_uz: [{ required: false, message: 'Address uz Required', trigger: 'blur' }],
        address_ru: [{ required: false, message: 'Address ru Required', trigger: 'blur' }],
        phone: [{ required: true, message: 'Phone Required', trigger: 'change' },
          { validator: validatePhone, trigger: 'change' }],
        second_phone: [ { validator: validatePhoneSecond, trigger: 'change' } ],
        supplier_id: [{ required: true, message: 'Supplier Required', trigger: 'change' }],
        location_id: [{ required: true, message: 'Location Required', trigger: 'change' }]
      }
    }
  },
  methods: {
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let _form = { ...this.form }
            _form.coordinates = JSON.stringify({
              lat: this.location[0],
              lng: this.location[1]
            })
            _form.phone = '998' + this.form.phone.replaceAll(' ', '')
            _form.second_phone = this.form.second_phone === '' ? '' : '998' + this.form.phone.replaceAll(' ', '')
            resolve({
              id: this.id ? this.id : undefined,
              data: _form
            })
          } else reject(valid)
        })
      })
    },
    resetForm () {
      this.form.email = ''
      this.location = [41.31110283875746, 69.28024783730488]
      this.$refs.ruleForm.resetFields();
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    mapClick (e) {
      const coords = e.get('coords')
      this.location = coords
      console.log(coords)
    },
    markerDrag (e) {
      const coords = e.get('target').geometry._coordinates
      this.location = coords
    }
  },
  computed: {
    ...mapGetters(['allLocationList', 'allSuppliersList', 'treeLocation']),
    treeData () {
      return treeDataMap(this.treeLocation)
    }
  }
}
</script>
