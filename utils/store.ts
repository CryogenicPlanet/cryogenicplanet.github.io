import Blobity from 'blobity'

import { defaultConfig } from '@components/Blobity'
import { autoEffect, store } from '@risingstack/react-easy-state'

const state = store({
  dark:
    (typeof window !== 'undefined' &&
      window.localStorage.getItem('darkMode') === 'true') ||
    false,
  blobity: typeof window === 'undefined' ? null : new Blobity(defaultConfig),
  noGlobalBlobity: false
})

export { state }

autoEffect(() => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('darkMode', state.dark ? 'true' : 'false')
  }
}, [state.dark])
