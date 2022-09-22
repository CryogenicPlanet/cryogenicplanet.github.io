import { autoEffect, store } from '@risingstack/react-easy-state'

const state = store<{ dark: boolean; showBg: boolean; noImageBg: boolean }>({
  dark:
    (typeof window !== 'undefined' &&
      window.localStorage.getItem('darkMode') === 'true') ||
    true,
  showBg: false,
  noImageBg: false
})

export { state }

autoEffect(() => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('darkMode', state.dark ? 'true' : 'false')
  }
}, [state.dark])
