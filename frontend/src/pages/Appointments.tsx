import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

import { Rating } from "@mui/material";
import { RiCloseLine } from '@remixicon/react';

export default function Appointments() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      setIsLoading(true);
  
      async function fetchData() {
        const res = await fetch(`http://localhost:3030/api/user/${id}`);
        const data = await res.json();
  
        setFetchedData(data);
        setIsLoading(false);
      }
  
      fetchData();
    }, [id]);

    async function removeAppointment(id) {
      const res = await fetch(`http://localhost:3030/api/appointment/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
  
      if (data.success) {
        navigate(0);
      }
    }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (!fetchedData) {
    return (
      <main className="appointments">
        <h1>You have no booked appointments</h1>
      </main>
    )
  }

  return (
    <main className="appointments">
      <div>
        <h2>Your Appointments</h2>
        <p>You have <b>{fetchedData.appointments.length}</b> {fetchedData.appointments.length !== 1 ? "appointments" : "appointment"} booked</p>
        
        <div className="cart-table">
          <div className="cart-headers">
            <div className="id">ID</div>
            <div className="doctor">DOCTOR</div>
            <div className="date">DATE</div>
            <div className="fee">PRICE</div>
            <div className="status">STATUS</div>
            <div className="remove">Remove</div>
          </div>

          {fetchedData.appointments.map((appointment, index) => 
            (<div className="cart-items" key={index}>
              <div className="cart-item">
                <div className="id">{index + 1}</div>

                <Link to={`/doctors/${appointment.docId}`} className='doctor'>
                  <div className="img-wrapper">
                    <img src={appointment.docInfo.icon} />
                  </div>
                  <div className="info">
                    <h6>{appointment.docInfo.name}</h6>
                    <Rating name="read-only" value={appointment.docInfo.rating} readOnly />
                  </div>
                </Link>
                
                <div className="date">
                  {appointment.slotDate.day} {appointment.slotDate.month} {appointment.slotDate.year} {appointment.slotTime}
                </div>

                <div className="fee">${appointment.docInfo.fee}</div>
                
                <div className="status">
                  {(fetchedData.appointments.cancelled && "CANCELLED") || (fetchedData.appointments.isCompleted && "COMPLETED") || ("PENDING")}
                </div>
                <span className="remove">
                  <RiCloseLine onClick={() => removeAppointment(appointment._id)} />
                </span>
            
              </div>
            </div>
            ))}
          
        </div>
      </div>
    </main>
  )
}
