import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';

import { columnsInfo } from "../info/columns";

import { RiEyeFill } from '@remixicon/react';


export default function Table1({ type, showBy }) {
    const columns = columnsInfo[type] || [];

    const [fetchedData, setFetchedData] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`http://localhost:3030/api/${type}/?showBy=${showBy}`);
                const data = await res.json();
                
                setFetchedData(data);
                setPage(data.page)
                
            } catch (error) {
              console.error(error);
            }
        }

        fetchData();
    }, []);
    
    // pagination
    async function handleChange(e, value: number) {
        const res = await fetch(`http://localhost:3030/api/${type}?page=${value}&showBy=${showBy}`);
        const data = await res.json();
        // setIsSnackbarOpen(true);

        if (data) {
            setFetchedData(data);
            setPage(value);
        }
    } 

    function formatDate(d: Date) {
        const date = new Date(d);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

  return (
    <>
    
        <table className={type}>
            <thead>
                <tr>
                    {
                        columns?.header?.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))
                    }
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    fetchedData.data?.length > 0 && fetchedData.data?.map((item, index) => (
                        <tr key={index}>
                            {
                                columns.fields?.map(column => (
                                    <td key={column}>
                                        {column === "icon" ? (
                                            <img src={item[column]} alt="" />
                                        ) : column === "about" ? (`${item[column].slice(0, 59)}...`) : column === "createdAt" || column === "updatedAt" ? formatDate(item[column])
                                        : column === "available" ? (
                                            <span>{item[column] ? "TRUE" : "FALSE"}</span>
                                        ) : (item[column] || (index + 1 + (page - 1) * showBy))}
                                    </td>
                                ))
                            }  

                            <td className='actions'>
                                {(type === "doctor" || type === "admin" || type === "user") && <div><Link to={`/${type}/${item._id}`}><RiEyeFill /></Link></div>}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

        <Pagination page={page} count={fetchedData?.totalPages} color="primary" className='pagination'
            showFirstButton showLastButton onChange={handleChange} />
    </>
  )
}
