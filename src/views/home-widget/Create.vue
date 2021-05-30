<template>
  <a-card :title="$t('fill')">
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-row>
        <a-col :span="8" style="padding: 0 10px 0 0">
          <a-form-model-item :label="$t('name_uz')" prop="title_uz">
            <a-input v-model="form.title_uz" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding: 0 10px">
          <a-form-model-item :label="$t('name_ru')" prop="title_ru">
            <a-input v-model="form.title_ru" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding: 0 0 0 10px">
          <a-form-model-item :label="$t('order_no')" prop="order">
            <a-input type="number" v-model="form.order" />
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding: 0 10px 0 0">
          <a-form-model-item :label="$t('categories')" prop='category_id'>
            <a-tree-select
              show-search
              v-model='form.category_id'
              :treeData='treeCategory'
              treeNodeFilterProp='name_ru'
              :filterTreeNode='filterTreeNode'
              style='width: 100%'
              :dropdown-style="{ maxHeight: '300px', maxWidth: '250px', overflow: 'auto' }"
              :placeholder="$t('category')"
              allow-clear
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding: 0 10px">
          <a-form-model-item :label="$t('widgets')" prop="widget_name">
            <a-select style="width: 100%" v-model="form.widget_name">
              <a-select-option v-for="wn in homeWidgetTypes.widget_names" :key="wn.value" :value="wn.value">
                {{ wn.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding: 0 0 0 10px">
          <a-form-model-item :label="$t('widgets.type')" prop="type">
            <a-select style="width: 100%" v-model="form.type">
              <a-select-option v-for="type in homeWidgetTypes.types" :key="type.value" :value="type.value">
                {{ type.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding: 0 10px 0 0">
          <a-row>
            <a-col :span="12">
              <a-form-model-item :label="$t('status')">
                <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="status" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item :label="$t('is_carousel')">
                <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="form.is_carousal" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="16" style="padding: 0 0 0 10px">
          <a-form-model-item :label="$t('URL')" prop="url">
            <a-input v-model="form.url"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <ProductList v-if="form.type === 'products'" v-model="items"/>
    <CategoryList v-if="form.type === 'categories'" v-model="items"/>
    <BrandsList v-if="form.type === 'brands'" v-model="items"/>
    <ArticleList v-if="form.type === 'news'" v-model="items"/>
    <div style="margin-top: 20px; display: flex; justify-content: space-between">
      <div></div>
      <div>
        <a-button type="default">{{ $t('cancel') }}</a-button>
        <a-button @click="save" :loading="loading" style="margin-left: 10px" type="primary">{{ $t('save') }}</a-button>
      </div>
    </div>
  </a-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { TreeSelect } from 'ant-design-vue'
import CategoryList from '@/views/category/CategoryList'
import BrandsList from '@/views/brands/BrandsList'
import ProductList from '@/views/products/List'
import ArticleList from '@/views/article/ArticleList'
export default {
  components: {
    'a-tree-select': TreeSelect,
    CategoryList,
    BrandsList,
    ProductList,
    ArticleList
  },
  data () {
    return {
      status: true,
      loading: false,
      items: [],
      form: {
        title_uz: '',
        title_ru: '',
        widget_name: '',
        type: '',
        order: null,
        category_id: null,
        is_carousal: false,
        status: 10,
        url: ''
      },
      rules: {
        title_uz: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        title_ru: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        order: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        category_id: [{ required: true, message: this.$t('requiredField'), trigger: 'change' }],
        widget_name: [{ required: true, message: this.$t('requiredField'), trigger: 'change' }],
        type: [{ required: true, message: this.$t('requiredField'), trigger: 'change' }],
      }
    }
  },
  watch: {
    status (val) {
      if (val) this.form.status = 10
      else this.form.status = 0
    },
    'form.type': function(val) {
      this.items = []
      console.log(val)
    },
    items (val) {
      console.log(val)
    }
  },
  methods: {
    ...mapActions(['getHomeWidgetTypes', 'getListCategory', 'postHomeWidgets']),
    filterTreeNode(value, node) {
      const title = node.data.props.title
      // const result = title.toLowerCase().indexOf(value.toLowerCase()) > 0
      const result = title.toLowerCase().startsWith(value.toLowerCase())
      // console.log(title + ' <==> ' + value + ': ' + result);
      return result
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
    save () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const _form = { ...this.form }
          _form.items = this.items
          _form.is_carousal = this.form.is_carousal ? 1 : 0
          this.postHomeWidgets(_form).then(res => {
            console.log(res)
          })
          console.log(_form)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['homeWidgetTypes', 'listCategory']),
    treeCategory() {
      return this.treeDataMap(this.listCategory)
    }
  },
  mounted() {
    this.getListCategory()
    this.getHomeWidgetTypes()
  }
}
</script>

<style scoped>

</style>
