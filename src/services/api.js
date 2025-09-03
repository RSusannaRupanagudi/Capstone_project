import axios from 'axios'
import { getToken, logout } from './auth'

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api/v1'

const api = axios.create({
  baseURL: API_BASE,
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      logout()
    }
    return Promise.reject(error)
  }
)

// Auth
export const loginApi = (payload) => api.post('/auth/login', payload)

// Users
export const getMe = () => api.get('/users/me')

// Employees
export const fetchEmployees = (params={}) => api.get('/employees', { params })
export const createEmployee = (payload) => api.post('/employees', payload)
export const getEmployee = (id) => api.get(`/employees/${id}`)
export const updateEmployee = (id, payload) => api.put(`/employees/${id}`, payload)

// Departments & Jobs
export const fetchDepartments = () => api.get('/departments')
export const createDepartment = (payload) => api.post('/departments', payload)
export const updateDepartment = (id, payload) => api.put(`/departments/${id}`, payload)
export const deleteDepartment = (id) => api.delete(`/departments/${id}`)

export const fetchJobs = () => api.get('/jobs')
export const createJob = (payload) => api.post('/jobs', payload)
export const updateJob = (id, payload) => api.put(`/jobs/${id}`, payload)
export const deleteJob = (id) => api.delete(`/jobs/${id}`)

// Payroll
export const createPayrollRun = (payload) => api.post('/payroll/runs', payload)
export const processPayrollRun = (id) => api.post(`/payroll/runs/${id}/process`)
export const lockPayrollRun = (id) => api.post(`/payroll/runs/${id}/lock`)
export const getPayrollItems = (id) => api.get(`/payroll/runs/${id}/items`)
export const getMyPay = (year, month) => api.get(`/payroll/my/${year}/${month}`)

// Leave
export const fetchLeaveRequests = () => api.get('/leave/requests')
export const approveLeave = (id) => api.post(`/leave/requests/${id}/approve`)
export const rejectLeave = (id) => api.post(`/leave/requests/${id}/reject`)
export const createLeaveRequest = (payload) => api.post('/leave/requests', payload)

// Reports
export const getPayrollSummary = (params) => api.get('/reports/payrollsummary', { params })
export const getDepartmentCost = (params) => api.get('/reports/department-cost', { params })

export default api
