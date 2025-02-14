import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import Doctor1 from '../components/Doctor1';

export default function Doctor() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [fetchedData, setFetchedData] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [relatedDoctors, setRelatedDoctors] = useState([]);
    
    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const res = await fetch(`http://localhost:3030/api/doctor/${id}`);
            const data = await res.json();

            setFetchedData(data);
            setAppointments(data.appointments);

            setIsLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            const res = await fetch(`http://localhost:3030/api/doctor?showBy=100`);
            const data = await res.json();
            const filter = data.data.filter(doc => doc.speciality === fetchedData.speciality);
            setRelatedDoctors(filter);

            setIsLoading(false)
        }

        fetchData();
    }, [fetchedData]);

    function get7Days() {
        const today = new Date();
        const days = [];

        for (let i = 0; days.length < 7; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);

            if (nextDay.getDay() !== 0) {
                const availableHours = getHours(nextDay);
                const isFullyBooked = availableHours.length === 0;
                days.push({
                    date: nextDay, isFullyBooked, availableHours
                })
            }
        }

        return days;
    }

    function getHours(day) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const month = months[day.getMonth()];
        const d = days[(day.getDay()) % 7];
        const date = day.getDate();
        const year = day.getFullYear();
        
        const current = new Date().getHours();
        const hours = [];
        const startHour = 9;
        const endHour = 18;

        const dayAppointments = appointments.filter(app => 
            app.slotDate.day == d &&
            app.slotDate.month == month &&
            app.slotDate.year == year &&
            app.slotDate.date == date
        )

        for (let i = startHour; i <= endHour; i++) {
            const hour = `${i}:00`;

            const isBooked = dayAppointments.some(app => app.slotTime == hour);
            const isPastHour = day.toDateString() === new Date().toDateString() && i < current;
            
            if (!isBooked && !isPastHour) {
                hours.push(hour);
            }
        }

        return hours;
    }

    const [days, setDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(days[0]);
    const [selectedHour, setSelectedHour] = useState('');
    
    useEffect(() => {
        if (!isLoading) {
            const days = get7Days();
            setDays(days);
        }
    }, [isLoading]);
    
    async function bookAppointment() {
        if (localStorage.getItem("userId") == "") {
            navigate('/login');
        }

        const formattedInfo = {
            docId: id,
            hour: selectedHour,
            day: selectedDay.date.toLocaleString('en-us', { weekday: 'long' }),
            month: selectedDay.date.toLocaleString('en-us', { month: 'long' }),
            date: selectedDay.date.getDate(),
            year: selectedDay.date.getFullYear(),
            userId: localStorage.getItem("userId"),
        };

        const res = await fetch(`http://localhost:3030/api/doctor/${id}`, {
            method: "POST",
            body: JSON.stringify(formattedInfo),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
            }
        })

        const data = await res.json();

        if (data.success === true) {
            navigate(`/appointments/${localStorage.getItem("userId")}`);
        }
    }

    function formatDate(d) {
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
       
        const date = new Date(d);

        const day = date.getDate();       
        const month = date.getMonth();  
        const year = date.getFullYear();    

        return `${day} ${months[month]}, ${year}`;
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

  return (
    <>
    <main className="single-doctor">

        {
            fetchedData.length !== 0 ? (
                <section>
                    <div className="top">
                        <div><img src={fetchedData.icon} alt="" /></div>

                        <div className="card">
                            <span style={{fontSize: "1.7em"}}>{fetchedData.name}</span> <br /> <br />
                            <span>{fetchedData.degree} | {fetchedData.speciality}</span>
                            <span style={{borderRadius: "10px", border: "1px solid rgba(0, 0, 0, .2)", padding: "7px", marginLeft: "10px"}}>{fetchedData.experience} Years of Experience</span> <br /> <br />
                            <span style={{fontWeight: "bold", fontSize: "1.2em"}}>About</span>
                            <p>{fetchedData.about}</p> <br />
                            <span style={{fontWeight: "600"}}>Appointment fee: ${fetchedData.fee}</span>
                        </div>
                    </div>

                    <div className="bottom">
                        <h1>Booking Slots</h1>

                        <ul className='schedule'>
                            {
                                days.length !== 0 && days.map((day, index) => (
                                    <li className={selectedDay === day ? "active" : ""} key={index}>
                                        <div onClick={() => setSelectedDay(day)}>
                                            <h3>
                                                {formatDate(day.date)}
                                            </h3>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>

                        {
                            selectedDay &&  (
                                <ul className='hours'>
                                    {selectedDay.availableHours.length !== 0 ? selectedDay.availableHours.map((hour, index) => (
                                        <li key={index} className={selectedHour === hour ? "active" : ""} onClick={() => setSelectedHour(hour)}>{hour}</li>
                                    )) : (<li>No Available Hours</li>)}
                                </ul>
                            )
                        }

                        <button onClick={bookAppointment}>Book an Appointment</button>
                    </div>
                    
                    <h1>Related Doctors</h1>
                    <span>Scroll through more doctors of this speciality</span>

                    <div className="related-doctors">
                        {
                            relatedDoctors.length !== 0 && relatedDoctors.map((doc, index) => (
                                <Doctor1 key={index} doctor={doc} />
                            ))
                        }
                    </div>
                </section>
            ) : (
                <h1>This doctor doesn't exist</h1>
            )
        }
    </main>
    </>
  )
}
