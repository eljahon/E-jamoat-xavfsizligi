<template>
  <div>
    <v-data-table
      hide-default-footer
      :items="items"
      :headers="headers"
    ></v-data-table>
    <div class="d-flex align-center mx-n2 justify-space-between flex-wrap mt-3">
      <div class="d-flex align-center px-2">
        <v-pagination class="no-arrow" :value="5" total-visible="10" :length="100"></v-pagination>
        <v-btn class="primary-transparent no-shadow primary--text ml-3">Дальше</v-btn>
      </div>
      <div class="px-2 d-flex align-center">
        <span class="subtitle-2 grey--text mr-4">Перейти на страницу</span>
        <custom-input-text
          style="width: 80px"
          hide-details
          class="mr-3"
          placeholder="Номер"
        ></custom-input-text>
        <v-btn class="no-shadow primary-transparent primary--text">Перейти</v-btn>
      </div>
    </div>
  </div>
</template>


<script>
    export default {
        name: 'VTable',
        data() {
            return {
                headers: [
                    {
                        text: 'test',
                        value: 'test'
                    },
                    {
                        text: 'test',
                        value: 'value'
                    },
                ],
                items: [
                    {
                        test: 'testsdfa sdf asdf',
                        value: 'just test'
                    },
                    {
                        test: 'testsdfa sdf asdf',
                        value: 'just test'
                    },
                    {
                        test: 'testsdfa sdf asdf',
                        value: 'just test'
                    },
                    {
                        test: 'testsdfa sdf asdf',
                        value: 'just test'
                    },
                    {
                        test: 'testsdfa sdf asdf',
                        value: 'just test'
                    },
                ]
            }
        }
    }
</script>