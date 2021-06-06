<template>
  <a-card :title="$t('fill')">
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-row>
        <a-col :span="8" style="padding: 0 10px 0 0">
          <a-form-model-item :label="$t('name_uz')" prop="title_uz">
            <a-input v-model="form.title_uz" allow-clear/>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding: 0 10px">
          <a-form-model-item :label="$t('name_ru')" prop="title_ru">
            <a-input v-model="form.title_ru" allow-clear/>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding: 0 0 0 10px">
          <a-form-model-item :label="$t('order_no')" prop="order">
            <a-input type="number" v-model="form.order" allow-clear/>
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding: 0 10px 0 0">
          <a-form-model-item :label="$t('categories')" prop='category_id'>
            <a-select style="width: 100%" v-model="form.category_id" allow-clear>
              <a-select-option v-for="ct in parentCategoryList" :key="ct.id" :value="ct.id">
                {{ ct.name_ru }}
              </a-select-option>
            </a-select>
<!--            <a-tree-select-->
<!--              show-search-->
<!--              v-model='form.category_id'-->
<!--              :treeData='treeCategoryReBuild()'-->
<!--              treeNodeFilterProp='name_ru'-->
<!--              :filterTreeNode='filterTreeNode'-->
<!--              style='width: 100%'-->
<!--              :dropdown-style="{ maxHeight: '300px', maxWidth: '250px', overflow: 'auto' }"-->
<!--              :placeholder="$t('category')"-->
<!--              allow-clear-->
<!--            />-->
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding: 0 10px">
          <a-form-model-item :label="$t('widgets')" prop="widget_name">
            <a-select style="width: 100%" v-model="form.widget_name" allow-clear>
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
          <a-form-model-item :label="$t('home.category')" prop="home_category_id">
            <a-select style="width: 100%" v-model="form.home_category_id" allow-clear>
              <a-select-option v-for="ct in parentCategoryList" :key="ct.id" :value="ct.id">
                {{ ct.name_ru }}
              </a-select-option>
            </a-select>
<!--            <a-tree-select-->
<!--              show-search-->
<!--              v-model='form.home_category_id'-->
<!--              :treeData='treeCategoryReBuild()'-->
<!--              treeNodeFilterProp='name_ru'-->
<!--              :filterTreeNode='filterTreeNode'-->
<!--              style='width: 100%'-->
<!--              :dropdown-style="{ maxHeight: '300px', maxWidth: '250px', overflow: 'auto' }"-->
<!--              :placeholder="$t('category')"-->
<!--              allow-clear-->
<!--            />-->
          </a-form-model-item>
        </a-col>
        <a-col :span="8" style="padding: 0 10px">
          <a-row>
            <a-col :span="8">
              <a-form-model-item :label="$t('status')">
                <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="form.status" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item :label="$t('is_carousel')">
                <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="form.is_carousal" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8">
              <a-form-model-item :label="$t('is_main')">
                <a-switch :checked-children="$t('active')" :un-checked-children="$t('inactive')" v-model="form.is_main" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="8" style="padding: 0 0 0 10px">
          <a-form-model-item :label="$t('URL')" prop="url">
            <a-input v-model="form.url" allow-clear></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <ProductList v-if="form.type === 'products'" v-model="items" ref="products"/>
    <CategoryList v-if="form.type === 'categories'" v-model="items" ref="categories"/>
    <BrandsList v-if="form.type === 'brands'" v-model="items" ref="brands"/>
    <ArticleList v-if="form.type === 'news'" v-model="items" ref="news"/>
    <div style="margin-top: 20px; display: flex; justify-content: space-between">
      <div></div>
      <div>
        <a-button type="default">{{ $t('cancel') }}</a-button>
        <a-button @click="save" :loading="loading" style="margin-left: 10px" type="primary">{{ $route.params.id ? $t('update') : $t('save') }}</a-button>
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
      parentCategoryList: [],
      form: {
        title_uz: '',
        title_ru: '',
        widget_name: '',
        home_category_id: null,
        type: null,
        order: null,
        category_id: null,
        is_carousal: false,
        status: true,
        is_main: true,
        url: ''
      }
    }
  },
  watch: {
    items (val) {
      console.log(val)
    }
  },
  methods: {
    ...mapActions(['getHomeWidgetTypes', 'getParentListCategory', 'getListCategory', 'postHomeWidgets', 'getHomeWidgetById', 'updateHomeWidgets', 'getTreeCategory']),
    filterTreeNode(value, node) {
      const title = node.data.props.title
      // const result = title.toLowerCase().indexOf(value.toLowerCase()) > 0
      const result = title.toLowerCase().startsWith(value.toLowerCase())
      // console.log(title + ' <==> ' + value + ': ' + result);
      return result
    },
    treeDataMap (category) {
      return category.map(c => {
        // debugger
        if (c.children.length === 0) {
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
    save () {
      this.$refs.ruleForm.validate(valid => {
        if (valid && this.items.length > 1) {
          const _form = { ...this.form }
          _form.items = this.items
          _form.is_carousal = this.form.is_carousal ? 1 : 0
          _form.is_main = this.form.is_main ? 1 : 0
          _form.status = this.form.status ? 10 : 0
          _form.order = this.form.order ? parseInt(this.form.order) : null
          console.log(_form)
          this.loading = true
          if (this.$route.params.id) {
            this.updateHomeWidgets({
              id: this.$route.params.id,
              data: _form
            }).then(res => {
              this.$router.go(-1)
              this.$notification.success({
                message: 'Домашние виджет успешно обновлено'
              })
            }).finally(() => {
              this.loading = false
            })
          } else {
            this.postHomeWidgets(_form).then(res => {
              this.$router.go(-1)
              this.$notification.success({
                message: 'Домашние виджет успешно создано'
              })
            }).finally(() => {
              this.loading = false
            })
          }
          console.log(_form)
        } else if (this.items.length < 1) {
          this.$message.error('Элементы не выбраны')
        }
      })
    }
  },
  computed: {
    ...mapGetters(['homeWidgetTypes', 'treeCategory']),
    rules () {
      return {
        title_uz: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        title_ru: [{ required: true, message: this.$t('requiredField'), trigger: 'blur' }],
        home_category_id: [{ required: !this.form.is_main, message: this.$t('requiredField'), trigger: 'change' }],
        order: [{ required: true, message: this.$t('requiredField'), trigger: 'change' }],
        category_id: [{ required: true, message: this.$t('requiredField'), trigger: 'change' }],
        widget_name: [{ required: true, message: this.$t('requiredField'), trigger: 'change' }],
        type: [{ required: true, message: this.$t('requiredField'), trigger: 'change' }],
      }
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.getHomeWidgetById(this.$route.params.id).then(res => {
        console.log(res)
        const _data = res.data
        const _form = this.form
          _form.type = _data.type
          _form.title_uz = _data.title_uz
          _form.title_ru = _data.title_ru
          _form.widget_name = _data.widget_name
          _form.home_category_id = _data.home_category_id
          _form.order = _data.order
          _form.category_id = _data.category_id
          _form.is_carousal = _data.is_carousal
          _form.status = _data.status === 10
          _form.url = _data.url
          _form.is_main = _data.is_main
          this.items = _data.items
            setTimeout(() => {
              if (_data.type === 'products') this.$refs.products.rowSelection = _data.items
              if (_data.type === 'news') this.$refs.news.rowSelection = _data.items
              if (_data.type === 'categories') this.$refs.categories.rowSelection = _data.items
              if (_data.type === 'brands') this.$refs.brands.rowSelection = _data.items
              console.log(this.$refs.brands)
            }, 1000)
      })
    }
    this.getTreeCategory().then(res => {
      console.log(this.treeCategory)
    })
    this.getParentListCategory().then(res => {
      this.parentCategoryList = res
    })
    this.getHomeWidgetTypes()
  }
}
</script>

<style scoped>

</style>
