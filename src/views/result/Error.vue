<template>
  <a-card :bordered="false">
    <a-result status="error" :title="title" :sub-title="description">
      <template #extra>
        <a-button type="primary" >Lorem</a-button>
      </template>
      <div class="desc">
        <div style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 16px">
          Lorem：
        </div>
        <div style="margin-bottom: 16px">
          <a-icon type="close-circle-o" style="color: #f5222d; margin-right: 8px"/>
          Lorem
          <a style="margin-left: 16px">Lorem <a-icon type="right" /></a>
        </div>
        <div>
          <a-icon type="close-circle-o" style="color: #f5222d; margin-right: 8px"/>
          Lorem
          <a style="margin-left: 16px">Lorem <a-icon type="right" /></a>
        </div>
      </div>
    </a-result>
  </a-card>
</template>

<script>

export default {
  name: 'Error',
  data () {
    return {
      title: 'Lorem',
      description: 'Lorem，Lorem。'
    }
  }
}
</script>
