<template>
  <a-table
    :columns="columns"
    :rowKey="record => record.property_id + record.value"
    :data-source="data"
    :pagination="false"
    bordered
  >
    <template slot="name" slot-scope="item">
      <div>{{ attrName(item) }}</div>
    </template>
    <template slot="example" slot-scope="item">
      <div v-if="item.type === 'checkbox'">
        <a-checkbox v-for="attr in item.values" :key="attr.value">
        <strong>{{ attr.value }}</strong>  +{{ attr.additional_price }}
        </a-checkbox>
      </div>
      <div v-if="item.type === 'radio'">
        <a-radio-group>
          <a-radio v-for="attr in item.values" :key="attr.value" :value="attr.value">
            <strong>{{ attr.value }}</strong>  +{{ attr.additional_price }}
          </a-radio>
        </a-radio-group>
      </div>
      <div v-if="item.type === 'select'">
        <a-select style="width: 200px">
          <a-select-option v-for="attr in item.values" :key="attr.value">
            <strong>{{ attr.value }}</strong>  +{{ attr.additional_price }}
          </a-select-option>
        </a-select>
      </div>
    </template>
    <template slot="action" slot-scope="item">
      <a-tooltip>
        <template slot="title">{{ $t('delete') }}</template>
        <a-button style="margin: 0 2px" id="buttonUpdate" type="danger" @click="deleteAttr(item)" icon="delete"></a-button>
      </a-tooltip>
    </template>
  </a-table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    language: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      columns: [
        {
          title: 'Name',
          key: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: 'Example',
          key: 'example',
          width: '60%',
          scopedSlots: { customRender: 'example' },
        },
        {
          title: this.$t('action'),
          key: 'action',
          align: 'center',
          width: '20%',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  methods: {
    attrName (item) {
      const attrList = this.attributes
      for (var i = 0; i < attrList.length; i++) {
        if (item.property_id === attrList[i].id) {
          return attrList[i].name
        }
      }
    },
    deleteAttr (item) {
      console.log(item)
      this.$emit('delAttr', item)
    }
  },
  computed: {
    ...mapGetters(['allAttrs', 'attrRU', 'attrUZ', 'attrEN']),
    attributes () {
      if (this.language === 'ru') return this.attrRU
      if (this.language === 'uz') return this.attrUZ
      if (this.language === 'en') return this.attrEN
      return []
    }
  }
}
</script>
