import React, { useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'

export default function DashboardHome() {

    const {user} = useContext(AuthContext)
    console.log(user)

  return (
    <div>
        <h4>Welcome {user?.displayName}</h4>
    </div>
  )
}
