<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Phone" prop="phone">
          <a-input v-model="form.phone" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Second Phone" prop="second_phone">
          <a-input v-model="form.second_phone" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Supplier" prop="supplier_id">
          <a-select
            show-search
            option-filter-prop="children"
            style="width: 100%"
            v-model="form.supplier_id"
            :filter-option="filterOption"
          >
            <a-select-option v-for="item in allSuppliersList" :key="item.id" :value="item.id">
              {{ item.name_uz }} - {{ item.name_ru }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Location" prop="location_id">
          <a-select
            show-search
            option-filter-prop="children"
            style="width: 100%"
            v-model="form.location_id"
            :filter-option="filterOption"
          >
            <a-select-option v-for="item in allLocationList" :key="item.id" :value="item.id">
              {{ item.name_uz }} - {{ item.name_ru }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item label="Address UZ" prop="address_uz">
          <a-input v-model="form.address_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item label="Address RU" prop="address_ru">
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
export default {
  data () {
    const validatePhone = (rule, value, callback) => {
      if (/^[+][9][9][8]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('Phone Syntax Error'))
      }
    }
    const validatePhoneSecond = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else {
        if (/^[+][9][9][8]\d{9}$/.test(value)) {
          callback()
        } else {
          callback(new Error('Phone Syntax Error'))
        }
      }
    }
    return {
      id: null,
      location: [41.31110283875746, 69.28024783730488],
      form: {
        supplier_id: null,
        location_id: null,
        phone: '',
        second_phone: '',
        address_uz: '',
        address_ru: '',
        coordinates: {
          lat: 41.31110283875746,
          lng: 69.28024783730488
        }
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
            _form.coordinates = JSON.stringify(this.form.coordinates)
            _form.phone = this.form.phone.slice(1)
            _form.second_phone = this.form.second_phone === '' ? '' : this.form.phone.slice(1)
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
      this.form.coordinates.lat = coords[0]
      this.form.coordinates.lng = coords[1]
      console.log(coords)
    },
    markerDrag (e) {
      const coords = e.get('target').geometry._coordinates
      this.form.coordinates.lat = coords[0]
      this.form.coordinates.lng = coords[1]
    }
  },
  computed: {
    ...mapGetters(['allLocationList', 'allSuppliersList'])
  }
}
</script>
