import React, { useState } from 'react'
import { getPayrollSummary, getDepartmentCost } from '../../services/api'

export default function Reports() {
  const [summary, setSummary] = useState(null)
  const [dept, setDept] = useState(null)
  const [params, setParams] = useState({ year: new Date().getFullYear(), month: new Date().getMonth()+1 })

  const loadSummary = async () => {
    const { data } = await getPayrollSummary(params)
    setSummary(data)
  }
  const loadDept = async () => {
    const { data } = await getDepartmentCost(params)
    setDept(data)
  }

  return (
    <div className="container py-4">
      <div className="card"><div className="card-body">
        <h5>Reports</h5>
        <div className="row g-2">
          <div className="col-md-3"><input className="form-control" type="number" value={params.year} onChange={e=>setParams({...params, year:Number(e.target.value)})}/></div>
          <div className="col-md-3"><input className="form-control" type="number" value={params.month} onChange={e=>setParams({...params, month:Number(e.target.value)})}/></div>
          <div className="col-md-6 d-flex gap-2">
            <button className="btn btn-primary" onClick={loadSummary}>Payroll Summary</button>
            <button className="btn btn-secondary" onClick={loadDept}>Department Cost</button>
          </div>
        </div>
        <hr/>
        <pre className="bg-light p-3 rounded">{JSON.stringify({ summary, dept }, null, 2)}</pre>
      </div></div>
    </div>
  )
}
