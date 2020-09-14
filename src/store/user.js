import TokenService from "@/utils/TokenService";
import http from "@/plugins/axios";

export default {
    state: {
        user: null
    },
    getters: {
        me: state => state.user
    },
    actions: {
        async getUser({state}) {
            try {

            } catch (e) {
                return Promise.reject(e)
            }
        },
        async login({state, dispatch}, user) {
            try {
                const {data: {access_token}} = await http.post('auth/login', user)
                TokenService.setToken(access_token)
            } catch (e) {
                return Promise.reject(e)
            }
        },
    }
}