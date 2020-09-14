import CustomSelect from "./CustomSelect"
import CustomInputText from "./CustomInputText"
import CustomTextTextarea from "./CustomTextTextarea"
import CustomDatePicker from "./CustomDatePicker"
import BtnWithTooltip from "./BtnWithTooltip";
import CustomAutocomplete from "./CustomAutocomplete";

export default {
    install(Vue) {
        Vue.component(CustomSelect.name, CustomSelect)
        Vue.component(CustomInputText.name, CustomInputText)
        Vue.component(CustomDatePicker.name, CustomDatePicker)
        Vue.component(CustomTextTextarea.name, CustomTextTextarea)
        Vue.component(BtnWithTooltip.name, BtnWithTooltip)
        Vue.component(CustomAutocomplete.name, CustomAutocomplete)
    }
}
