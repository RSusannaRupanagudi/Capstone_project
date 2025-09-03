import React, { useState } from 'react'
import { getMyPay } from '../../services/api'

export default function SalarySlip() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth()+1)
  const [data, setData] = useState(null)

  const load = async () => {
    const res = await getMyPay(year, month)
    setData(res.data)
  }

  return (
    <div className="container py-4">
      <div className="card"><div className="card-body">
        <h5>Salary Slip</h5>
        <div className="row g-2 align-items-end">
          <div className="col-md-3"><label className="form-label">Year</label><input className="form-control" type="number" value={year} onChange={e=>setYear(Number(e.target.value))} /></div>
          <div className="col-md-3"><label className="form-label">Month</label><input className="form-control" type="number" value={month} onChange={e=>setMonth(Number(e.target.value))} /></div>
          <div className="col-md-6"><button className="btn btn-primary" onClick={load}>Load</button></div>
        </div>
        <hr/>
        {data ? (
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr><th>Basic</th><td>{data.basic_salary}</td></tr>
                <tr><th>Deductions</th><td>{data.deductions}</td></tr>
                <tr><th>Bonus</th><td>{data.bonus}</td></tr>
                <tr><th>Net</th><td className="fw-bold">{data.net_salary}</td></tr>
                <tr><th>Pay Date</th><td>{data.pay_date}</td></tr>
              </tbody>
            </table>
          </div>
        ) : <p className="text-muted">No data</p>}
      </div></div>
    </div>
  )
}
