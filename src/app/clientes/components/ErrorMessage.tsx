import React from 'react'

function ErrorMessage({error}: {error: string}) {
  return (
    <p className="text-red-500 text-xs italic">{error}</p>
  )
}

export default ErrorMessage