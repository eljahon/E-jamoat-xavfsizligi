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
    'slug': 'Слизняк',
    'popular': 'Популярный',
    'popular.no': 'Не популярный',
    'logout': 'Выход',
    'image': 'Фото',
    'name_uz': 'Название yзбекский',
    'name_ru': 'Название русский',
    'image_view': 'Просмотр фото',
    'description_uz': 'Oписание yзбекский',
    'description_ru': 'Oписание русский',
    'keyword': 'Ключевое слово',
    'keyword_uz': 'Ключевое слово yзбекский',
    'keyword_ru': 'Ключевое слово русский',
    'content': 'Содержание',
    'content_uz': 'Содержание yзбекский',
    'content_ru': 'Содержание русский',
    'symbol': 'Символ',
    'phone': 'Телефон',
    'price': 'Цена',
    'add_form': 'Добавить форму',
    'update_form': 'Изменить форму',
    'email': 'Электронной почты',
    'short_info': 'Kороткий информация',
    'short_info_uz': 'Kороткий информация yзбекский',
    'short_info_ru': 'Kороткий информация русский',
    'personal_settings': 'Личный кабинет',
    'phone.syntax.error': 'Ошибка номера телефона',
    'blocked': 'Заблокирован',
    'unblock': 'Активация',
    'requiredField': 'Обязательное поле',
    'blockMsg': 'Вы действительно хотите заблокировать?',
    'unblockMsg': 'Вы действительно хотите активировать?',
    'deleteMsg': 'Вы действительно хотите удалить это?',
    'yes': 'Да',
    'no': 'Нет',
    'type': 'Тип',
    'filter_type': 'Типы фильтров',
    'color': 'Цвет',
    'unit': 'Ед. изм',
    'order': 'Номер порядок',
    'delete': 'Удалить',
    'save': 'Сохранить',
    'cancel': 'Отмена',
    'name': 'Название',
    'order_number': 'Порядковый номер',
    'description': 'Описание',
    'add_type': 'Выберите тип',
    'fill': 'Заполните поле',
    'password': 'Пароль',
    'password_confirm': 'Подтвердить пароль',
    'errorPhone': 'Ошибка телефона',
    'errorEmail': 'Электронная почта ошибки',
    'passwordLength': 'Пароль должен быть от 6 до 50',
    'passwordError': 'Пароль не равен паролю подтвердить',

    // courier
    'couriers': 'Курьеры',
    'couriers.list': 'Список курьеров',
    'car_type': 'Тип машины',
    'car_number': 'Номер машины',
    'car_model': 'Модель машины',

    // brands
    'brands': 'Бренды',
    'brands.list': 'Список брендов',

    // features
    'features': 'Bозможност',
    'features.list': 'Список возможностей',
    'features.create': 'Создать возможност',
    'features.value.uz': 'Bозможност yзбекский значение',
    'features.value.ru': 'Bозможност русский значение',
    'filter': 'Фильтр',
    'main': 'Основной',
    'variant': 'Вариант',
    'required': 'Обязательное',



    // complaint
    'complaint_type': 'Тип жалобы',
    'complaint_type.list': 'Список типов жалоб',

    // delivery
    'delivery_type': 'Тип доставки',
    'delivery_type.list': 'Список типов доставки',

    // loaction

    'location': 'Локаций',
    'location.list': 'Список локаций',
    'has_delivery': 'Есть доставка',

    // measures
    'measures': 'Меры',
    'measures.list': 'Список мер',

    // vacancy
    'vacancy': 'Вакансия',
    'vacancy.list': 'Список вакансий',

    // supplier
    'supplier': 'Поставщик',
    'supplier.list': 'Список поставщиков',
    // staff
    'users': 'Пользователи',
    'users.list': 'Список пользователей',


    // supplier store
    'supplier_store': 'Магазин-поставщик',
    'supplier_store.list': 'Список магазинов поставщиков',

    // article
    'article': 'Статья',
    'article.list': 'Список статей',

    // order
    // 'order': 'Заказы',
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
