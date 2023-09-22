import React from 'react'

function ErrorMessage({error, className = ''}: {error: string, className?: string}) {
  if(!error){
    return null
  }
  return (
    <p className={"text-red-500 text-xs italic " + className}>{error}</p>
  )
}

export default ErrorMessage