import React from 'react'

function Title({title} : {title:string}) {
  return (
    <h2 className="text-center text-3xl font-bold text-slate-900">{title}</h2>
  )
}

export default Title