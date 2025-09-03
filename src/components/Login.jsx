import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    csrfToken: '' // TODO: BYT UT! fetch PATCH mot /csrf
  })

useEffect(() => {
  const fetchCsrf = async () => {
    try {
      const res = await fetch("https://chatify-api.up.railway.app/csrf", { method: "PATCH" });
      const data = await res.json();
      setForm(prev => ({ ...prev, csrfToken: data.csrfToken }));
      console.log(data.csrfToken);
    } catch (err) {
      console.error(err);
    }
  }
  fetchCsrf();
}, [])
  

  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

      if (!form.username || !form.password) {
    setMessage('Fyll i både användarnamn och lösenord');
    return;
  }
  try {
    const res = await fetch("https://chatify-api.up.railway.app/auth/token", {
  method: "POST",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(form),
});

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('jwt', data.token)
        setMessage('Inloggningen lyckades!');
        navigate('/chat');
      } else {
        setMessage(data.message || 'Fel användarnamn eller lösenord')
      }
    } catch (err) {
      setMessage(`Inloggningen misslyckades: ${err.message}`)
    }
  }

  return (
    <div className='w-full max-w-md p-8 bg-white rounded-2xl shadow-xl mx-auto mt-10'>

      <form onSubmit={handleSubmit} className="space-y-5">
      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="username">Username</label>
      <input onChange={handleChange} value={form.username} className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500' name='username' type="text" placeholder="Username" autocomplete="off"/>

      <br />

      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="password">Password</label>
      <input onChange={handleChange} value={form.password} className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500' name='password' type="password" placeholder="Password"/>
<br />
      <button type='submit' className='w-full py-3 rounded-xl bg-gray-900 text-white font-medium text-center rounded-lg hover:bg-gray-800 transition-colors shadow-md cursor-pointer'>Login</button>
      </form>

      {message && <p className='mt-2 text-sm text-red-500'>{message}</p>}
    </div>
  )
}

export default Login