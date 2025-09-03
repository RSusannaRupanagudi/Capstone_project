import React, { useEffect, useState } from 'react'
import { createLeaveRequest, fetchLeaveRequests } from '../../services/api'

export default function Leave() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ start_date:'', end_date:'', leave_type:'SICK' })
  const load = async () => { try { const {data} = await fetchLeaveRequests(); setList(data||[]) } catch { setList([])} }
  useEffect(()=>{ load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    await createLeaveRequest(form)
    setForm({ start_date:'', end_date:'', leave_type:'SICK' })
    await load()
  }

  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-lg-4">
          <div className="card"><div className="card-body">
            <h5>Apply Leave</h5>
            <form onSubmit={submit}>
              <label className="form-label">Start Date</label>
              <input type="date" className="form-control mb-2" value={form.start_date} onChange={e=>setForm({...form, start_date:e.target.value})} required />
              <label className="form-label">End Date</label>
              <input type="date" className="form-control mb-2" value={form.end_date} onChange={e=>setForm({...form, end_date:e.target.value})} required />
              <label className="form-label">Type</label>
              <select className="form-select mb-2" value={form.leave_type} onChange={e=>setForm({...form, leave_type:e.target.value})}>
                <option value="SICK">Sick</option>
                <option value="CASUAL">Casual</option>
                <option value="PAID">Paid</option>
              </select>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div></div>
        </div>
        <div className="col-lg-8">
          <div className="card"><div className="card-body">
            <h5>My Leave Requests</h5>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead><tr><th>Type</th><th>Start</th><th>End</th><th>Status</th></tr></thead>
                <tbody>
                  {list.length ? list.map((r,i)=>(
                    <tr key={i}>
                      <td>{r.leave_type}</td>
                      <td>{r.start_date}</td>
                      <td>{r.end_date}</td>
                      <td><span className="badge text-bg-secondary">{r.status}</span></td>
                    </tr>
                  )) : <tr><td colSpan="4" className="text-center text-muted">No requests</td></tr>}
                </tbody>
              </table>
            </div>
          </div></div>
        </div>
      </div>
    </div>
  )
}
