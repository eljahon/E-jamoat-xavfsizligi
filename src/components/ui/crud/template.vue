<template>
  <div>
    <slot name="default" :editItemHandler="editItemHandler"></slot>
    <v-dialog v-model="dialog" :width="defaultDialogWidth">
      <slot name="form-dialog">
        <v-card>
          <slot name="form-title" :isUpdate="isUpdate">
            <div class="py-4 px-6">
              <h5 class="title" v-if="!isUpdate">Создать</h5>
              <h5 class="title" v-else>Изменить</h5>
            </div>
          </slot>
          <v-card-text>
            <slot name="form-content" :loading="loading" :isUpdate="isUpdate"></slot>
          </v-card-text>
        </v-card>
      </slot>
    </v-dialog>
    <warning-dialog ref="deleteDialog" @apply="$emit('deleteItem', editedItem)"
                    v-model="warningDialog"></warning-dialog>
  </div>
</template>

<script>
  import FormCrudMixin from '@/configuration/mixins/crud'
  import warningDialog from '@/components/ui/prompt/warning-dialog'
  import {defaultDialogWidth} from "@/utils/constants";


  export default {
    props: {
      editedItem: {
        type: Object
      },
      fileKey: {
        type: String
      },
      fileUrlKey: {
        type: String
      }
    },
    data() {
      return {
        dialog: false,
        warningDialog: false,
        defaultFormData: null,
        defaultDialogWidth
      }
    },
    watch: {
      dialog(val) {
        if (!val) {
          this.$emit('update:editedItem', {...this.defaultFormData})
          this.$emit('dialogClosed')
        }
      },
      warningDialog(val) {
        if (!val) {
          this.editedItem = null
        }
      }
    },
    computed: {
      isUpdate() {
        return this.editedItem && this.editedItem.id || false
      }
    },
    mixins: [FormCrudMixin],
    methods: {
      editItemHandler(type, data) {
        if (type === 'edit') {
          this.dialog = true
          data = {...data}
          if (this.fileKey) {

          }
          this.$emit('update:editedItem', data)
        } else if (type === 'delete') {
          this.$emit('update:editedItem', data)
          this.warningDialog = true
          this.$emit('update:editedItem', data)
        } else if (type === 'create') {
          this.$emit('update:editedItem', {...this.defaultFormData})
          this.dialog = true
        }
      },
      closeFormDialog() {
        this.dialog = false
      }
    },
    components: {
      warningDialog
    },
    mounted() {
      this.defaultFormData = {...this.editedItem}
    }

  }
</script>