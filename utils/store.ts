import Blobity from 'blobity'

import { defaultConfig } from '@components/Blobity'
import { store } from '@risingstack/react-easy-state'

const state = store({
  dark: false,
  blobity: typeof window === 'undefined' ? null : new Blobity(defaultConfig),
  noGlobalBlobity: false
})

export { state }
