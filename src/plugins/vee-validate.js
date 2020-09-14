import {ValidationObserver, ValidationProvider, extend, setInteractionMode} from 'vee-validate'
import {email, required, min_value, max_value} from 'vee-validate/dist/rules'
import {messages} from "vee-validate/dist/locale/ru.json"
//rules
extend('required', {
  ...required,
  message: messages.required
})

extend('phone', {
  validate(value) {
    const pattern = /\d{2}-?\d{3}-?\d{2}-?\d{2}/
    return pattern.test(value)
  },
  message: '{_field_} введено неправильно'
})

extend('inn', {
  validate(value) {
    return new RegExp(/\d{9}/).test(value)
  },
  message: '{_field_} не действительный'
})
extend('pnfl', {
  validate(value) {
    return new RegExp(/\d{14}/).test(value)
  },
  message: '{_field_} не действительный'
})

extend('email', {
  ...email,
  message: messages.email
});

extend('min_value', {
  ...min_value,
  message: messages.min_value
})
extend('max_value', {
  ...max_value,
  message: messages.max_value
})

extend('confirmed', {
  params: ['value', 'fieldName'],
  validate(value, {value: fieldValue}) {
    return value === fieldValue
  },
  message: messages.confirmed
})


//rules


setInteractionMode('lazy')
export default {
  install(Vue) {
    Vue.component('ValidationProvider', ValidationProvider);
    Vue.component('ValidationObserver', ValidationObserver);
  }
}
