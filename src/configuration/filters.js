import {refactorNumber} from "@/utils/pureFunctions";

export default {
  parseDate(val) {
    const date = new Date(val)
    return date.toLocaleDateString('RU-ru')
  },

  money(val) {
    return val ? val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') : 0
  },
  hidePartPhone(val) {
    if (!val) return '';
    const phoneNumber = refactorNumber({prefix: "+998 ", removeSymbol: '-', number: val}).split('')
    phoneNumber.splice(7, 3, ' * * * ')
    return phoneNumber.join('')
  },
}
