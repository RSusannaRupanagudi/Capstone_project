import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getUser } from '../services/auth'

export default function RoleRoute({ role }) {
  const user = getUser()
  if (!user) return <Navigate to="/login" replace />
  return user.role === role ? <Outlet/> : <Navigate to="/" replace />
}
