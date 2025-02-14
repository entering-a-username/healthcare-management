import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumbs, Rating } from '@mui/material';

export default function View() {
  const { type, id } = useParams();

  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);

  function capitalize(string) {
    return String(string).charAt(0).toUpperCase() + String(string).slice(1);
  }

  useEffect(() => {
    async function fetchData() {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3030/api/${type}/${id}`);
            const data = await res.json();

            setFetchedData(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    fetchData();
  }, [type, id]);

  
  function formatDate(d) {
    const date = new Date(d);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function calculatePerc(ratings, total) {
    const percentages = {};
    for (const [star, count] of Object.entries(ratings)) {
      percentages[star] = (count / total) * 100;
    }

    return percentages;
  }

  const ratings = {5: 65, 4: 15, 3: 5, 2: 7, 1: 8};
  const percentages = calculatePerc(ratings, 100);

  if (loading) {
    return (
      <div className='list-page'>
        <div className="loading">Loading...</div>
      </div> 
    )
  }

  if (!fetchedData) {
    return (
      <main className="list-page">
        <div className="error-message">Failed to load data.</div>
      </main>
    );
  }

  return (
    <>
    <main className='list-page'>
        <div className="top">
            <h1>View { capitalize(type) }</h1>

            <div className="breadcrumbs">
                <Breadcrumbs aria-label="breadcrumb" className='crumb'>
                    <Link underline="hover" to={`/list/${type}`}> {capitalize(type)}s </Link>
                    <Link href={`/list/${type}`} underline="hover" color="text.primary" aria-current="page" > View { capitalize(type) } </Link>
                </Breadcrumbs>
            </div>
        </div>


        {
            type === "doctor" && 
            <div className="bottom single-bottom user">
              <h1>{capitalize(type)} Information</h1>

              <div className="top-2">
                <div className="left">
                  <div className="img">
                    <img src={fetchedData.icon} alt="" />
                  </div>
                </div>

                <div className="right">

                  <span className="title">{fetchedData.name}</span>
                  <div className="icon">{fetchedData.speciality} | {fetchedData.degree} | {fetchedData.experience} years of experience</div>

                  <div className="icon">
                      <p>{fetchedData.about}</p>
                  </div>

                  <div className="icon">
                    <span>Email: {fetchedData.email}</span>
                  </div>

                  <div className="icon">
                    <span>Phone Number: +123 456 789</span>
                  </div>

                  <div className="icon">
                    <span>Fee: {fetchedData.fee}</span>
                  </div>

                  <div className="icon">
                      <span style={{color: "green"}}>Available</span>
                  </div>

                  <div className="icon">
                    <span>Joined {formatDate(fetchedData.createdAt)}</span>
                  </div>
          
                </div>
              </div>

              <div className="bottom-2">
                  <div className="ratings">
                    <div>
                      <h1>Rating Analytics</h1>
                      <div>
                        <Rating value={Math.ceil(4)} />
                        <span>567 reviews</span>
                      </div>
                    </div>

                    <div className="rating">
                      {
                        Object.entries(ratings).map(([star, count], index) => (
                          <div key={star}>
                            <span>{index + 1} star</span>
                            <div className="bar" style={{'--bar-width': `${percentages[star]}%`}}></div>
                            <span>({count})</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  <form className="review-reply">
                    <h1>Reply</h1>
                    <textarea name="" id="" placeholder='Type your reply...'></textarea>
                    <button type="submit">Reply</button>
                  </form>
              </div>
            </div>
        }
    </main>
    </>
  )
}
