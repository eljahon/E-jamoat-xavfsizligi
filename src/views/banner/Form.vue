<template>
  <a-form-model ref="ruleForm" :model="form" :rules="rules">
    <a-row>
      <a-col :span="11">
        <a-form-model-item :label="$t('category')" prop="category_id">
          <a-tree-select
            show-search
            v-model='form.category_id'
            :treeData='treeCategoryReBuild()'
            treeNodeFilterProp='name_ru'
            :filterTreeNode='filterTreeNode'
            style='width: 100%'
            :dropdown-style="{ maxHeight: '300px', overflow: 'auto' }"
            :placeholder="$t('category')"
            allow-clear
          />
        </a-form-model-item>
      </a-col>
      <a-col :span="11" :offset="1">
        <a-col :span="11">
          <a-form-model-item :label="$t('is_main')">
            <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="form.is_main" />
          </a-form-model-item>
        </a-col>
        <a-col :span="11" :offset="1">
          <a-form-model-item :label="$t('status')">
            <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="status" />
          </a-form-model-item>
        </a-col>
      </a-col>
      <a-col :span="24">
        <a-form-model-item label="URL" prop="url">
          <a-input v-model='form.url' allow-clear/>
        </a-form-model-item>
      </a-col>
      <a-col :span="24">
          <p class="width">Мин. Ширина: {{ form.is_main ? (size.main.w + 'px') : (size.nomain.w + 'px') }}</p>
          <p class="height">Мин. Высота: {{ form.is_main ? (size.main.h + 'px') : (size.nomain.h + 'px') }}</p>
        <a-form-model-item :label="$t('image')" prop="image">
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
              <a-icon v-if="!(loadingImage && onUpload)" type="upload" style="position: absolute; font-size: 48px" />
              <a-progress v-if="loadingImage && onUpload" :percent="progress" />
<!--              <div v-if="!(loadingImage && onUpload)" class="ant-upload-text">-->
<!--                {{ $t('upload_photo') }}-->
<!--              </div>-->
            </div>
          </a-upload>
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>
<script>
import { TreeSelect } from 'ant-design-vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    'a-tree-select': TreeSelect
  },
  data () {
    return {
      id: null,
      imageUrl: null,
      loadingImage: false,
      size: {
        main: {
          w: 1440,
          h: 320
        },
        nomain: {
          w: 1070,
          h: 240
        }
      },
      status: true,
      form: {
        category_id: null,
        url: '',
        file: null,
        is_main: false,
        status: 10
      },
      rules: {
        name: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        status: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        category_id: [{ required: true, message: this.$t('requiredField'), trigger: 'change' }],
        url: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
      }
    }
  },
  watch: {
    status (val) {
      if (val) this.form.status = 10
      else this.form.status = 0
    }
  },
  computed: {
    ...mapGetters(['progress', 'onUpload', 'treeCategory'])
  },
  methods: {
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          const _data = new FormData()
          if (this.form.file) {
            _data.append('file', this.form.file)
          }
          if (this.id) {
            _data.append('_method', 'put')
          }
          _data.append('category_id', this.form.category_id)
          _data.append('url', this.form.url)
          _data.append('is_main', this.form.is_main ? 1 : 0)
          _data.append('status', this.form.status)
          if (valid) {
            resolve({
              id: this.id ? this.id : undefined,
              data: _data
            })
          } else reject(valid)
        })
      })
    },
    resetForm () {
      this.imageUrl = null
      this.loadingImage = false
      this.form.logo = ''
      this.$refs.ruleForm.resetFields();
    },
    treeDataMap (category) {
      return category.map((c) => {
        if (!c.children) {
          return {
            title: c.name_uz + ' - ' + c.name_ru,
            value: c.id,
            key: c.name_ru + c.id + Math.random()
          }
        } else {
          return {
            title: c.name_uz + ' - ' + c.name_ru,
            value: c.id,
            key: c.name_ru + c.id + Math.random(),
            children: this.treeDataMap(c.children)
          }
        }
      })
    },
    treeCategoryReBuild() {
      return this.treeDataMap(this.treeCategory)
    },
    filterTreeNode(value, node) {
      const title = node.data.props.title
      // const result = title.toLowerCase().indexOf(value.toLowerCase()) > 0
      const result = title.toLowerCase().startsWith(value.toLowerCase())
      // console.log(title + ' <==> ' + value + ': ' + result);
      return result
    },
    uploadImage(e) {
      console.log(e)
      this.form.file = e.file
      this.imageUrl = null
      this.loadingImage = true
      this.$imageUp(e).then(res => {
        this.form.logo = res.image
        this.imageUrl = res.image_url
      })
        .finally(() => {
          this.loadingImage = false
        })
    },
    beforeUpload(file) {
      return this.$beforeUpImage(file)
    }
  }
}
</script>
<style lang="less">
.width {
  left: 50%;
  transform: translate(-50%, 50%);
  position: absolute;
}
.height {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  top: 80px;
  transform: translateX(-100%);
  position: absolute;
}
</style>
