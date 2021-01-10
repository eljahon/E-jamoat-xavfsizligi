<template>
  <div>
    <h2>Lorem，Lorem</h2>
    <a-divider />
    <div class="multi-tab-test">
      <h4>Lorem</h4>
      <a-button @click="handleCloseCurrentTab" style="margin-right: 16px;">Lorem</a-button>
      <a-button @click="handleOpenTab" style="margin-right: 16px;">Lorem Lorem</a-button>
      <a-popconfirm :visible="visible" @confirm="confirm" @cancel="cancel" okText="Lorem" cancelText="Lorem">
        <template v-slot:title>
          <div>
            <a-form :form="form" layout="inline">
              <a-form-item label="Lorem">
                <a-input v-decorator="['tabName', {rules: [{required: true, message: 'Lorem Tab Lorem'}]}]"/>
              </a-form-item>
            </a-form>
          </div>
        </template>
        <a-button @click="() => visible = !visible" style="margin-right: 16px;">Lorem Tab Lorem</a-button>
      </a-popconfirm>

      <a-popconfirm :visible="visible2" @confirm="confirm2" @cancel="() => visible2 = false" okText="Lorem" cancelText="Lorem">
        <template v-slot:title>
          <div>
            <p>Lorem KEY Lorem <code>path</code> Lorem</p>
            <p>Lorem，Lorem Tab Lorem</p>
            <p>Lorem Tab Lorem，Lorem</p>
            <a-form :form="form2" layout="inline">
              <a-form-item label="LoremKEY">
                <a-input v-decorator="['tabKey', { initialValue: '/dashboard/workplace' }]" />
              </a-form-item>
              <a-form-item label="Lorem">
                <a-input v-decorator="['tabName', {rules: [{required: true, message: 'Lorem Tab Lorem'}]}]"/>
              </a-form-item>
            </a-form>
          </div>
        </template>
        <a-button @click="() => visible2 = !visible2">Lorem Tab Lorem</a-button>
      </a-popconfirm>
    </div>
    <a-divider />
    <div class="page-loading-test">
      <h4>Lorem</h4>
      <a-button @click="handleOpenLoading" style="margin-right: 16px;">Lorem(5s Lorem)</a-button>
      <a-button @click="handleOpenLoadingCustomTip">Lorem(Lorem)</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestWork',
  data () {
    return {
      visible: false,
      visible2: false
    }
  },
  created () {
    this.form = this.$form.createForm(this)
    this.form2 = this.$form.createForm(this)
  },
  methods: {
    handleCloseCurrentTab () {
      this.$multiTab.closeCurrentPage() // or this.$multiTab.close()
    },
    handleOpenTab () {
      this.$multiTab.open('/features/task')
    },

    handleOpenLoading () {
      this.$nextTick(function () {
        console.log('this', this)
        console.log('this.$refs.tInput', this.$refs.tInput)
      })
      this.$loading.show()
      setTimeout(() => {
        this.$loading.hide()
      }, 5000)
    },
    handleOpenLoadingCustomTip () {
      this.$loading.show({ tip: 'Lorem' })
      setTimeout(() => {
        this.$loading.hide()
      }, 5000)
    },

    // confirm
    confirm (e) {
      e.stopPropagation()
      const { path } = this.$route
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$multiTab.rename(path, values.tabName)
          this.visible = false
        }
      })
    },
    cancel () {
      this.visible = false
    },
    confirm2 (e) {
      e.stopPropagation()
      this.form2.validateFields((err, values) => {
        if (!err) {
          this.$multiTab.rename(values.tabKey, values.tabName)
          this.visible2 = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
