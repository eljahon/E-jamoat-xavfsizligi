<template>
  <a-card :title="$route.params.id ? $t('roles.edit') : $t('roles.create')">
    <a-button v-if="!$route.params.id" slot='extra' type='primary' :loading='loading' @click='save'>{{ $t('save') }}</a-button>
    <a-button v-else slot='extra' type='primary' :loading='loading' @click='update'>{{ $t('update') }}</a-button>
      <a-form-model-item style='margin: 0 12px' :label="$t('roles.name')">
        <a-input style='width: 100%;' v-model='name'></a-input>
      </a-form-model-item>
    <a-checkbox-group style='margin-top: 30px' v-model='permissions'>
      <div style='display: flex; flex-wrap: wrap; flex: 1'>
        <a-card v-for='(per, i) in allPermissions' :key='per.name + i' :title='per.name'
                style='width: 270px; margin: 10px 12px'
        >
          <a-row v-for='(item, j) in per.items' :key='item.name + j'>
            <a-col :span='24'>
              <a-checkbox :value='item.name'>{{ $t(item.name.split('.')[2]) }}</a-checkbox>
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
  data () {
    return {
      name: '',
      permissions: [],
      loading: false
    }
  },
  methods: {
    ...mapActions(['getAllPermissions', 'saveRole', 'getRoleById', 'updateRole']),
    // onChange(checkedValues) {
    //   console.log('checked = ', checkedValues)
    //   this.permissions = checkedValues
    // },
    save () {
      this.loading = true
      if (this.name && this.permissions.length > 1) {
        this.saveRole({
          name: this.name,
          permissions: this.permissions
        }).then(res => {
          this.loading = false
          this.$message.success(this.$t('role.created'))
          this.$router.push({ name: 'UserRoleList' })
        })
        .catch(err => {
          this.loading = false
        })
      } else {
        this.loading = false
        this.$message.error('Некоторые поля не выбраны')
      }
    },
    update () {
      this.loading = true
      if (this.name && this.permissions.length > 1) {
        this.updateRole({
          id: this.$route.params.id,
          data: {
            id: parseInt(this.$route.params.id),
            name: this.name,
            permissions: this.permissions
          }
        }).then(res => {
          this.loading = false
          this.$message.success(this.$t('role.updated'))
          this.$router.push({ name: 'UserRoleList' })
        })
        .catch(err => {
          this.loading = false
        })
      } else {
        this.loading = false
        this.$message.error('Некоторые поля не выбраны')
      }
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
    if (this.$route.params.id) {
      this.getRoleById(this.$route.params.id).then(res => {
        this.name = res.data.name
        this.permissions = res.data.permissions
        console.log(res)
      })
    }
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
