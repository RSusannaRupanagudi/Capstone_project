import React from 'react'

export default function Dashboard() {
  return (
    <div className="bg-employee py-5">
      <div className="container">
        <div className="glass p-4 rounded-2xl">
          <h3 className="fw-bold mb-3">Employee Dashboard</h3>
          <div className="row g-3">
            {[
              {title:'Profile', desc:'View & update details', link:'/employee/profile'},
              {title:'Leave', desc:'Apply for leave & track', link:'/employee/leave'},
              {title:'Salary Slip', desc:'View monthly payslips', link:'/employee/salary-slip'},
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
