<template>
  <div>
    <a-card v-if="!loadData">
      <a-row>
        <a-form-model ref="ruleForm" :model="data" :rules="rules">
          <a-col :span="8" style="padding-right: 10px">
            <a-card style="text-align: center" :title="$t('head_setting')">
              <label for="avatar">
                <a-avatar v-if="image_url" style="cursor:pointer;" :src="image_url" :size="128" icon="user" />
                <a-avatar v-else style="cursor:pointer;" :size="128" icon="user" />
              </label>
              <input @change="setAvatar" style="display: none" type="file" id="avatar" name="avatar" accept="image/png, image/jpeg">
              <a-form-model-item :label="$t('company_name')" prop="company_name">
                <a-input :placeholder="$t('company_name')" v-model="data.company_name"/>
              </a-form-model-item>
              <a-form-model-item style="transform: translateY(-20px)" :label="$t('phone')" prop="phone">
                <a-input placeholder="+998 XX XXX XX XX" v-model="data.phone"/>
              </a-form-model-item>
              <a-form-model-item style="transform: translateY(-30px)" :label="$t('email')" prop="email">
                <a-input placeholder="example@zaytun.uz" v-model="data.email"/>
              </a-form-model-item>
            </a-card>
          </a-col>
          <a-col :span="16" style="padding-left: 10px">
            <a-card :title="$t('basic_setting')">
                <a-row>
                  <a-col :span="12" style="padding-right: 10px">
                    <a-form-model-item :label="$t('title_uz')" prop="title_uz">
                      <a-input v-model="data.title_uz"/>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="12" style="padding-left: 10px">
                    <a-form-model-item :label="$t('title_ru')" prop="title_ru">
                      <a-input v-model="data.title_ru"/>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="12" style="padding-right: 10px">
                    <a-form-model-item :label="$t('android_app_url')" prop="android_app_url">
                      <a-input v-model="data.android_app_url"/>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="12" style="padding-left: 10px">
                    <a-form-model-item :label="$t('ios_app_url')" prop="ios_app_url">
                      <a-input v-model="data.ios_app_url"/>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="12" style="padding-right: 10px">
                    <a-form-model-item :label="$t('usd_course')" prop="usd_course">
                      <a-input v-model="data.usd_course"/>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="12" style="padding-left: 10px">
                    <a-form-model-item :label="$t('address')" prop="address">
                      <a-input v-model="data.address"/>
                    </a-form-model-item>
                  </a-col>
                  <a-col style="padding-right: 10px" :span="12">
                    <a-form-model-item :label="$t('description_uz')" prop="description_uz">
                      <a-input v-model="data.description_uz" type="textarea"/>
                    </a-form-model-item>
                  </a-col>
                  <a-col style="padding-left: 10px" :span="12">
                    <a-form-model-item :label="$t('description_ru')" prop="description_ru">
                      <a-input v-model="data.description_ru" type="textarea"/>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="24">
                    <yandex-map
                      :coords="coords"
                      :zoom="12"
                      :controls="['zoomControl']"
                      searchControlProvider="yandex#search"
                      style="width: 100%; height: 300px; margin: 10px 0"
                      @click="onClick"
                    >
                      <ymap-marker
                        :coords="coords"
                        marker-id="123"
                        hint-content="some hint"
                      />
                    </yandex-map>
                  </a-col>
                  <a-button @click="saveData" :loading="loading" type="primary">{{ $t('update') }}</a-button>
                </a-row>
            </a-card>
          </a-col>
        </a-form-model>
      </a-row>
    </a-card>
    <a-card v-if="loadData" >
      <a-row>
        <a-col :span="8" style="padding-right: 10px">
          <a-card>
            <a-skeleton active />
            <a-skeleton active />
          </a-card>
        </a-col>
        <a-col :span="16" style="padding-left: 10px">
          <a-card>
            <a-skeleton active />
            <a-skeleton active />
            <a-skeleton active />
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loadData: false,
      image_url: null,
      loading: false,
      coords: [
        41.19678115964264,
        69.2421970972192
      ],
      data: {
        phone: '',
        email: '',
        company_name: '',
        address: '',
        coordinates: null,
        title_ru: '',
        title_uz: '',
        description_ru: '',
        description_uz: '',
        logo: '',
        favicon: '',
        usd_course: '',
        android_app_url: '',
        ios_app_url: '',
      },
      rules: {
        phone: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }, { validator: this.validatePhone, trigger: 'change' }],
        email: [{ required: false, message: this.$t('requiredField'), trigger: 'blur' }, { validator: this.validateEmail, trigger: 'change' }],
        company_name: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        address: [{ required: false, message: this.$t('requiredField'), trigger: 'blur' }],
        title_ru: [{ required: false, message: this.$t('requiredField'), trigger: 'blur' }],
        title_uz: [{ required: false, message: this.$t('requiredField'), trigger: 'blur' }],
        description_ru: [{ required: false, message: this.$t('requiredField'), trigger: 'blur' }],
        description_uz: [{ required: false, message: this.$t('requiredField'), trigger: 'blur' }],
        logo: [{ required: false, message: this.$t('requiredField'), trigger: 'blur' }],
        favicon: [{ required: false, message: this.$t('requiredField'), trigger: 'blur' }],
        usd_course: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        android_app_url: [{ required: false, message: this.$t('requiredField'), trigger: 'blur' }],
        ios_app_url: [{ required: false, message: this.$t('requiredField'), trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions([]),
    validatePhone (rule, value, callback) {
      if (/^[+][9][9][8]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error(this.$t('incorrectPhone')))
      }
    },
    validateEmail (rule, value, callback) {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (value) {
        if (regex.test(value)) {
          callback()
        } else {
          callback(new Error(this.$t('incorrectEmail')))
        }
      } else callback()
    },
    onClick (e) {
      console.log(this.coords)
      this.coords = e.get('coords')
    },
    addPhone () {
      this.data.phones.push({ phone: '' })
    },
    removePhone (i) {
      this.data.phones.splice(i, 1)
    },
    phoneActions (i) {
      if (this.data.phones.length > 1) this.removePhone(i)
      else this.addPhone()
    },
    setData (data) {
      this.image_url = data.logo
      const _form = this.data
      _form.phones = data.phone.map(e => {
        return { phone: e }
      })
      _form.description = data.description
      _form.is_active = data.is_active
      _form.call_center_tg = data.call_center_tg
      _form.work_hour_end = data.work_hour_end
      _form.work_hour_start = data.work_hour_start
      _form.logo = data.logo
      _form.name = data.name
    },
    setAvatar (e) {
      this.$imageUp({
        file: e.target.files[0]
      }).then(res => {
        this.data.logo = res.image
        this.image_url = res.image_url
      })
      // const image = e.target.files[0]
      // const file = new FormData()
      // file.append('file', e.target.files[0])
      // this.upload(file).then(res => {
      //   this.image_url = URL.createObjectURL(image)
      //   this.data.logo = res.filename
      // })
      // console.log(e.target.files[0])
    },
    saveData () {
      // this.loading = true
      this.$refs.ruleForm.validate()
    }
  },
  mounted () {
    this.loadData = true
    setTimeout(() => {
      this.loadData = false
    }, 3000)
    // this.getShipper().then(res => {
    //   this.setData(res)
    //   this.loadData = false
    //   console.log(res)
    // })
  }
}
</script>

<style lang="less" scoped>
.avatar{
  width: 128px;
  height: 128px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0,0,0, .5);
}
</style>
