import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Speciality from '../components/Speciality';
import Doctor from '../components/Doctor1';

import { specialityData } from '../assets/specialities';

export default function Home() {

    const navigate = useNavigate();

    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:3030/api/doctor`);
            const data = await res.json();

            setFetchedData(data.data);
        }
        fetchData();
    }, []);


  return (
    <main className="home">
        <Header />

        <div id="speciality" className="speciality">
            <h1>Find by Speciality</h1>
            <p>Browse through our array of specialities</p>

            <div>{
                specialityData.map((speciality, index) => (
                    <Speciality key={index} speciality={speciality} />
                ))
            }</div>
        </div>

        <div className="top-doctors">
            <h1>Top Doctors to Book</h1>

            <div>
                {
                    fetchedData.slice(0, 10).map((doctor, index) => (
                        <Doctor key={index} index={index} doctor={doctor} />
                    ))
                }
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0,0); }}>more</button>
        </div>

        <div className="banner">
            <div className="left">
                <p>Create an account to book appointments with +30 trusted doctors!</p>

                <a href="/signup">
                    Create Account
                </a>
            </div>

            <div className="right">
                <img src={`/src/assets/assets_frontend/appointment_img.png`} alt="" />
            </div>
        </div>
        
    </main>
  )
}
