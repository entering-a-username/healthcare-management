import { useEffect, useState } from 'react';

import Doctor from '../components/Doctor1';

export default function Doctors() {

  const [filterDoc, setFilterDoc] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");
  const [fetchedData, setFetchedData] = useState([]);

  const specialities = [
    "Physicians",
    "Gynecologists",
    "Dermatologists",
    "Pediatricians",
    "Neurologists",
    "Gastroenterologists"
  ];
  
  useEffect(() => {
      async function fetchData() {
          const res = await fetch(`http://localhost:3030/api/doctor?showBy=100`);
          const data = await res.json();

          setFetchedData(data.data);
          setFilterDoc(data.data);
      }
      fetchData();
  }, []);

  function applyFilter() {
    if (selectedTab) {
      setFilterDoc(fetchedData.filter(doc => doc.speciality === selectedTab));
    } else {
      setFilterDoc(fetchedData);
    }
  }

  useEffect(() => {
    applyFilter();
  }, [fetchedData, selectedTab]);

  function handleClick(spec) {
    setFilterDoc(fetchedData.filter(doc => doc.speciality === spec));
    setSelectedTab(spec);
  }

  return (
    <>
    <main className="doctors">
      <p>Browse through the doctors</p>

      <div>
        <ul>
          {specialities.map((specialit, index) => (
            <li className={selectedTab === specialit.slice(0, -1) ? "active" : ""} key={index} onClick={() => handleClick(specialit.slice(0, -1))}>
              {specialit}
            </li>
          ))}
        </ul>

        <div className='top-doctors'>
          {
            filterDoc.length !== 0 ? filterDoc.map((doctor, index) => (
              <Doctor key={index} doctor={doctor} />
            )) : (
              <span>No doctors available</span>
            )
          }
        </div>
      </div>
    </main>
    </>
  )
}
