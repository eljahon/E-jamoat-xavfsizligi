<template>
  <a-card :title="$t('fill')">
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-row>
        <a-col :span="11">
          <a-form-model-item :label="$t('categories')" prop="category_id">
            <a-select style="width: 100%" v-model="form.category_id" allow-clear>
              <a-select-option v-for="category in listCategory" :key="category.id" :value="category.id">
                {{ category.name_uz }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="11" :offset="1">
          <a-form-model-item :label="$t('brands')" prop="brand_id">
            <a-select style="width: 100%" v-model="form.brand_id" allow-clear>
              <a-select-option v-for="brand in allBrands" :key="brand.id" :value="brand.id">
                {{ brand.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="11">
          <a-form-model-item :label="$t('key')" prop="key">
            <a-input v-model="form.key" allow-clear/>
          </a-form-model-item>
        </a-col>
        <a-col :span="11" :offset="1">
          <a-form-model-item :label="$t('order')" prop="order">
            <a-input type="number" style="width: 100%" allow-clear v-model="form.order"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-card :title="$t('images')">
        <a-button type="dashed" @click="$refs.filemanager.open()" slot="extra" style="margin-right: 10px">{{ $t('file.manager') }}</a-button>
        <a-button type="dashed" @click="addPhoto" slot="extra">{{ $t('add_photo') }}</a-button>
      </a-card>
      <draggable
        tag="a-row"
        v-bind="dragOptions"
        class="animated"
        :list="items"
        :move="checkMove"
      >
        <a-col class="animated" v-for="(item, i) in items" :key="i + 1"
               style="margin-top: 5px; margin-bottom: 5px; padding-left: 5px; padding-right: 5px" :span="8">
          <a-tooltip>
            <template slot="title">
              {{ $t('delete') }}
            </template>
            <div v-if="items.length > 1" @click="removePhoto(i)" class="remove-image">
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
      <a-card>
        <a-button style="margin-right: 10px" type="primary" ghost>{{ $t('clear') }}</a-button>
        <a-button type="primary" @click="saveDate" :loading="loading">{{ $route.params.id ? $t('update') : $t('save') }}</a-button>
      </a-card>
    </a-form-model>

<!--    FILEMANAGER-->

    <filemanager ref="filemanager"/>

<!--    FILEMANAGER-->


  </a-card>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import draggable from 'vuedraggable'
import fileManager from '@/views/filemanager/index'
export default {
  components: {
    draggable,
    'filemanager': fileManager
  },
  data() {
    return {
      loading: false,
      items: [
        {
          loading: false,
          url: null,
          image: '',
          status: true,
        }
      ],
      form: {
        category_id: '',
        brand_id: '',
        key: '',
        order: null,
        items: []
      },
      rules: {
        category_id: [{required: false, message: this.$t('requiredField'), trigger: 'blur'}],
        brand_id: [{required: false, message: this.$t('requiredField'), trigger: 'blur'}],
        key: [{required: true, message: this.$t('requiredField'), trigger: 'blur'}],
        order: [{required: true, message: this.$t('requiredField'), trigger: 'blur'}]
      }
    }
  },
  watch: {
    newArray(val) {
      console.log(val)
    },
    items(val) {
      console.log(val)
    }
  },
  methods: {
    ...mapActions(['getListCategory', 'getAllBrands', 'postWidgets', 'getWidgetById', 'updateWidgets', 'updateWidgets']),
    checkMove(e) {
      console.log(e)
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    uploadImage(e, i) {
      console.log(e)
      this.items[i].url = null
      this.items[i].loading = true
      this.$imageUp(e).then(res => {
        this.items[i].image = res.image
        this.items[i].url = res.image_url
      })
        .finally(() => {
          this.items[i].loading = false
        })
    },
    beforeUpload(file) {
      return this.$beforeUpImage(file)
    },
    addPhoto() {
      this.items.push(
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
      this.items.splice(i, 1)
    },
    saveDate() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.form.items = this.items.map((e, i) => {
            return {
              image: e.image,
              status: e.status ? 1 : 0,
              order: i + 1
            }
          })
          console.log(this.form)
          this.loading = true
          if (!this.$route.params.id) {
            this.postWidgets(this.form).then(res => {
              this.$router.push({ name: 'WidgetList' })
              console.log(res)
            })
              .finally(() => {
                this.loading = false
              })
          } else {
            this.loading = true
            this.updateWidgets({
              id: this.$route.params.id,
              data: this.form
            }).then(res => {
              this.$router.push({ name: 'WidgetList' })
              console.log(res)
            })
              .finally(() => {
                this.loading = false
              })
          }
        }
      })
    }
  },
  computed: {
    ...mapGetters(['listCategory', 'allBrands', 'progress', 'onUpload']),
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
    this.getAllBrands()
    this.getListCategory()
    if (this.$route.params.id) {
      this.getWidgetById(this.$route.params.id).then(res => {
        const _data = res.data
        const form = this.form
          form.category_id = _data.category_id
          form.brand_id = _data.brand_id
          form.key = _data.key
          form.order = _data.order
          this.items = _data.items.map(e => {
            return {
              loading: false,
              url: 'http://163.172.182.95:2500/storage/' + e.image,
              image: e.image,
              status: e.status === 1
            }
          })
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less">
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
