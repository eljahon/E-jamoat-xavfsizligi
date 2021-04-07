<template>
  <a-modal width="800px" :maskClosable="false" v-model="visible" title="Файловый менеджер" centered @cancel="close">
    <template slot="footer">
      <div style="width: 100%; display: flex; justify-content: space-between">
        <div>
          <a-upload
            :custom-request="(e) => { uploadImage(e) }"
            :show-upload-list="false"
            :before-upload="beforeUpload"
          >
            <a-button>{{ $t('upload_photo') }}</a-button>
          </a-upload>
        </div>
        <div>
          <a-button key="back" @click="close">
            {{ $t('cancel') }}
          </a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="save">
            {{ $t('save') }}
          </a-button>
        </div>
      </div>
    </template>
<!--    <a-card size="small">-->
<!--      <a-button-group>-->
<!--        <a-button @click="back" type="default" icon="arrow-left" />-->
<!--        <a-button type="default" icon="appstore" />-->
<!--        <a-button type="default" icon="unordered-list" />-->
<!--        <a-button @click="next" type="default" icon="arrow-right" />-->
<!--      </a-button-group>-->
<!--    </a-card>-->
    <div>
      <transition name="slide">
        <div v-if="onUpload" class="uploader">
          <h3>{{ $t('upload') }}....</h3>
          <a-progress
            :stroke-color="{
              from: '#108ee9',
              to: '#87d068',
            }"
            :percent="progress"
            status="active"
          />
        </div>
      </transition>
      <div class="renderPlace" v-if="attachments_loading">
        <div v-for="n in 8" :key="n" class="loader">
          <a-skeleton active />
        </div>
      </div>
      <div v-else>
        <div v-if="images.length === 0" class="renderPlace">
          <div v-if="!onUpload" class="noImages">
            <h1>{{ $t('no_category_image') }}</h1>
            <a-upload
              :custom-request="(e) => { uploadImage(e) }"
              :show-upload-list="false"
              :before-upload="beforeUpload"
            >
              <a-button>{{ $t('upload_photo') }}</a-button>
            </a-upload>
          </div>
        </div>
        <a-checkbox-group v-if="images.length > 0" v-model="selected" class="renderPlace" @change="onChange">
          <a-checkbox v-for="(item, i) in images" :key="i" class="card" :value="item">
            <img @click="showImage(item)" :src="item.image_url" />
          </a-checkbox>
        </a-checkbox-group>
      </div>
    </div>
    <a-modal width="600px" v-model="view" centered :footer="null" title="View Image" @cancel="view = !view">
      <div style="width: 100%">
        <img :src="viewImage" class="view"/>
      </div>
    </a-modal>
  </a-modal>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['value'],
  data () {
    return {
      visible: false,
      view: false,
      viewImage: '',
      loading: false,
      images: [],
      selected: [],
      indexes: {
        product_id: null,
        image_id: null
      }
    }
  },
  computed: {
    ...mapGetters(['fileManager', 'attachments', 'attachments_loading', 'progress', 'onUpload']),
    files () {
      let _files = []
      _files = [ ...this.fileManager.folders, ...this.fileManager.files ]
      return _files
    }
  },
  methods: {
    uploadImage(e) {
      console.log(e)
      this.$imageUp(e).then(res => {
        this.images.unshift(res)
        console.log(res)
      })
    },
    save () {
      if (this.selected.length > 0) {
        this.$emit('input', {
          indexes: this.indexes,
          data: this.selected
        })
        this.visible = !this.visible
        this.clear()
      }
    },
    beforeUpload(file) {
      return this.$beforeUpImage(file)
    },
    onChange (e) {
      this.selected = e
      console.log(e)
      // console.log(this.checkBoxSelected)
    },
    route () {
      this.$router.push({
        name: this.$route.name,
        query: {
          salom: 'alik'
        }
      })
      console.log(this.$route)
    },
    showImage (item) {
      this.viewImage = item.image_url
      this.view = !this.view
    },
    clear () {
      this.selected = []
      this.indexes = {
        product_id: null,
        image_id: null
      }
    },
    back () {
      if (this.$route.query.folder) {
        this.$router.go(-1)
        setTimeout(() => {
          this.$store.dispatch('getFileManager', this.$route.query.folder)
        }, 100)
      }
    },
    next () {
      if (!this.$route.query.folder) {
        this.$router.go(1)
        setTimeout(() => {
          this.$store.dispatch('getFileManager', this.$route.query.folder)
        }, 100)
      }
    },
    showFile (item) {
      if (item.type === 'dir') {
        // this.$router.push({
        //   name: this.$route.name,
        //   query: {
        //     folder: item.basename
        //   }
        // })
        this.$store.dispatch('getFileManager', item.basename)
      }
    },
    open (i, j) {
      this.indexes.product_id = i
      this.indexes.image_id = j
      this.visible = !this.visible
    },
    close () {
      this.visible = !this.visible
      this.clear()
      // this.$router.push({
      //   name: this.$route.name
      // })
    }
  },
  mounted() {
    this.$store.dispatch('getAttachments', this.$route.query.productGroupId).then(res => {
      this.images = this.attachments
    })
  }
}
</script>

<style lang="less">

.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}
.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.slide-enter-to, .slide-leave {
  max-height: 200px;
  opacity: 1;
}
.slide-enter, .slide-leave-to {
  max-height: 0;
  opacity: 0;
}


.uploader {
  margin: 10px 5px;
  border: 1px solid grey;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  padding: 20px;
}
.ant-checkbox-wrapper-checked {
  background-color: #00A0E9;
}
.card {
  .ant-checkbox {
    display: none !important;
  }
  .ant-checkbox-checked {
    display: none !important;
  }
}
.noImages {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  height: 100%;
  width: 100%;
}
.view {
  margin: 0 auto;
  width: 100%;
  height: auto;
  object-fit: contain;
}
.renderPlace {
  width: 100%;
  height: 440px;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  .card {
    img {
      margin: 0 auto;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    width: 135px;
    height: 130px;
    //align-self: center;
    margin: 5px;
    //padding: 10px;
    border: 1px solid #b8b8b8;
    border-radius: 5px;
    cursor: pointer;
    //background-color: #52c41a;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    transition: all, .3s;
  }
  //.file {
  //
  //  width: 135px;
  //  height: 120px;
  //  //align-self: center;
  //  margin: 5px;
  //  display: flex;
  //  align-items: center;
  //  justify-content: center;
  //  flex-flow: column;
  //}
  .loader {
    width: 170px;
    height: 120px;
    margin: 5px;
    padding: 10px;
  }
  .card:hover {
    border: 1px solid #00A0E9;
  }

}
</style>
