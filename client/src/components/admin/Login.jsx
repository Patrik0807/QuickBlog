import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
//simport { data } from 'react-router-dom';

const Login = () => {
    const { axios, setToken } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/admin/login', { email, password })
            if (data.success) {
                setToken(data.token)
                localStorage.setItem('token', data.token)
                axios.defaults.headers.common['Authorization'] = data.token;
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (

        <div className='flex items-center justify-center h-screen'>
            {/* Demo credentials + work notice */}
            <div className="mt-6 w-50px text-center bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-300 rounded-xl p-4 shadow-md mr-30">
                <h2 className="text-lg font-semibold text-blue-700 mb-2">
                    🚧 Work In Progress
                </h2>
                <p className="text-sm text-gray-700">
                    We're still building out features and polishing the admin dashboard. <br />
                    Meanwhile, you can log in using guest/demo credentials below:
                </p>
                <div className="mt-3 bg-white/80 rounded-lg p-3 border border-dashed border-gray-300 inline-block shadow-sm">
                    <p className="text-sm text-gray-800">
                        ✉️ <strong>Email:</strong> <code className="text-blue-700">demo@admin.com</code>
                    </p>
                    <p className="text-sm text-gray-800">
                        🔐 <strong>Password:</strong> <code className="text-blue-700">demo123</code>
                    </p>
                </div>
                <p className="mt-2 text-xs text-gray-500 italic">Feel free to explore! Changes made by demo admin won't persist.</p>
                <p className="mt-2 text-xs text-gray-500 italic"><p className="mt-2 text-xs text-gray-500 italic"> ⚠️ Note: Demo admin can only add new blogs. Other actions are restricted.</p></p>
            </div>

            <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-full py-6 text-center'>
                        <h1 className='text-3xl font-bold'><span className='text-primary'>Admin </span> Login</h1>
                        <p className='font-light'>Enter your credentials to access the admin panel</p>
                    </div>
                    <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
                        <div className='flex flex-col'>
                            <label > Email</label>
                            <input onChange={e => setEmail(e.target.value)} value={email}
                                type="email" required placeholder='your email id' className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
                        </div>
                        <div className='flex flex-col'>
                            <label > Password</label>
                            <input onChange={e => setPassword(e.target.value)} value={password}
                                type="password" required placeholder='your password' className='border-b-2 border-gray-300 p-2 outline-none mb-6' />
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setEmail('demo@admin.com');
                                setPassword('demo123');
                            }}
                            className="mb-4 w-full py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                        >
                            Autofill Demo Admin Login
                        </button>
                        <button type='submit' className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'>Login</button>
                    </form>
                    {/* <div className='w-full py-6 text-center'>
                        <h1 className='text-3xl font-bold'><span className='text-primary'>Admin </span> Login</h1>
                        <p className='font-light'>Enter your credentials to access the admin panel</p>

                        Demo credentials info */}
                        {/* <p className="mt-2 text-sm text-gray-500">
                            🧪 Demo Admin Login: <br />
                            Email: <code>demo@admin.com</code> | Password: <code>demo123</code>
                        </p>

                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default Login