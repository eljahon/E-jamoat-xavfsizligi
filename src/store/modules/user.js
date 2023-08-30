import storage from 'store'
import { login, getInfo } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    defalut: ['preventive', 'practice', 'womens', 'YoungPeople', 'public', 'reports', 'analysis', 'settings', 'dashboard']
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
          login(userInfo).then(response => {
            console.log(response)
          const result = response.mainResult.user
          const token = response.mainResult.jwt
          storage.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', token)
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },


    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response

          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
          // ...role.permissions.map(permission => { return permission.permissionId })
            role.permissionList = [...state.defalut]
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
            console.log(role.permissionList, 'role.permissionList')
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },


    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        // logout(state.token).then(() => {
        //   resolve()
        // }).catch(() => {
        //   resolve()
        // }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
        resolve('Log Out')
        // })
      })
    }

  }
}

export default user
