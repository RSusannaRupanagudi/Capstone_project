import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../services/auth'

export default function Navbar() {
  const user = getUser()
  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-expand-lg navbar-blur sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">PayrollMS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user?.role === 'ADMIN' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/admin">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/employees">Employees</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/departments">Departments</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/jobs">Jobs</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/payroll">Payroll</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/leave">Leave</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin/reports">Reports</Link></li>
              </>
            )}
            {user?.role === 'EMPLOYEE' && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/employee">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/employee/profile">Profile</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/employee/leave">Leave</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/employee/salary-slip">Salary Slip</Link></li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <span className="text-muted small">Signed in as <strong>{user.username}</strong></span>
                <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
              </>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={()=>navigate('/login')}>Login</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
