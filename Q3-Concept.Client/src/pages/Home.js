import './Home.css'

import GraphCards from '../Components/GraphCards';
import React from 'react'
import { useState } from 'react';

function Home() {
    const [cards] = useState([

        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        },
        {
            id: 4,
        }
    ]);

    return (
        <div className = 'container'>
            <GraphCards Cards={cards} />
        </div>
    )
}

export default Home