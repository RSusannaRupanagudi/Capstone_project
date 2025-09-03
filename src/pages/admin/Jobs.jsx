import React, { useEffect, useState } from 'react'
import { fetchJobs, createJob, updateJob, deleteJob } from '../../services/api'

export default function Jobs() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ title:'', base_salary:'' })
  const load = async () => { try { const {data} = await fetchJobs(); setList(data||[]) } catch { setList([])} }
  useEffect(()=>{ load() }, [])

  const add = async (e) => {
    e.preventDefault()
    await createJob({ ...form, base_salary: Number(form.base_salary) })
    setForm({ title:'', base_salary:'' })
    await load()
  }

  const edit = async (j) => {
    const t = prompt('Title:', j.title)
    const s = prompt('Base salary:', j.base_salary)
    if (t && s) { await updateJob(j.id, { title:t, base_salary:Number(s) }); await load() }
  }

  const remove = async (j) => {
    if (confirm('Delete job?')) { await deleteJob(j.id); await load() }
  }

  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-lg-4">
          <div className="card"><div className="card-body">
            <h5>Add Job</h5>
            <form onSubmit={add}>
              <input className="form-control mb-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
              <input className="form-control mb-2" placeholder="Base salary" type="number" value={form.base_salary} onChange={e=>setForm({...form, base_salary:e.target.value})} required />
              <button className="btn btn-primary">Save</button>
            </form>
          </div></div>
        </div>
        <div className="col-lg-8">
          <div className="card"><div className="card-body">
            <h5>Jobs</h5>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead><tr><th>Title</th><th>Base Salary</th><th></th></tr></thead>
                <tbody>
                  {list.length ? list.map((j,i)=>(
                    <tr key={i}>
                      <td>{j.title}</td>
                      <td>{j.base_salary}</td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-secondary" onClick={()=>edit(j)}>Edit</button>
                          <button className="btn btn-outline-danger" onClick={()=>remove(j)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  )): <tr><td colSpan="3" className="text-center text-muted">No jobs</td></tr>}
                </tbody>
              </table>
            </div>
          </div></div>
        </div>
      </div>
    </div>
  )
}
