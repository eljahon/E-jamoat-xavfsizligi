import store from '@/store'
import i18n from '@/locales'
import notification from 'ant-design-vue/es/notification'
const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default (e) => {
  return new Promise((resolve, reject) => {
    const image = new FormData()
    image.append('image', e.file)
    store.dispatch('uploadData', image).then(res => {
      getBase64(e.file, imageUrl => {
        resolve({
          image_url: imageUrl,
          image: res.data.data.path
        })
      })
    })
      .catch(err => {
        notification.error({
          message: i18n.t('upload_image_error'),
          description: err.message
        })
        getBase64(e.file, imageUrl => {
          // eslint-disable-next-line
          reject({
            message: 'error',
            image: imageUrl
          })
        })

      })
      .finally(() => {
        console.log('upload final')
      })
  })
}
