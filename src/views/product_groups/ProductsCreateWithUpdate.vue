<template>
  <a-card :title="$route.name === 'ProductGroupsEdit' ? $t('product-groups.edit') : $t('product-groups.create')">
    <div>
      <a-steps :current='parseInt($route.params.step) - 1'>
        <a-step v-for='item in steps' :key='item.title' :title='item.title' />
      </a-steps>
      <div class='steps-content'>
        <div v-if="$route.params.step === '1'"><first-step/></div>
        <div v-if="$route.params.step === '2'"><second-step/></div>
<!--        <div v-else>-->
<!--          {{ steps[current].content }}-->
<!--        </div>-->
      </div>
<!--      <div class='steps-action'>-->
<!--        <a-button v-if='current < steps.length - 1' type='primary' @click='next'>-->
<!--          Next-->
<!--        </a-button>-->
<!--        <a-button-->
<!--          v-if='current == steps.length - 1'-->
<!--          type='primary'-->
<!--          @click="$message.success('Processing complete!')"-->
<!--        >-->
<!--          Done-->
<!--        </a-button>-->
<!--        <a-button v-if='current > 0' style='margin-left: 8px' @click='prev'>-->
<!--          Previous-->
<!--        </a-button>-->
<!--      </div>-->
    </div>
  </a-card>
</template>
<script>
import FirstStep from './ProductFirstStep'
import SecondStep from './ProductSecondStep'
export default {
  components: {
    'first-step': FirstStep,
    'second-step': SecondStep
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: this.$route.name === 'ProductGroupsEdit' ? this.$t('product.update.field') : this.$t('product.add.field'),
          content: 'First-content'
        },
        {
          title: this.$t('features.assign'),
          content: 'Second-content'
        },
      ]
    }
  },
  methods: {
    next() {
      this.current++
    },
    prev() {
      this.current--
    }
  }
}
</script>
<style scoped>
.steps-content {
  /*margin-top: 16px;*/
  /*border: 1px dashed #e9e9e9;*/
  /*border-radius: 6px;*/
  /*background-color: #fafafa;*/
  /*min-height: 200px;*/
  /*text-align: center;*/
  padding-top: 20px;
}
.steps-action {
  margin-top: 20px;
}
</style>
