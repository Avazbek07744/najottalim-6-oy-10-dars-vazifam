import React, { useRef, useState } from 'react'
import https from '../axios'
import { useNavigate } from 'react-router-dom'


const Forma = () => {
    const navigate = useNavigate()
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

        const allowedColors = ['red', 'gray', 'green']
        const color = colorRef.current.value.toLowerCase()

        if (!allowedColors.includes(color)) {
            setError('Invalid color! Only red, gray, or green are allowed.')
            return
        }

        setLoader(true)
        setError('')
        setLoader(true)

        const user = {
            'name': usernameRef.current.value,
            'description': descRef.current.value,
            'color': color
        }

        https.post(`/boards/create`, user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((data) => {
                setProducts([...products, data.data])
            })
            .catch((err) => {
                if (err.message = "Request failed with status code 401") {
                    navigate('/login')
                }
                console.log(err)
                setError('Xatolik yuz berdi, iltimos qayta urinib ko‘ring.')
            })
    }

    function btn() {
        setLoader(false)
    }

    return (
        <div>
            {
                !loader &&
                <form ref={formRef} className='w-[500px] mx-auto border border-blue-900 p-6 rounded-md text-center'>
                    <h2 className='text-2xl font-bold text-blue-500 mb-5'>Create boards</h2>
                    <input defaultValue={'azizbek'} ref={usernameRef} className='w-full border border-blue-600 mt-2 p-3 rounded-md' type="text" placeholder='Enter name...' />
                    <input defaultValue={'salom'} ref={descRef} className='w-full border border-blue-600 mt-2 p-3 rounded-md' type="text" placeholder='Enter description...' />
                    <input defaultValue={'red'} ref={colorRef} className='w-full border border-blue-600 mt-2 p-3 rounded-md' placeholder='Enter color...'></input>
                    {error && <p className="text-red-500">{error}</p>}
                    <button disabled={loader} onClick={handleAddCard} className='text-white bg-blue-500 px-7 py-2 mt-3 rounded-md w-max capitalize'>{loader ? 'loader...' : 'add card'}</button>
                </form>
            }

            {
                loader&&
                <div className='flex justify-center'>
                    <button onClick={btn} className='py-3 px-5 text-xl text-white bg-blue-500 rounded-md'>Create boards</button>
                </div>}

            <div className='flex flex-wrap gap-5 justify-center'>

                {
                    products.length > 0 && products.map((product) => {
                        return (
                            <div key={product.board.id} className='p-5 w-max bg-rose-500 text-white rounded-md mt-10 cursor-pointer'>
                                <h2 className=''>{product.board.name}</h2>
                                <h2 className=''>{product.board.description}</h2>
                                <h2>color: {product.board.color}</h2>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Forma
