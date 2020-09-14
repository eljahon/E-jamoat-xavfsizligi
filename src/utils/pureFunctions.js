export function generateText(wordCount = 10) {
    let text = "";
    let alphabet = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,r,s,t,u,v,w,x,y,z".split(",");
    for (let i = 0; i < wordCount; i++) {
        let rand = Math.floor(Math.random() * alphabet.length);
        text += alphabet[rand]
    }
    return text
}

export function refactorNumber({prefix, number, removeSymbol}) {
    if (removeSymbol) {
        number = number.replace(new RegExp(removeSymbol, 'ig'), '')
    }
    return prefix + number
}


export function debounce(fn, delay) {
    let timeout = null
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

export const makerPagination = ({limit, total}) => {
    return {
        limit,
        total,
        lastPage: Math.ceil(total / limit)
    }
}

export const isValidDate = date => {
    return !isNaN(new Date(date).getTime())
}

export const removerSpace = str => {
    return str.replace(/\s/g, '')
}


export const alphaOnly = () => {
    const isAlphabet = /[а-яА-Яa-zA-z\s]/i.test(event.key)
    if (isAlphabet) return true
    else event.preventDefault()
}

export const numberOnly = () => {
    const isNumber = /[\d]/i.test(event.key)
    if (isNumber) return true
    else event.preventDefault()
}

export const getMonthByNumber = (number) => {
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    return months[number - 1]
}

export const setThemeToLocalStorage = (theme, key = 'theme') => {
    localStorage.setItem(key, theme)
}

export const getThemeFromLocalStorage = (key = 'theme', defaultTheme = 'light') => {
    return localStorage.getItem(key) || defaultTheme
}