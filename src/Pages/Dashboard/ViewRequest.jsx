import React from 'react'
import { useParams } from 'react-router-dom'

export default function ViewRequest() {

    const params = useParams()

    console.log(params.id)

  return (
    <div>ViewRequest</div>
  )
}
