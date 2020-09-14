import Axios from "axios"
import TokenService from "../utils/TokenService";
import router from "../router";
import store from "../store";

const baseURL = "http://api.icangroup.uz/api/v1"
// const baseURL = 'http://127.0.0.1:8000/api/v1'
const http = Axios.create({
  baseURL
})

function setConfiguration(provider) {
  provider.interceptors.request.use(config => {
      let token = TokenService.getToken();

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    error => Promise.reject(error)
  );
  provider.interceptors.response.use(res => res,
    error => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        TokenService.removeToken();
        TokenService.removeRefreshToken();
        store.commit('clearUser')
        store.dispatch('clearTimeIntervalRefreshToken')
        try {
            router.push({name: 'login'})
        } catch (e) {

        }
      }
      return Promise.reject(error)
    });
}

setConfiguration(http)

export default http