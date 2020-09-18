import antdruRU from 'ant-design-vue/es/locale-provider/ru_RU'
import momentRU from 'moment/locale/ru'

const components = {
  antLocale: antdruRU,
  momentName: 'ru',
  momentLocale: momentRU
}

const locale = {
    'dashboard': 'Дашборд',
    // category
    'categories': 'Категории',
    'category_list': 'Список категорий',
    'add_category': 'Добавить категорию',
    'edit_category': 'Изменить категорию',
    // product
    'products': 'Продукты',
    'product_list': 'Список продукты',
    // basic
    'add': 'Добавить',
    'active': 'Активный',
    'inactive': 'Неактивный',
    'status': 'Статус',
    'update': 'Изменить',
    'action': 'Действия',
    'search': 'Поиск',
    'logout': 'Выход',
    'personal_settings': 'Личный кабинет',
    'blocked': 'Заблокирован',
    'unblock': 'Активация',
    'blockMsg': 'Вы действительно хотите заблокировать?',
    'unblockMsg': 'Вы действительно хотите активировать?',
    'deleteMsg': 'Вы действительно хотите удалить это?',
    'yes': 'Да',
    'no': 'Нет',
    'type': 'Тип',
    'delete': 'Удалить',
    'save': 'Сохранить',
    'cancel': 'Отмена',
    'name': 'Название',
    'order_number': 'Порядковый номер',
    'description': 'Описание',
    'add_type': 'Выберите тип',


    // order
    'order': 'Заказы',
    'order_list': 'Список заказов',
    'update_attr': 'Изменить атрибуты',
    'total': 'Всего',
    'quantity': 'Количество',
    'customerName': 'Имя клиента',
    'customerPhone': 'Телефон клиента',
    'deliveryPrice': 'Цена доставки',
    'selectStatus': 'Выберите статус',
    'orderCountByBranch': 'Количество заказов по филиалам',
    'orderEdit': 'Изменить заказ',
    'ordersCount': 'Количество заказов',
    'createOrder': 'Создать заказ',
    'orders': 'Заказы',
    'all': 'Все заказы',
    'preview_order': 'Информация о заказы',
    'delivered': 'Доставлен',
    'finished': 'Завершен',
    'new': 'Новый',
    'clearHistory': 'Oчистит историю',
    'updateOrder': 'Обновить заказ',
    'clearedHistory': 'Очищенная история',
    'noProd': 'Продукт не выбран',
    'newUserNoHistory': 'Новый пользователь. Не история',
    'dubProd': 'дублированный продукт',
    'required2': 'обязательный',
    'orderSuccess': 'Заказ сохранен Успешно',
    'orderUpdate': 'Заказ oбновить Успешно',
    'addField': 'Добавить поле',
    'operatorAccepted': 'Оператор принял',
    'operatorCancelled': 'Оператор отменил',
    'branchesAccepted': 'Филиал принял',
    'branchesCancelled': 'Филиал отменил',
    'branchesReady': ' Филиал подготовил',
    'ready': 'Готов',
    'courierAccepted': 'Курьер принял',
    'courierCancelled': 'Курьер отменил',
    'courierPickedUp': 'Курьер взял',
    'cancelled': 'Oтменено',
    'descriptionOrder': 'Описание',
    'noValidAddress': 'Нет подходящих адресов',
    'verifiedAddress': 'Уточненный адрес',
    'finishReason': 'Причина отмены',
    'finishTime': 'Время отмены',
    'allTime': 'Общее время',

    // attrs

    'attrs': 'Атрибуты',
    'attrs_list': 'Список атрибутов',
    'add_attr': 'Добавить атрибуты',
    'additional_price': 'Дополнительная цена',
    'total_quantity': 'Общая численность',
    'code': 'Код',
    'options': 'Параметры',

    // Validation
    'name-validation': 'Название должно быть написано',
    'order-validation': 'Порядковый номер должно быть написано',
    'type-validaion': 'Требуется тип'
}

export default {
  ...components,
  ...locale
}
