import React, { useState } from 'react'
import { createPayrollRun, processPayrollRun, lockPayrollRun, getPayrollItems } from '../../services/api'

export default function PayrollRuns() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth()+1)
  const [runId, setRunId] = useState(null)
  const [items, setItems] = useState([])

  const createRun = async () => {
    const { data } = await createPayrollRun({ year, month })
    setRunId(data.id)
    alert('Run created')
  }
  const processRun = async () => {
    await processPayrollRun(runId)
    alert('Processed')
  }
  const lockRun = async () => {
    await lockPayrollRun(runId)
    alert('Locked')
  }
  const loadItems = async () => {
    const { data } = await getPayrollItems(runId)
    setItems(data||[])
  }

  return (
    <div className="container py-4">
      <div className="card"><div className="card-body">
        <h5>Payroll Runs</h5>
        <div className="row g-2 align-items-end">
          <div className="col-md-3">
            <label className="form-label">Year</label>
            <input type="number" className="form-control" value={year} onChange={e=>setYear(Number(e.target.value))}/>
          </div>
          <div className="col-md-3">
            <label className="form-label">Month</label>
            <input type="number" className="form-control" value={month} onChange={e=>setMonth(Number(e.target.value))}/>
          </div>
          <div className="col-md-6 d-flex gap-2">
            <button className="btn btn-primary" onClick={createRun}>Create Run</button>
            <button className="btn btn-secondary" disabled={!runId} onClick={processRun}>Process</button>
            <button className="btn btn-warning" disabled={!runId} onClick={lockRun}>Lock</button>
            <button className="btn btn-outline-info" disabled={!runId} onClick={loadItems}>Load Items</button>
          </div>
        </div>
        <hr/>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead><tr><th>Employee</th><th>Basic</th><th>Deductions</th><th>Bonus</th><th>Net</th></tr></thead>
            <tbody>
              {items.length ? items.map((it,i)=>(
                <tr key={i}>
                  <td>{it.employee_name}</td>
                  <td>{it.basic_salary}</td>
                  <td>{it.deductions}</td>
                  <td>{it.bonus}</td>
                  <td>{it.net_salary}</td>
                </tr>
              )) : <tr><td colSpan="5" className="text-center text-muted">No items</td></tr>}
            </tbody>
          </table>
        </div>
      </div></div>
    </div>
  )
}
