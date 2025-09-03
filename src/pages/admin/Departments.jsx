import React, { useEffect, useState } from 'react'
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment } from '../../services/api'

export default function Departments() {
  const [list, setList] = useState([])
  const [name, setName] = useState('')

  const load = async () => {
    try { const { data } = await fetchDepartments(); setList(data||[]) } catch { setList([]) }
  }
  useEffect(()=>{ load() }, [])

  const add = async (e) => {
    e.preventDefault()
    await createDepartment({ name })
    setName('')
    await load()
  }

  const rename = async (d) => {
    const n = prompt('New name:', d.name)
    if (n) { await updateDepartment(d.id, { name:n }); await load() }
  }

  const remove = async (d) => {
    if (confirm('Delete department?')) { await deleteDepartment(d.id); await load() }
  }

  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-lg-4">
          <div className="card"><div className="card-body">
            <h5>Add Department</h5>
            <form onSubmit={add}>
              <input className="form-control mb-2" placeholder="Department name" value={name} onChange={e=>setName(e.target.value)} required />
              <button className="btn btn-primary">Save</button>
            </form>
          </div></div>
        </div>
        <div className="col-lg-8">
          <div className="card"><div className="card-body">
            <h5>Departments</h5>
            <ul className="list-group">
              {list.length ? list.map((d,i)=>(
                <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                  {d.name}
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-secondary" onClick={()=>rename(d)}>Rename</button>
                    <button className="btn btn-outline-danger" onClick={()=>remove(d)}>Delete</button>
                  </div>
                </li>
              )) : <li className="list-group-item text-muted">No departments</li>}
            </ul>
          </div></div>
        </div>
      </div>
    </div>
  )
}
