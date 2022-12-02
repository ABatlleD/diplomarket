import { setCookie, getCookie } from 'cookies-next'

export const addClicks = () => {
  const current = getCookie('NEXT-TIP')
  console.log('🚀 ~ file: quick-tip.js:5 ~ addClicks ~ current', current)
  if (!current) {
    setCookie('NEXT-TIP', 0)
  } else if (current >= 2) {
    setCookie('NEXT-TIP', 0)
  } else {
    setCookie('NEXT-TIP', (parseInt(current) + 1))
  }
}
