<template>
  <a-card title='Role Create'>
    <a-button slot='extra' type='primary'>{{ $t('save') }}</a-button>
      <a-form-model-item style='margin: 0 12px' label='Role name'>
        <a-input style='width: 100%;'></a-input>
      </a-form-model-item>
    <a-checkbox-group style='margin-top: 30px' @change='onChange'>
      <div style='display: flex; flex-wrap: wrap; flex: 1'>
        <a-card v-for='(per, i) in allPermissions' :key='per.name + i' :title='per.name'
                style='width: 270px; margin: 10px 12px'
        >
          <a-row v-for='(item, j) in per.items' :key='item.name + j'>
            <a-col :span='24'>
              <a-checkbox :value='item.name'>{{ item.name }}</a-checkbox>
            </a-col>
          </a-row>
        </a-card>
      </div>
    </a-checkbox-group>
  </a-card>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions(['getAllPermissions']),
    onChange(checkedValues) {
      console.log('checked = ', checkedValues)
    },
    style(index) {
      if (index % 4 === 0) return 'margin-right: 10px; width: 270px'
      if (index % 4 === 3) return 'margin-left: 10px; width: 270px'
    }
  },
  computed: {
    ...mapGetters(['allPermissions'])
  },
  mounted() {
    this.getAllPermissions()
    console.log(this.allPermissions)
  }
}
</script>
<style>
.ml_10 {
  margin-left: 10px;
  border: 1px solid red;
}

.mr_10 {
  margin-right: 10px;
  border: 1px solid blue;
}

.mx_10 {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
