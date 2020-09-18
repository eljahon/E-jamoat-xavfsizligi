<template>
  <a-modal width="800px" centered v-model="visible" :maskClosable="false" @cancel="hide" title="Info">
    <a-descriptions layout="vertical" bordered size="default">
      <a-descriptions-item label="Product Name">
        <p v-if="product">{{ product.name }}</p>
      </a-descriptions-item>
      <a-descriptions-item label="Product Price">
        <p v-if="product">{{ product.price }}</p>
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions layout="vertical" bordered>
      <a-descriptions-item label="Product Image">
        <img v-if="product" :src="product.image" alt="Product">
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      product: null
    }
  },
  methods: {
    hide () {
      this.visible = false
    },
    show () {
      this.visible = true
    }
  }
}
</script>
