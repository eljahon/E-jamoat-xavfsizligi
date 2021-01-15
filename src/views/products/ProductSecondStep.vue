<template>
  <a-card size='small' title='Features Assign'>
    <a-card style='margin-bottom: 10px; margin-top: 10px;' :title="$t('features') + ' ' + (f +1)" size='small'
            v-for='(ft, f) in features' :key='f'>
      <div slot='extra' :span='24' style='width: 300px; display: flex'>
        <a-select :style="features.length > 1 ? 'width: 85%' : 'width: 100%'" :placeholder="$t('features')"
                  @change='changeFt($event, f)'>
          <a-select-option v-for='(cf, i) in mainFeatures' :key="'cf' + i" :value='cf.id'>
            {{ cf.name_ru }} - {{ cf.name_uz }}
          </a-select-option>
        </a-select>
        <a-button v-if='features.length > 1' style='margin-left: 10px' ghost type='danger' icon='delete' />
      </div>
      <a-row
        v-if="ft.feature_id && (ft.feature.type === 'dropdown' || ft.feature.type === 'radio' || ft.feature.type === 'checkbox')">
        <a-col v-for='(val, v) in ft.values' :key='v + val.id' :span='7' style='padding-left: 10px'>
          <a-form-model-item :label="$t('value')">
            <a-select style='width: 100%' v-model='val.id'>
              <a-icon v-if='features[f].values.length > 1' slot='suffixIcon' type='delete'
                      style='font-size: 15px; color: red' @click='removeValue(f,v)' />
              <a-select-option v-for='vl in ft.feature.values' :key='vl.id' :value='vl.id'>
                {{ vl.value_uz }} - {{ vl.value_ru }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span='2' style='padding-left: 10px'>
          <a-form-model-item label=' '>
            <a-button type='primary' icon='plus' @click='addValue(f)' />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row
        v-if="ft.feature_id && !(ft.feature.type === 'dropdown' || ft.feature.type === 'radio' || ft.feature.type === 'checkbox')">
        <a-col :span='24'>
          <a-form-model-item :label="$t('value')">
            <a-input v-if="ft.feature.type === 'text'" v-model='ft.values[0].value'></a-input>
            <a-input v-if="ft.feature.type === 'number'" v-model='ft.values[0].value'></a-input>
            <a-input v-if="ft.feature.type === 'textarea'" type='textarea' v-model='ft.values[0].value'></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-card>
    <a-button slot='extra' style='margin-top: 10px' type='primary' @click='addFeatures'>
      Add Features
    </a-button>
    <a-card title='Images'>
      <a-button type='primary' slot='extra' @click='addPhoto'>{{ $t('add_photo') }}</a-button>
    </a-card>
    <draggable
      tag="a-row"
      v-bind="dragOptions"
      class="animated"
      :list="images"
    >
      <a-col class="animated" v-for="(item, i) in images" :key="i + 1"
             style="margin-top: 5px; margin-bottom: 5px; padding-left: 5px; padding-right: 5px" :span="8">
        <a-tooltip>
          <template slot="title">
            {{ $t('delete') }}
          </template>
          <div v-if="images.length > 1" @click="removePhoto(i)" class="remove-image">
            <a-icon type="delete" class="icon"/>
          </div>
        </a-tooltip>
        <a-checkbox class="status" v-model="item.status">Active</a-checkbox>
        <a-form-model-item :label="$t('image') + ' ' + (i +1)" prop="image">
          <a-upload
            list-type="picture-card"
            :custom-request="(e) => { uploadImage(e, i) }"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
          >
            <div v-if="item.url" class="upload-image">
              <img :src="item.url" alt="avatar"/>
            </div>
            <div class="upload-empty" v-else>
              <a-icon v-if="!(item.loading && onUpload)" type="upload" style="font-size: 48px"/>
              <a-progress v-if="item.loading && onUpload" :percent="progress"/>
              <div v-if="!(item.loading && onUpload)" class="ant-upload-text">
                {{ $t('upload_photo') }}
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
      </a-col>
    </draggable>
    <a-divider/>
    <div>
      <a-form-model-item label="SKU">
        <a-input v-model='sku'></a-input>
      </a-form-model-item>
    </div>
    <a-row>
      <a-button type='primary' @click='saveProduct' :loading='loading'>
        {{ $t('save') }}
      </a-button>
      <a-button style='margin-left: 10px' @click='$refs.ruleForm.resetFields()' type='primary' ghost>
        {{ $t('clear') }}
      </a-button>
    </a-row>
    </a-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data() {
    return {
      loading: false,
      features: [
        {
          feature: null,
          feature_id: null,
          values: [{
            id: null,
            value: null
          }]
        }
      ],
      images: [
        {
          loading: false,
          url: null,
          image: '',
          status: true
        }
      ],
      sku: ''
    }
  },
  methods: {
    ...mapActions(['getMainFeatures']),
    // saveData() {
    //   console.log('dsfdsf')
    // },
    addFeatures() {
      if (this.mainFeatures.length > 1) {
        if (this.mainFeatures.length > this.features.length) {
          this.features.push({
            feature: null,
            feature_id: null,
            values: [{
              id: null,
              value: null
            }]
          })
        }
      }
    },
    changeFt(val, f) {
      this.features[f].feature_id = val
      for (let i = 0; i < this.mainFeatures.length; i++) {
        if (this.mainFeatures[i].id === val) {
          this.features[f].feature = this.mainFeatures[i]
        }
      }
    },
    removeValue(f, v) {
      this.features[f].values.splice(v, 1)
    },
    addValue(i) {
      if (this.features[i].feature) {
        if (this.features[i].feature.values.length - 1 >= this.features[i].values.length) {
          this.features[i].values.push({
            id: null,
            value: null
          })
        }
      }
    },
    uploadImage(e, i) {
      console.log(e)
      this.images[i].url = null
      this.images[i].loading = true
      this.$imageUp(e).then(res => {
        console.log(res)
        this.images[i].image = res.image
        this.images[i].url = res.image_url
      })
        .finally(() => {
          this.images[i].loading = false
        })
    },
    beforeUpload(file) {
      return this.$beforeUpImage(file)
    },
    addPhoto() {
      this.images.push(
        {
          loading: false,
          url: null,
          image: '',
          status: true,
          order: null
        }
      )
    },
    removePhoto(i) {
      this.images.splice(i, 1)
    },
    saveProduct () {
      let _form = {}
      let f = []
      const _features = { ...this.features }
      for (let i = 0; i < _features.length; i++) {
        for (let j = 0; j < _features[i].values.length; j++) {
          f.push({
            feature_id: _features[i].feature_id,
            value_id: _features[i].values[j].id
          })
        }
      }
      _form.features = f
      _form.attachments = this.images.map(e => {
        return e.image
      })
      _form.sku = this.sku
      console.log(_form)
    }
  },
  computed: {
    ...mapGetters(['mainFeatures', 'onUpload', 'progress']),
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      };
    }
  },
  mounted() {
    this.getMainFeatures(parseInt(this.$route.query.productGroupId))
  }
}
</script>

<style lang='less'>
.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.remove-image {
  position: absolute;
  z-index: 5;
  top: 4%;
  right: 2%;
  cursor: pointer;

  .icon {
    font-size: 18px;
    color: #484747;
    transition: all, .5s;

    :hover {
      color: #D72323;
    }
  }
}

.status {
  position: absolute;
  z-index: 5;
  top: 4%;
  right: 10%;
  cursor: pointer;
}

.upload-image {
  //height: 160px;
  height: 180px;
  width: 100%;
  object-fit: contain;

  img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.upload-empty {
  height: 180px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}

.avatar-uploader > .ant-upload.ant-upload-select-picture-card {
  width: 100%;
  height: 180px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.add-upload {
  padding: 10px;
  text-align: center;
  width: 100px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D72323;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  transition: all, .4s;
  cursor: pointer;
}

.add-upload:hover {
  color: #999;
  background-color: white;
  border: 1px dashed #D72323;
}

.ant-upload {
  padding: 0;
}
</style>
