import React from 'react'
import Spinner from './components/Spinner'

function loading() {
  return (
    <div className='min-w-screen min-h-screen flex justify-center items-center'>
        <Spinner/>
    </div>
  )
}

export default loading