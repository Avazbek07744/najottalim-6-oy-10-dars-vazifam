import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import http from '../axios'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const formRef = useRef()
    const navigate = useNavigate()

    function hendelSubmit(e) {
        e.preventDefault()

        const userForm = {
            'email': emailRef.current.value,
            'password': passwordRef.current.value
        }

        setLoading(true)

        http.post('/auth/login', userForm)
            .then((response) => {
                const data = response.data;

                if (data.message == 'User Not found') {
                    alert("Username yoki parol noto'g'ri");
                }

                if (data) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data));
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log(error);
                alert('Login muvaffaqiyatsiz yakunlandi.');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div>
            <form ref={formRef} onSubmit={hendelSubmit} className='w-1/3 p-5 flex flex-col mx-auto gap-5 border border-blue-500 rounded-md mt-10'>
                <input defaultValue={'javazbek@gmail.com'} className='w-full p-2 border rounded-md' ref={emailRef} type="text" placeholder='Enter email...' />
                <input defaultValue={'123456Az!'} className='w-full p-2 border rounded-md' ref={passwordRef} type="password" placeholder='Enter password...' />
                <button disabled={loading} className='bg-blue-500 py-2 w-full rounded-md text-white text-xl'>{loading ? 'Loading...' : 'Login'}</button>
                <Link to='/register'>Register ga o'tish</Link>
            </form>
        </div>
    )
}

export default Login;
