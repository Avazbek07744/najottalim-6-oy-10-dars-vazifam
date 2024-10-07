import React, { useState } from 'react'
import Forma from './Forma'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const navigate= useNavigate()

    function myBoard(){
        navigate('/my-borts')
    }

    return (
        <div>
            <div className='flex justify-center'>
                <button onClick={myBoard} className='py-3 px-5 text-xl text-white bg-blue-500 rounded-md mb-10'>Mybords</button>
            </div>
            <Forma />

        </div>
    )
}

export default Home
