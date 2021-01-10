<template>
  <page-header-wrapper
    title="Lorem：234231029431"
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    @tabChange="handleTabChange"
  >
    <template v-slot:content>
      <a-descriptions size="small" :column="isMobile ? 1 : 2">
        <a-descriptions-item label="Lorem">Lorem</a-descriptions-item>
        <a-descriptions-item label="Lorem">XX Lorem</a-descriptions-item>
        <a-descriptions-item label="Lorem">2017-07-07</a-descriptions-item>
        <a-descriptions-item label="Lorem">
          <a href="">12421</a>
        </a-descriptions-item>
        <a-descriptions-item label="Lorem">2017-07-07 ~ 2017-08-08</a-descriptions-item>
        <a-descriptions-item label="Lorem">Lorem</a-descriptions-item>
      </a-descriptions>
    </template>

    <!-- actions -->
    <template v-slot:extra>
      <a-button-group style="margin-right: 4px;">
        <a-button>Lorem</a-button>
        <a-button>Lorem</a-button>
        <a-button><a-icon type="ellipsis"/></a-button>
      </a-button-group>
      <a-button type="primary" >Lorem</a-button>
    </template>

    <template v-slot:extraContent>
      <a-row class="status-list">
        <a-col :xs="12" :sm="12">
          <div class="text">Lorem</div>
          <div class="heading">Lorem</div>
        </a-col>
        <a-col :xs="12" :sm="12">
          <div class="text">Lorem</div>
          <div class="heading">¥ 568.08</div>
        </a-col>
      </a-row>
    </template>

    <a-card :bordered="false" title="Lorem">
      <a-steps :direction="isMobile && 'vertical' || 'horizontal'" :current="1" progressDot>
        <a-step>
          <template v-slot:title>
            <span>Lorem</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              Lorem<a-icon type="dingding" style="margin-left: 8px;" />
              <div>2016-12-12 12:32</div>
            </div>
          </template>
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>Lorem</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              Lorem<a-icon type="dingding" style="color: rgb(0, 160, 233); margin-left: 8px;" />
              <div><a>Lorem</a></div>
            </div>
          </template>
        </a-step>
        <a-step title="Lorem" />
        <a-step title="Lorem" />
      </a-steps>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false" title="Lorem">
      <a-descriptions>
        <a-descriptions-item label="Lorem">Lorem</a-descriptions-item>
        <a-descriptions-item label="Lorem">32943898021309809423</a-descriptions-item>
        <a-descriptions-item label="Lorem">3321944288191034921</a-descriptions-item>
        <a-descriptions-item label="Lorem">18112345678</a-descriptions-item>
        <a-descriptions-item label="Lorem">Lorem</a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="Lorem">
        <a-descriptions-item label="Lorem">725</a-descriptions-item>
        <a-descriptions-item label="Lorem">2018-08-08</a-descriptions-item>
        <a-descriptions-item ></a-descriptions-item>
        <a-descriptions-item label="Lorem">725</a-descriptions-item>
        <a-descriptions-item label="Lorem">2018-08-08</a-descriptions-item>
        <a-descriptions-item ></a-descriptions-item>
      </a-descriptions>
      <a-card type="inner" title="Lorem">
        <a-descriptions title="Lorem" size="small">
          <a-descriptions-item label="Lorem">Lorem</a-descriptions-item>
          <a-descriptions-item label="Lorem">1234567</a-descriptions-item>
          <a-descriptions-item label="Lorem">XXLorem-YYLorem</a-descriptions-item>
          <a-descriptions-item label="Lorem">2018-08-08</a-descriptions-item>
          <a-descriptions-item label="Lorem">Lorem...</a-descriptions-item>
        </a-descriptions>
        <a-divider style="margin: 16px 0" />
        <a-descriptions title="Lorem" size="small" :col="1">
          <a-descriptions-item label="Lorem">	Citrullus lanatus (Thunb.) Matsum. et NakaiLorem；Lorem、Lorem，Lorem。Lorem..</a-descriptions-item>
        </a-descriptions>
        <a-divider style="margin: 16px 0" />
        <a-descriptions title="Lorem" size="small" :col="2">
          <a-descriptions-item label="Lorem">Lorem</a-descriptions-item>
          <a-descriptions-item label="Lorem">1234567</a-descriptions-item>
        </a-descriptions>
      </a-card>

    </a-card>

    <a-card style="margin-top: 24px" :bordered="false" title="Lorem">
      <div class="no-data"><a-icon type="frown-o"/>Lorem</div>
    </a-card>

    <!-- Lorem -->
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="operationTabList"
      :activeTabKey="operationActiveTabKey"
      @tabChange="(key) => {this.operationActiveTabKey = key}"
    >
      <a-table
        v-if="operationActiveTabKey === '1'"
        :columns="operationColumns"
        :dataSource="operation1"
        :pagination="false"
      >
        <template
          slot="status"
          slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
        </template>
      </a-table>
      <a-table
        v-if="operationActiveTabKey === '2'"
        :columns="operationColumns"
        :dataSource="operation2"
        :pagination="false"
      >
        <template
          slot="status"
          slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
        </template>
      </a-table>
      <a-table
        v-if="operationActiveTabKey === '3'"
        :columns="operationColumns"
        :dataSource="operation3"
        :pagination="false"
      >
        <template
          slot="status"
          slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
        </template>
      </a-table>
    </a-card>

  </page-header-wrapper>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'

export default {
  name: 'Advanced',
  mixins: [baseMixin],
  data () {
    return {
      tabList: [
        { key: 'detail', tab: 'Lorem' },
        { key: 'rule', tab: 'Lorem' }
      ],
      tabActiveKey: 'detail',

      operationTabList: [
        {
          key: '1',
          tab: 'Lorem'
        },
        {
          key: '2',
          tab: 'Lorem'
        },
        {
          key: '3',
          tab: 'Lorem'
        }
      ],
      operationActiveTabKey: '1',

      operationColumns: [
        {
          title: 'Lorem',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: 'Lorem',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Lorem',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: 'Lorem',
          dataIndex: 'updatedAt',
          key: 'updatedAt'
        },
        {
          title: 'Lorem',
          dataIndex: 'remark',
          key: 'remark'
        }
      ],
      operation1: [
        {
          key: 'op1',
          type: 'Lorem',
          name: 'Lorem',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op2',
          type: 'Lorem',
          name: 'Lorem',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: 'Lorem'
        },
        {
          key: 'op3',
          type: 'Lorem',
          name: 'Lorem',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op4',
          type: 'Lorem',
          name: 'Lorem',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: 'Lorem'
        },
        {
          key: 'op5',
          type: 'Lorem',
          name: 'Lorem',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        }
      ],
      operation2: [
        {
          key: 'op2',
          type: 'Lorem',
          name: 'Lorem',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: 'Lorem'
        },
        {
          key: 'op3',
          type: 'Lorem',
          name: 'Lorem',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op4',
          type: 'Lorem',
          name: 'Lorem',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: 'Lorem'
        }
      ],
      operation3: [
        {
          key: 'op2',
          type: 'Lorem',
          name: 'Lorem',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: 'Lorem'
        },
        {
          key: 'op3',
          type: 'Lorem',
          name: 'Lorem',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        }
      ]
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'agree': 'Lorem',
        'reject': 'Lorem'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        'agree': 'success',
        'reject': 'error'
      }
      return statusTypeMap[type]
    }
  },
  methods: {
    handleTabChange (key) {
      console.log('')
      this.tabActiveKey = key
    }
  }
}
</script>

<style lang="less" scoped>

  .detail-layout {
    margin-left: 44px;
  }
  .text {
    color: rgba(0, 0, 0, .45);
  }

  .heading {
    color: rgba(0, 0, 0, .85);
    font-size: 20px;
  }

  .no-data {
    color: rgba(0, 0, 0, .25);
    text-align: center;
    line-height: 64px;
    font-size: 16px;

    i {
      font-size: 24px;
      margin-right: 16px;
      position: relative;
      top: 3px;
    }
  }

  .mobile {
    .detail-layout {
      margin-left: unset;
    }
    .text {

    }
    .status-list {
      text-align: left;
    }
  }
</style>
