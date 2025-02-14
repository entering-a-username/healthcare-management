import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Doctor1({ doctor }) {
  console.log(doctor)
  
  return (
    <Link className='doctor-card' onClick={() => scrollTo(0, 0)} to={`/doctors/${doctor._id}`}>
        <div><img src={doctor.icon} alt="" /></div>
        <div>
          <span>Available</span>
          <p>{doctor.name}</p>
          <p>{doctor.speciality}</p>
        </div>
    </Link>
  )
}
