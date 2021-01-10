<template>
  <a-card :bordered="false">
    <a-result status="success" :sub-title="description" :title="title">
      <template #extra>
        <a-button type="primary">Lorem</a-button>
        <a-button style="margin-left: 8px">Lorem</a-button>
        <a-button style="margin-left: 8px">Lorem</a-button>
      </template>
      <div class="content">
        <div style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 20px;">Lorem</div>
        <a-row style="margin-bottom: 16px">
          <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
            <span style="color: rgba(0, 0, 0, 0.85)">Lorem ID：</span>
            20180724089
          </a-col>
          <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
            <span style="color: rgba(0, 0, 0, 0.85)">Lorem：</span>
            Lorem？
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <span style="color: rgba(0, 0, 0, 0.85)">Lorem：</span>
            2016-12-12 ~ 2017-12-12
          </a-col>
        </a-row>
        <a-steps :current="1" :direction="isMobile && directionType.vertical || directionType.horizontal" progressDot>
          <a-step >
            <span style="font-size: 14px" slot="title">Lorem</span>
            <template slot="description">
              <div style="fontSize: 12px; color: rgba(0, 0, 0, 0.45); position: relative; left: 42px;text-align: left;" slot="description" >
                <div style="margin: 8px 0 4px">
                  Lorem
                  <a-icon style="margin-left: 8px" type="dingding-o" />
                </div>
                <div>2016-12-12 12:32</div>
              </div>
            </template>
          </a-step>
          <a-step title="Lorem">
            <span style="font-size: 14px" slot="title">Lorem</span>
            <template slot="description">
              <div style="fontSize: 12px; color: rgba(0, 0, 0, 0.45); position: relative; left: 42px;text-align: left;" slot="description" >
                <div style="margin: 8px 0 4px">
                  Lorem
                  <a-icon style="margin-left: 8px; color: #00A0E9" type="dingding-o" />
                </div>
                <div><a href="">Lorem</a></div>
              </div>
            </template>
          </a-step>
          <a-step title="Lorem">
            <span style="font-size: 14px" slot="title">Lorem</span>
          </a-step>
          <a-step title="Lorem" >
            <span style="font-size: 14px" slot="title">Lorem</span>
          </a-step>
        </a-steps>
      </div>
    </a-result>
  </a-card>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'

const directionType = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

export default {
  name: 'Success',
  mixins: [baseMixin],
  data () {
    this.directionType = directionType
    return {
      title: 'Lorem',
      description: 'Lorem，\n' +
          ' Lorem，Lorem Message Lorem。\n' +
          ' Lorem，Lorem\n' +
          ' “Lorem”Lorem，Lorem。'
    }
  }
}
</script>
