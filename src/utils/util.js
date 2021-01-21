export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? 'Good mornig' : hour <= 11 ? 'Good afternoon' : hour <= 13 ? 'Good Day' : hour < 20 ? 'Good Night' : 'Good'
}

export function welcome() {
  const arr = ['Admin', 'Super Admin', 'Customer', 'User']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function() {
  }
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function includesObj(arr, obj, equalifier) {
  for (let i = 0; i < arr.length; i++) {
    if (equalifier(arr[i], obj)) {
      return true
    }
  }
  return false
}


export function findDuplicates(arr, extractor = item => item, equalifier = (x, y) => x === y) {
  const accumulator = []
  for (let i = 0; i < arr.length; i++) {
    const item = extractor(arr[i])
    if (includesObj(accumulator, item, equalifier)) {
      return true
    }
    accumulator.push(item)
  }
  return false
}
