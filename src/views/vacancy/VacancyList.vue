<template>
  <div>
    <a-card title="Vacancy List" style="width: 100%">
      <a-button type="primary" slot="extra" @click="addItem">{{ $t('add') }}</a-button>
      <a-row style="margin: 10px 0">
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-input v-debounce="search" :placeholder="$t('search')" />
        </a-col>
      </a-row>
      <a-table
        :columns="columns"
        :data-source="allVacancys"
        :loading="loadVacancy"
        :rowKey="item => item.id"
        @change="changePagination"
        :pagination="paginationVacancy"
        bordered
      >
        <template slot="action" slot-scope="item">
          <a-tooltip>
            <template slot="title">{{ $t('update') }}</template>
            <a-button style="margin: 0 2px" id="buttonUpdate" type="primary" @click="editItem(item)" icon="edit"></a-button>
          </a-tooltip>
          <a-popconfirm
            placement="topRight"
            slot="extra"
            :title="$t('deleteMsg')"
            @confirm="removeItem(item)"
            :okText="$t('yes')"
            :cancelText="$t('no')"
          >
            <a-tooltip>
              <template slot="title">{{ $t('delete') }}</template>
              <a-button
                style="margin: 0 2px"
                type="danger"
                icon="delete"
              ></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>

    <!-- MODALS -->
    <vacancy-create ref="createVacancy" :editable="false" :params="params"/>
    <vacancy-create ref="editVacancy" :editable="true" :params="params"/>
  </div>
</template>
<script>
import vacancyCreate from './VacancyCreateWithUpdate'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    'vacancy-create': vacancyCreate,
  },
  data() {
    return {
      visible: false,
      loading: false,
      slug: null,
      columns: [
        {
          title: 'Title UZ',
          dataIndex: 'title_uz',
        },
        {
          title: 'Title RU',
          dataIndex: 'title_ru',
        },
        {
          title: 'Content UZ',
          dataIndex: 'content_uz',
        },
        {
          title: 'Content RU',
          dataIndex: 'content_ru',
        },
        {
          title: this.$t('action'),
          key: 'action',
          align: 'center',
          width: '20%',
          scopedSlots: { customRender: 'action' },
        },
      ],
      params: {
        pagination: {
          current: 1,
          pageSize: 15,
          total: null,
        },
        search: '',
      },
    }
  },
  methods: {
    ...mapActions(['getAllVacancys', 'getAllLocationsList', 'deleteVacancy']),
    editItem(item) {
      this.$refs.editVacancy.show(item)
    },
    changePagination(e) {
      this.params.pagination = e
      this.getAllVacancys(this.params)
    },
    search(value) {
      console.log(value)
      this.params.search = value
      this.getAllVacancys(this.params)
    },
    removeItem (item) {
      console.log(item)
      this.deleteVacancy(item.id).then(res => {
        this.getAllVacancys(this.params)
      })
    },
    addItem () {
      this.$refs.createVacancy.show()
    }
  },
  computed: {
    ...mapGetters(['allVacancys', 'loadVacancy', 'paginationVacancy']),
  },
  mounted() {
    this.getAllVacancys(this.params)
    this.getAllLocationsList()
  },
}
</script>
<style>
.ant-table-row:hover {
  cursor: pointer;
}
</style>
