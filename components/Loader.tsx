import React from 'react'
import { DominoSpinner } from 'react-spinners-kit'

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="h-screen w-full min-w-screen flex justify-center items-center text-black dark:text-indigo-500">
      <DominoSpinner size={200} loading={isLoading} color="currentColor" />
    </div>
  )
}
export default Loader
