import React, { useRef, useState } from 'react'
import https from '../axios'

const Myborts = ({func2}) => {
    const borts = func2
    console.log(func2);
    
    const [products, setProducts] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState('')
    const formRef = useRef()
    const usernameRef = useRef()
    const descRef = useRef()
    const colorRef = useRef()

    function handleAddCard(e) {
        e.preventDefault()

        setError('')
        setLoader(true)

        const user = {
            'name': usernameRef.current.value,
            'description': descRef.current.value,
            'color': color
        }

        https.post(`/boards/my-boards`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((data) => {
                console.log(data)
                setProducts([...products, data.data])
            })
            .catch((err) => {
                console.log(err)
                setError('Xatolik yuz berdi, iltimos qayta urinib ko‘ring.')
            })
            .finally(() => {
                setLoader(false)
            })
    }


    return (
        <div>
            <form ref={formRef} className='w-[500px] mx-auto border border-blue-900 p-6 rounded-md text-center'>
                <input ref={usernameRef} className='w-full border border-blue-600 mt-2 p-3 rounded-md' type="text" placeholder='Enter name...' />
                <input ref={descRef} className='w-full border border-blue-600 mt-2 p-3 rounded-md' type="text" placeholder='Enter description...' />
                <input ref={colorRef} className='w-full border border-blue-600 mt-2 p-3 rounded-md' placeholder='Enter color...'></input>
                {error && <p className="text-red-500">{error}</p>}
                <button disabled={loader} onClick={handleAddCard} className='text-white bg-blue-500 px-7 py-2 mt-3 rounded-md w-max capitalize'>{loader ? 'loader...' : 'add card'}</button>
            </form>
        </div>
    )
}


export default Myborts
