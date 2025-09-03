import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import RoleRoute from './components/RoleRoute'

import Login from './pages/Login'
import AdminDashboard from './pages/admin/Dashboard'
import Employees from './pages/admin/Employees'
import Departments from './pages/admin/Departments'
import Jobs from './pages/admin/Jobs'
import PayrollRuns from './pages/admin/PayrollRuns'
import LeaveApprovals from './pages/admin/LeaveApprovals'
import Reports from './pages/admin/Reports'

import EmpDashboard from './pages/employee/Dashboard'
import Profile from './pages/employee/Profile'
import Leave from './pages/employee/Leave'
import SalarySlip from './pages/employee/SalarySlip'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          {/* Admin */}
          <Route element={<RoleRoute role="ADMIN" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/employees" element={<Employees />} />
            <Route path="/admin/departments" element={<Departments />} />
            <Route path="/admin/jobs" element={<Jobs />} />
            <Route path="/admin/payroll" element={<PayrollRuns />} />
            <Route path="/admin/leave" element={<LeaveApprovals />} />
            <Route path="/admin/reports" element={<Reports />} />
          </Route>

          {/* Employee */}
          <Route element={<RoleRoute role="EMPLOYEE" />}>
            <Route path="/employee" element={<EmpDashboard />} />
            <Route path="/employee/profile" element={<Profile />} />
            <Route path="/employee/leave" element={<Leave />} />
            <Route path="/employee/salary-slip" element={<SalarySlip />} />
          </Route>
        </Route>

        <Route path="*" element={<div className="container py-5"><h3>404 - Not Found</h3></div>} />
      </Routes>
    </div>
  )
}
