import notification from 'ant-design-vue/es/notification'
export default function (err) {
  notification.error({
    message: 'Ошибка сети или сервер не работает',
    description: 'Пожалуйста, проверьте свою сеть или обновить страницу' + '\n' + err.message,
    duration: 5
  })
}
