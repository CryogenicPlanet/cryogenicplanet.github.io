import { useRouter } from 'next/dist/client/router'
import React from 'react'

import Things from '@components/things'

const FilteredThings = () => {
  const router = useRouter()

  const { filter } = router.query

  if (typeof filter === 'string') {
    return <Things filter={filter}></Things>
  } else {
    return null
  }
}

export default FilteredThings
