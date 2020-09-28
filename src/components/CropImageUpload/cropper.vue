<template>
  <a-modal width="700px" :maskClosable="false" v-model="visible" centered @cancel="hide" title="Crop upload Image">
    <template slot="footer">
      <a-row type="flex" justify="space-between">
        <a-col :span="17">
          <a-upload
            key="upload"
            name="avatar"
            :show-upload-list="false"
            accept="image/*"
            :beforeUpload="beforeUpload"
          >
            <a-button>
              <a-icon type="upload"/>
              Upload
            </a-button>
          </a-upload>
          <a-button @click="refresh" :disabled="active" style="margin-left: 10px">
            <a-icon type="sync"/>
            Refresh
          </a-button>
          <a-button-group style="margin-left: 10px">
            <a-tooltip placement="top">
              <template slot="title">
                <span>Zoom +</span>
              </template>
              <a-button :disabled="active" @click="$refs.cropper.changeScale(1)" icon="plus" />
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">
                <span>Zoom -</span>
              </template>
              <a-button :disabled="active" @click="$refs.cropper.changeScale(-1)" icon="minus" />
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">
                <span>Rotate -90 &deg;</span>
              </template>
              <a-button :disabled="active" @click="$refs.cropper.rotateLeft()" icon="undo" />
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">
                <span>Rotate +90 &deg;</span>
              </template>
              <a-button :disabled="active" @click="$refs.cropper.rotateRight()" icon="redo" />
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">
                <span>Left</span>
              </template>
              <a-button :disabled="active" icon="left" />
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">
                <span>Right</span>
              </template>
              <a-button :disabled="active" icon="right" />
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">
                <span>Up</span>
              </template>
              <a-button :disabled="active" icon="up" />
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">
                <span>Down</span>
              </template>
              <a-button :disabled="active" icon="down" />
            </a-tooltip>
          </a-button-group>
        </a-col>
        <a-col :span="4">
          <a-button key="submit" type="primary" :loading="loading" @click="save">
            Save
          </a-button>
        </a-col>
      </a-row>
    </template>
    <div style="width: 100%; height: 400px">
      <vue-cropper
        ref="cropper"
        :img="imgSrc"
        :aspect-ratio="16 / 9"
        :auto-crop="true"
        :auto-crop-height="200"
        :auto-crop-width="200"
      >
      </vue-cropper>
    </div>
  </a-modal>
</template>

<script>

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  data () {
    return {
      loading: false,
      visible: false,
      imgSrc: '',
      cropImg: '',
      cropData: null,
      active: true
    }
  },
  methods: {
    hide () {
      this.visible = false
    },
    show () {
      this.visible = true
    },
    save () {
        if (this.imgSrc !== '') {
          console.log(this.$refs.cropper)
          this.$refs.cropper.getCropBlob((data) => {
            getBase64(data, imageUrl => {
              this.cropImg = imageUrl
              this.cropData = data
              console.log(data)
              this.$emit('save', {
                data: data,
                url: imageUrl
              })
            })
          })
        } else this.$message.error('Image Not Selected')
    },
    uploadImage (e) {
      console.log(e)
      getBase64(e.file, imageUrl => {
        this.imgSrc = imageUrl
      })
    },
    beforeUpload (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imgSrc = reader.result
        this.active = false
      }
      return false
    },
    refresh () {
      this.$refs.cropper.refresh()
      console.log(this.$refs.cropper)
    }
  }
}
</script>

<style scoped>
.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
</style>
