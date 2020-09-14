import globalMixin from "./mixins/global.js";
import filters from "@/configuration/filters";

export default {
  install(Vue) {
    Vue.mixin(globalMixin)
    Object.entries(filters).forEach(([key, func]) => {
      Vue.filter(key, func)
    })
  }
}