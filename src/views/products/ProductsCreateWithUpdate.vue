<template>
  <a-card title='Product Creation'>
    <div>
      <a-steps :current='current'>
        <a-step v-for='item in steps' :key='item.title' :title='item.title' />
      </a-steps>
      <div class='steps-content'>
        <div v-if='current === 0'><first-step/></div>
        <div v-if='current === 1'><second-step/></div>
        <div v-else>
          {{ steps[current].content }}
        </div>
      </div>
      <div class='steps-action'>
        <a-button v-if='current < steps.length - 1' type='primary' @click='next'>
          Next
        </a-button>
        <a-button
          v-if='current == steps.length - 1'
          type='primary'
          @click="$message.success('Processing complete!')"
        >
          Done
        </a-button>
        <a-button v-if='current > 0' style='margin-left: 8px' @click='prev'>
          Previous
        </a-button>
      </div>
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
          title: 'First',
          content: 'First-content'
        },
        {
          title: 'Second',
          content: 'Second-content'
        },
        {
          title: 'Last',
          content: 'Last-content'
        }
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
