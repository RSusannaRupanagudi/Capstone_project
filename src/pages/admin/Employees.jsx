import React, { useEffect, useState } from 'react'
import { fetchEmployees, createEmployee } from '../../services/api'

export default function Employees() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', phone:'' })

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await fetchEmployees()
      setList(data || [])
    } catch {
      setList([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    try {
      await createEmployee(form)
      setForm({ first_name:'', last_name:'', email:'', phone:'' })
      await load()
      alert('Employee created')
    } catch (e) {
      alert('Failed to create employee')
    }
  }

  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5>Add Employee</h5>
              <form onSubmit={submit}>
                {['first_name','last_name','email','phone'].map(k=>(
                  <div className="mb-2" key={k}>
                    <label className="form-label text-capitalize">{k.replace('_',' ')}</label>
                    <input className="form-control" value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} required />
                  </div>
                ))}
                <button className="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h5>Employees</h5>
              {loading ? <p>Loading...</p> : (
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Department</th></tr></thead>
                    <tbody>
                      {list.length ? list.map((e,i)=>(
                        <tr key={i}>
                          <td>{e.first_name} {e.last_name}</td>
                          <td>{e.email}</td>
                          <td>{e.phone}</td>
                          <td>{e.department || '-'}</td>
                        </tr>
                      )): <tr><td colSpan="4" className="text-center text-muted">No employees</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
