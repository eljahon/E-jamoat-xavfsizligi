<template>
  <div>
    <div>
      <div v-if="attrType === 'checkbox'">
        <a-checkbox v-for="attr in options" :key="attr.value">
          <strong>{{ attr.value ? attr.value : 'Example' }}</strong>  +{{ attr.additional_price ? attr.additional_price : '00000' }}
        </a-checkbox>
      </div>
      <div v-if="attrType === 'radio'">
        <a-radio-group>
          <a-radio v-for="attr in options" :key="attr.value" :value="attr.value">
            <strong>{{ attr.value ? attr.value : 'Example' }}</strong>  +{{ attr.additional_price ? attr.additional_price : '00000' }}
          </a-radio>
        </a-radio-group>
      </div>
      <div v-if="attrType === 'select'">
        <a-select style="width: 200px">
          <a-select-option v-for="attr in options" :key="attr.value">
            <strong>{{ attr.value ? attr.value : 'Example' }}</strong>  +{{ attr.additional_price ? attr.additional_price : '00000' }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <a-card size="small" :title="$t('options')" style="width: 100%; margin-top: 10px">
      <a-select
        show-search
        slot="extra"
        :placeholder="$t('type')"
        option-filter-prop="children"
        style="width: 300px"
        :filter-option="filterOption"
        @change="handleChange"
      >
        <a-select-option v-for="attr in attributes" :key="attr.id" :value="attr.id + ':' + attr.type">
          {{ attr.name }}
        </a-select-option>
      </a-select>
      <div style="display: flex; margin: 15px 0" v-for="(option, i) in options" :key="i">
        <a-input :placeholder="$t('code')" style="width: 80%; margin: 0px 10px" v-model="option.value" />
        <a-input-number :placeholder="$t('additional_price')" style="width: 80%; margin: 0px 10px" :min="0" v-model="option.additional_price" />
        <a-input-number :placeholder="$t('total_quantity')" style="width: 80%; margin: 0px 10px" :min="0" v-model="option.total_quantity" />
        <a-button v-if="options.length > 1" @click="removeOption(i)" style="padding: 5px; margin: 0px 10px" type="danger" icon="delete" />
      </div>
      <a-button style="padding: 0px 80px 0px 80px; margin-left: 10px" v-if="attrType !== 'text' && attrType !== 'number' && attrType" type="dashed" @click="addOption">{{ $t('add') }}</a-button>
    </a-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    language: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      property_id: null,
      attrType: null,
      options: [{
        total_quantity: null,
        value: '',
        additional_price: null
      }]
    }
  },
  computed: {
    ...mapGetters(['allAttrs', 'attrRU', 'attrUZ', 'attrEN']),
    // eslint-disable-next-line vue/return-in-computed-property
    attributes () {
      if (this.language === 'ru') return this.attrRU
      if (this.language === 'uz') return this.attrUZ
      if (this.language === 'en') return this.attrEN
      return []
    }
  },
  methods: {
    clear() {
      this.property_id = null
      this.attrType = null
      this.options = [{
        total_quantity: null,
        value: '',
        additional_price: null
      }]
    },
    resetForm () {
      this.$refs.ruleForm.resetFields();
    },
    addOption () {
      this.options.push({
        total_quantity: null,
        value: '',
        additional_price: null
      })
    },
    removeOption(i) {
      this.options.splice(i, 1)
    },
    handleChange(value) {
      console.log(value)
      this.property_id = value.split(':')[0]
      this.attrType = value.split(':')[1]
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    }
  }
}
</script>
