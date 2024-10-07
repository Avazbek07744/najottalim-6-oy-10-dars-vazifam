import React, { useEffect, useState } from 'react'
import https from '../axios'

const Myborts = () => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [boarts, setBoarts] = useState()
    useEffect(() => {
        https.get(`/boards/my-boards`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((data) => {
                setBoarts(data.data.boards)
            })
            .catch((err) => {
                console.log(err)
                setError('Xatolik yuz berdi, iltimos qayta urinib ko‘ring.')
            })
    }, [])


    return (
        <div>
            <div className='flex flex-wrap gap-5 justify-center'>

                {
                    boarts && boarts.map((boart) => {
                        console.log(boart);
                        
                        return (
                            <div key={boart.id} className='p-5 w-max bg-rose-500 text-white rounded-md mt-10 cursor-pointer'>
                                <h2 className=''>{boart.name}</h2>
                                <h2 className=''>{boart.description}</h2>
                                <h2>color: {boart.color}</h2>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}


export default Myborts
