import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi, getMe } from '../services/api'
import { saveAuth } from '../services/auth'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await loginApi({ username, password })
      saveAuth(data)
      // optionally fetch /users/me to confirm role/username
      try {
        const me = await getMe()
        if (me?.data) {
          saveAuth({ accessToken: data.accessToken, user: me.data })
        }
      } catch {}
      const role = (data?.user?.role) || 'EMPLOYEE'
      navigate(role === 'ADMIN' ? '/admin' : '/employee', { replace: true })
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-employee d-flex align-items-center" style={{minHeight:'100vh'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="glass p-4 rounded-2xl">
              <div className="text-center mb-3">
                <h3 className="fw-bold">Payroll Management</h3>
                <p className="text-muted">Sign in to continue</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                </div>
                {error && <div className="alert alert-danger py-2">{error}</div>}
                <button className="btn btn-primary w-100" disabled={loading}>{loading?'Signing in...':'Login'}</button>
              </form>
              <div className="text-center mt-3">
                <small className="text-muted">Admin & Employee access with JWT</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
