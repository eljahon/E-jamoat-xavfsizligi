import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from 'vuetify/es5/locale/ru';

import Components from './components'
import '@fortawesome/fontawesome-free/css/all.css'
import {getThemeFromLocalStorage} from "@/utils/pureFunctions";

Vue.use(Components)


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes:  {
            light: {
                success: '#27AE60',
                primary: '#0066ff',
                error: '#F23D5B',
                secondary: '#738699',
                warning: '#FFB946',
                accent: '#9B51E0',
                info: '#109CF1',
                dark: '#171E28',

            },
            dark: {
                dark: '#171E28'
            }
        },
        customProperties: true,
        dark: getThemeFromLocalStorage() === 'dark'
    },
    lang: {
        locales: {ru},
        current: 'ru',
    },
    icons: {
        iconfont: 'fa',
    },
});
