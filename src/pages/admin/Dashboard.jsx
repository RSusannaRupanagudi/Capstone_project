import React from 'react'

export default function Dashboard() {
  return (
    <div className="bg-admin py-5">
      <div className="container">
        <div className="glass p-4 rounded-2xl">
          <h3 className="fw-bold mb-3">Admin Dashboard</h3>
          <div className="row g-3">
            {[
              {title:'Employees', desc:'Manage employee records', link:'/admin/employees'},
              {title:'Departments', desc:'Create & edit departments', link:'/admin/departments'},
              {title:'Jobs', desc:'Manage job roles', link:'/admin/jobs'},
              {title:'Payroll', desc:'Create & process runs', link:'/admin/payroll'},
              {title:'Leave', desc:'Approve or reject requests', link:'/admin/leave'},
              {title:'Reports', desc:'Payroll & department costs', link:'/admin/reports'},
            ].map((c,idx)=>(
              <div className="col-12 col-md-6 col-lg-4" key={idx}>
                <a href={c.link} className="text-decoration-none text-dark">
                  <div className="card card-hover h-100">
                    <div className="card-body">
                      <h5 className="card-title">{c.title}</h5>
                      <p className="card-text text-muted">{c.desc}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
