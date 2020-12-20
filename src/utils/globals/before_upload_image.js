import notification from 'ant-design-vue/es/notification'

export default (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    notification.error({
      message: 'Вы можете загружать только файлы JPG, PNG!'
    })
  }
  return isJpgOrPng
}
