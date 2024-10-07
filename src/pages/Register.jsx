import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../axios';

const Register = () => {
    const [salom, setSalom] = useState(true);
    const FirstnameRef = useRef();
    const LastnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const FormRef = useRef();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (password) => {
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return isValid.test(password);
    };

    function validate() {
        if (FirstnameRef.current.value.length < 3) {
            alert('Username is not valid');
            FirstnameRef.current.focus();
            return false;
        }

        if (!validateEmail(emailRef.current.value)) {
            alert('Email is not valid');
            emailRef.current.focus();
            return false;
        }

        if (!validatePassword(passwordRef.current.value)) {
            alert("Parol kamida 8 ta belgidan iborat bo'lishi kerak, unda katta harf, kichik harf, raqam va maxsus belgi bo'lishi kerak.");
            passwordRef.current.focus();
            return false;
        }

        if (passwordRef.current.value !== rePasswordRef.current.value) {
            alert("Parollar mos kelmaydi");
            rePasswordRef.current.focus();
            return false;
        }

        return true;
    }

    function handleClick(e) {
        e.preventDefault();
        let isValid = validate();
        setSalom(false);

        if (!isValid) {
            return;
        }

        const user = {
            "email": emailRef.current.value,
            "firstName": FirstnameRef.current.value,
            "lastName": FirstnameRef.current.value,
            "password": passwordRef.current.value,
            "confirmPassword": rePasswordRef.current.value
        };

        http.post('/auth/register', user)
            .then((response) => {
                const data = response.data;
                if (data.message) {
                    navigate('/login');
                }
                FormRef.current.reset();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <div ref={FormRef} className='container max-w-[600px] rounded-md p-5 border border-black flex flex-col gap-5 mx-auto mt-10'>
                <input className='border border-blue-500 p-3 w-full rounded-md outline-none' ref={FirstnameRef} type="text" placeholder='Enter firstname...' />
                <input className='border border-blue-500 p-3 w-full rounded-md outline-none' ref={LastnameRef} type="text" placeholder='Enter lastname...' />
                <input className='border border-blue-500 p-3 w-full rounded-md outline-none' ref={emailRef} type="email" placeholder='Enter email...' />
                <input className='border border-blue-500 p-3 w-full rounded-md outline-none' ref={passwordRef} type="password" placeholder='Enter password...' />
                <input className='border border-blue-500 p-3 w-full rounded-md outline-none' ref={rePasswordRef} type="password" placeholder='Re-enter password...' />
                <button onClick={handleClick} className='uppercase text-2xl bg-blue-500 py-2 w-full rounded-md text-white font-bold'>{salom ? 'Register' : 'Loading...'}</button>
            </div>
        </div>
    );
}

export default Register;
