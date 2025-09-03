import React, { useEffect, useState } from 'react'
import { getMe } from '../../services/api'

export default function Profile() {
  const [me, setMe] = useState(null)
  useEffect(()=>{ (async()=>{ try { const {data}=await getMe(); setMe(data) } catch {} })() }, [])

  return (
    <div className="container py-4">
      <div className="card"><div className="card-body">
        <h5>My Profile</h5>
        <pre className="bg-light p-3 rounded">{JSON.stringify(me, null, 2)}</pre>
      </div></div>
    </div>
  )
}
