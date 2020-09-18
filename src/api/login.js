import request from '@/utils/request'
import mocky from '../constants/auth-data-mock'
import axiosInit from '@/utils/axios_init'
const userApi = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return new Promise((resolve, reject) => {
    axiosInit.post(userApi.Login, parameter).then(res => {
      resolve({
        mainResult: res,
        mockData: mocky.authDatare
      })
      console.log(res)
    })
      .catch(err => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('salom')
        console.log(err)
      })
    // request({
    //   url: '/auth/login/vendor-users',
    //   method: 'post',
    //   data: parameter,
    //   headers: {
    //     'client_id': '1b0444d7-79c2-42d2-b3c5-528be29506a8'
    //   }
    // }).then(res => {
    //   console.log(res)
    //   resolve(mocky.authData)
    // })
    //   .catch(err => {
    //     // eslint-disable-next-line prefer-promise-reject-errors
    //     reject('salom')
    //     console.log(err)
    //   })
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return new Promise((resolve, reject) => {
    resolve(mocky.userInfo)
  })
  // return request({
  //   url: userApi.UserInfo,
  //   method: 'get',
  //   headers: {
  //     'Content-Type': 'application/json;charset=UTF-8'
  //   }
  // })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}
