<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('name_uz')" prop="name_uz">
          <a-input v-model="form.name_uz" />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('name_ru')" prop="name_ru">
          <a-input v-model="form.name_ru" />
        </a-form-model-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('category')" prop="parent_id">
          <a-tree-select
            show-search
            v-model="form.parent_id"
            :treeData="treeData"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="Please select"
            allow-clear
          />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-row>
          <a-col :span="14">
            <a-form-model-item :label="$t('status')">
              <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="status" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6" :offset="2">
            <a-form-model-item :label="$t('popular')">
              <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="form.is_popular" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="11">
        <a-col :span="24">
          <a-form-model-item :label="$t('keyword')">
            <a-input v-model="form.keyword" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item :label="$t('description')">
            <a-input type="textarea" v-model="form.description" />
          </a-form-model-item>
        </a-col>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-form-model-item :label="$t('image')">
          <a-upload
            :custom-request="uploadImage"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
          >
            <div v-if="imageUrl" class="upload-image">
              <img :src="imageUrl" alt="avatar" />
            </div>
            <div class="upload-empty" v-else>
              <a-icon v-if="!(loadingImage && onUpload)" type="upload" style="font-size: 48px" />
              <a-progress v-if="loadingImage && onUpload" :percent="progress" />
              <div v-if="!(loadingImage && onUpload)" class="ant-upload-text">
                {{ $t('upload_photo') }}
              </div>
            </div>
          </a-upload>
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
import { mapGetters } from 'vuex'
import { TreeSelect } from 'ant-design-vue'

function treeDataMap (category) {
  return category.map((c) => {
      if (!c.children) {
        return {
          title: c.name_uz + ' ' + c.name_ru,
          value: c.id
        }
      } else {
        return {
          title: c.name_uz + ' ' + c.name_ru,
          value: c.id,
          children: treeDataMap(c.children)
        }
      }
    })
}
export default {
  props: {
    edit: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  components: {
    'a-tree-select': TreeSelect
  },
  watch: {
    status (val) {
      if (val) this.form.status = 10
      else this.form.status = 0
    }
  },
  data () {
    return {
      status: true,
      imageUrl: null,
      allData: null,
      loadingImage: false,
      form: {
        name_ru: '',
        name_uz: '',
        parent_id: null,
        is_popular: true,
        description: '',
        image: null,
        keyword: '',
        status: 10
      },
      item: null,
      rules: {
        name_ru: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        name_uz: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        // image: [{ validator: validateImage, trigger: 'change' }]
      }
    }
  },
  methods: {
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            resolve({
              id: this.edit ? this.item.id : undefined,
              data: this.form
            })
          } else reject(valid)
        })
      })
    },
    resetForm () {
      this.imageUrl = null
      this.loadingImage = false
      this.$refs.ruleForm.resetFields();
    },
    uploadImage(e) {
      console.log(e)
      this.imageUrl = null
      this.loadingImage = true
      this.$imageUp(e).then(res => {
        this.form.image = res.image
        this.imageUrl = res.image_url
      })
        .finally(() => {
          this.loadingImage = false
        })
    },
    beforeUpload(file) {
      return this.$beforeUpImage(file)
    }
},
  computed: {
    ...mapGetters(['progress', 'onUpload', 'treeCategory']),
    treeData () {
      return treeDataMap(this.treeCategory)
    }
  }
}
</script>
<style lang="less">

</style>
