import axios from "axios";

const TOKEN_KEY = 'Authorization';
const REFRESH_TOKEN_KEY = 'Refresh';
const EXPIRE = 'Expire';

const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },
    setToken(token, expire) {
        localStorage.setItem(TOKEN_KEY, token);
        if (expire) {
            expire = new Date().getTime() + expire * 1000;
            localStorage.setItem(EXPIRE, expire);
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    },
    checkExpire() {
        let expire = localStorage.getItem(EXPIRE);
        if (expire && new Date(expire).getTime() < new Date().getTime()) {
            this.removeToken()
        }

    },
    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.clear();
    },
    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
};

export default TokenService;
