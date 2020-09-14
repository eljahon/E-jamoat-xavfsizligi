<template>
  <div>
    <full-loading :value="loading"></full-loading>
    <v-navigation-drawer
      width="275"
      :mini-variant="settings.miniVariant"
      v-model="settings.drawer"
      color="dark"
      app
      class="cabinet-sidebar">
      <div class="d-flex align-center px-2 justify-center logo-div" :style="{height: settings.toolbarHeight-2 + 'px'}">
        <div class="logo-img" v-if="!settings.miniVariant">
          <img src="../assets/images/logo.png" alt="">
        </div>
      </div>
      <v-divider/>
      <navigation/>

      <v-btn absolute bottom right icon @click="settings.miniVariant = !settings.miniVariant">
        <v-icon>{{ settings.miniVariant ? 'fas fa-caret-right' : 'fas fa-caret-left' }}</v-icon>
      </v-btn>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="light"
      :height="settings.toolbarHeight"
      class="justify-end"
      flat>
      <v-btn icon @click.stop="settings.drawer = !settings.drawer"
             :class="['menu-drawer-activator', {'menu-drawer-activator-active': !settings.drawer}]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2 4C2 3.44772 2.44772 3 3 3H18C18.5523 3 19 3.44772 19 4C19 4.55228 18.5523 5 18 5H3C2.44772 5 2 4.55228 2 4ZM2 10C2 9.44772 2.44772 9 3 9H18C18.5523 9 19 9.44772 19 10C19 10.5523 18.5523 11 18 11H3C2.44772 11 2 10.5523 2 10ZM3 15C2.44772 15 2 15.4477 2 16C2 16.5523 2.44772 17 3 17H18C18.5523 17 19 16.5523 19 16C19 15.4477 18.5523 15 18 15H3Z" fill="#738699"/>
        </svg>
      </v-btn>
      <v-spacer/>
      <div class="d-flex">
        <span class="d-inline-block mr-2">{{theme}}</span>
        <v-switch
          v-model="$vuetify.theme.isDark"
          @change="changeTheme"
          hide-details
        ></v-switch>
      </div>

      <div class="notify-block">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.8431 14.0268C19.8247 13.9097 19.7965 13.7942 19.759 13.6817C19.3995 12.6813 18.3744 12.0827 17.3265 12.2612C16.9798 12.3158 16.6545 12.0791 16.5998 11.7324L16.0725 8.3584C15.6397 5.50368 13.5774 3.16587 10.799 2.38034C10.5463 0.833779 9.08771 -0.215134 7.54111 0.0375656C6.01498 0.28693 4.96952 1.71235 5.19024 3.24289C2.79534 4.75851 1.53117 7.55318 1.97419 10.3525L2.53926 13.9436C2.59101 14.2896 2.35557 14.6131 2.01051 14.6702C0.958257 14.822 0.166295 15.7064 0.130976 16.769C0.118799 17.948 1.06476 18.9137 2.24382 18.9259C2.2512 18.926 2.25862 18.926 2.266 18.926C2.3773 18.926 2.48839 18.9174 2.59835 18.9004L4.78888 18.556C5.5509 19.9163 7.27139 20.4014 8.63172 19.6394C9.35025 19.2369 9.8572 18.5407 10.0197 17.7333L18.0652 16.4672C19.2301 16.2843 20.0261 15.1917 19.8431 14.0268ZM7.7886 1.51428C7.86278 1.50272 7.93771 1.49676 8.01277 1.49647C8.48986 1.49901 8.93425 1.73924 9.19771 2.13698H9.16356C8.89814 2.12897 8.63243 2.1366 8.36789 2.15974C8.08929 2.18635 7.81245 2.22913 7.53877 2.28785C7.47968 2.29994 7.42135 2.31703 7.36297 2.33125C7.13879 2.38392 6.91886 2.44585 6.70323 2.51915C6.68188 2.52557 6.65982 2.52912 6.63847 2.53696C6.78863 2.00033 7.23812 1.60064 7.7886 1.51428ZM7.24771 18.5766C6.94609 18.577 6.65236 18.4802 6.41008 18.3005L8.40279 17.9881C8.13462 18.3584 7.7049 18.5774 7.24771 18.5766ZM18.3406 14.7286C18.2316 14.9076 18.0494 15.0294 17.8424 15.0617L9.27031 16.4096L5.10488 17.065L2.37918 17.492C2.17268 17.5257 1.96193 17.4658 1.80414 17.3284C1.64309 17.191 1.55156 16.9891 1.55436 16.7775C1.58517 16.4125 1.86819 16.1194 2.23185 16.0758C3.35274 15.8961 4.1181 14.8449 3.94484 13.723L3.38047 10.1319C3.01084 7.7628 4.16122 5.41524 6.25992 4.25565C6.27227 4.25152 6.28436 4.24677 6.2962 4.24143C6.97733 3.87239 7.72659 3.64617 8.49812 3.57674C8.73193 3.55618 8.96682 3.55168 9.20126 3.56323L9.31798 3.56894C9.5605 3.58362 9.80178 3.61402 10.0403 3.66006C10.0482 3.66006 10.0553 3.66006 10.0631 3.66006C12.4712 4.18101 14.304 6.14031 14.6634 8.57774L15.1943 11.9518C15.3708 13.0748 16.424 13.8423 17.5471 13.6662C17.906 13.5961 18.2649 13.7874 18.4068 14.1245C18.4762 14.3256 18.4519 14.5472 18.3406 14.7286Z" fill="#0076C3"/>
        </svg>
        <div class="notify-block-dot">10</div>
      </div>
      <v-menu

      >
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center">
            <div class="ml-3">
            <v-list-item-title>Антон Павлов</v-list-item-title>
            <v-list-item-subtitle>Администратор</v-list-item-subtitle>
            </div>
          <v-list
            dense
            class="py-0 ml-4">
            <v-list-item
              :ripple="false" two-line class="px-0 justify-end " @click="on.click">
              <v-list-item-content>

              </v-list-item-content>
            </v-list-item>
          </v-list>
            <v-btn v-on="on" class="primary-transparent rounded-circle" icon small><v-icon small>fas fa-angle-down</v-icon></v-btn>
          </div>
        </template>

        <v-list>
          <v-list-item @click="logOut">
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <div class="pa-sm-7 pa-3">
        <router-view/>
      </div>
    </v-main>

  </div>
</template>

<script>
    import FullLoading from "@/components/ui/loading/full-loading"
    import Navigation from "@/layouts/Navigation";
    import TokenService from "@/utils/TokenService";
    import router from "@/router";
    import {mapGetters} from 'vuex'
    import {setThemeToLocalStorage} from "@/utils/pureFunctions";
    import {THEMES} from "@/utils/constants";

    export default {
        name: "MainLayout",
        components: {FullLoading, Navigation},
        data() {
            return {
                settings: {
                    toolbarHeight: 64,
                    miniVariant: false,
                    drawer: true
                },
                currentUserAction: null,
            }
        },

        computed: {
            theme() {
                return THEMES[this.$vuetify.theme.isDark ? 'dark' : 'light']
            },
            ...mapGetters(['mko', 'me']),
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            changeTheme(isDark) {
                setThemeToLocalStorage(isDark ? 'dark' : 'light')
            },
            logOut() {
                TokenService.removeToken()
                this.$store.commit('clearUser')
                router.push({name: 'login'})
            }
        },
        async mounted() {
            try {
                await this.$store.dispatch('getUser')
            } catch (e) {
                this.$setResponseError({error: e})
            }
        }
    }
</script>


