import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Table1 from '../components/Table1';

import { Select, MenuItem} from '@mui/material';


export default function Table() {
    const { type } = useParams();

    const [showBy, setShowBy] = useState(5);

    function capitalize(string) {
        return String(string).charAt(0).toUpperCase() + String(string).slice(1);
    }

    function handleSelect(e) {
        setShowBy(e.target.value);
    }

  return (
    <>

    <main className='list-page'>
        <div className="top">
            <h1>{capitalize(type)} List</h1>
        </div>


        <div className="bottom">
            <div className="info">
                <h1>All {type}s</h1>
                
                <div className="filter">
                    <div className="left">
                        <div className="show-by">
                            <span>Show by</span>
                            <Select value={showBy} label='show-by' onChange={handleSelect}>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="table">
                    <div>
                        <Table1 type={type} showBy={showBy} />
                    </div>
                </div>

            </div>
        </div>
    </main>
    </>
  )
}
