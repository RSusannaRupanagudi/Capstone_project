import React, { useEffect, useState } from 'react'
import { fetchLeaveRequests, approveLeave, rejectLeave } from '../../services/api'

export default function LeaveApprovals() {
  const [list, setList] = useState([])
  const load = async () => { try { const {data} = await fetchLeaveRequests(); setList(data||[]) } catch { setList([]) } }
  useEffect(()=>{ load() }, [])

  return (
    <div className="container py-4">
      <div className="card"><div className="card-body">
        <h5>Leave Requests</h5>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead><tr><th>Employee</th><th>Type</th><th>Start</th><th>End</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.length ? list.map((r,i)=>(
                <tr key={i}>
                  <td>{r.employee_name}</td>
                  <td>{r.leave_type}</td>
                  <td>{r.start_date}</td>
                  <td>{r.end_date}</td>
                  <td><span className="badge text-bg-secondary">{r.status}</span></td>
                  <td className="text-end">
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-success" onClick={async()=>{await approveLeave(r.id); await load()}}>Approve</button>
                      <button className="btn btn-danger" onClick={async()=>{await rejectLeave(r.id); await load()}}>Reject</button>
                    </div>
                  </td>
                </tr>
              )) : <tr><td colSpan="6" className="text-center text-muted">No requests</td></tr>}
            </tbody>
          </table>
        </div>
      </div></div>
    </div>
  )
}
