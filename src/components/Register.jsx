import React, { useState } from 'react'

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    avatar: 'https://file-examples.com/storage/fe51206d8668b736ba01d14/2017/10/file_example_PNG_2100kB.png',
  })

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const csrfRes = await fetch('https://chatify-api.up.railway.app/csrf', {
        method: 'PATCH',
        credentials: 'include',
      });
      const csrfData = await csrfRes.json();
      const csrfToken = csrfData.csrfToken;

      const formWithToken = { ...form, csrfToken };

      const res = await fetch('https://chatify-api.up.railway.app/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formWithToken)
      })

      const data = await res.json();
      console.log('Registrering lyckades', data)
    } catch (err) {
      console.error('Registrering misslyckades', err);
    }
  }

  return (
    <div className='w-full max-w-md p-8 bg-white rounded-2xl shadow-xl mx-auto mt-10'>

      <form onSubmit={handleSubmit} className="space-y-5">
      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="username">Username</label>
      <input onChange={handleChange} value={form.username} className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500' name='username' type="text" placeholder="Choose a username"/>

      <br />

      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="email">Email</label>
      <input onChange={handleChange} value={form.email} className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500' name='email' type="email" placeholder="Enter your email"/>

      <br />

      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="password">Password</label>
      <input onChange={handleChange} value={form.password} className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500' name='password' type="password" placeholder="Create a password"/>
      <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500">We’ll never share your details. Read our <a href="" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p>
<br />
      <button type='submit' className='w-full py-3 rounded-xl bg-gray-900 text-white font-medium text-center rounded-lg hover:bg-gray-800 transition-colors shadow-md cursor-pointer'>Register</button>
      </form>
      
    </div>
  )
}

export default Register