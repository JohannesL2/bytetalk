import React, { useEffect } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import Footer from '../components/Footer'

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  return (
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-t-3xl px-4">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
           <div className="flex flex-col justify-start pt-12">
                <div className='flex items-center justify-center'>
                <img src="/logo.png" alt="ByteChat Logo" className='size-30 rounded-2xl shadow-lg transition-transform duration-700 hover:scale-105 hover:rotate-1 cursor-pointer' onClick={() => window.location.reload()}/>
            <h1 className="mb-4 text-4xl font-semibold leading-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome to ByteTalk</h1>
                              </div>
            <p className="mb-6 text-lg font-normal text-gray-600 lg:text-xl dark:text-gray-400 max-w-lg mx-auto lg:mx-0">Please log in to continue your conversations and stay in touch with your friends.</p>
            <a href="#readmore" className="group mt-6 inline-flex items-center text-lg font-medium text-gray-800 hover:text-black transition-colors">Read more about our app 
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
          </div>
          <div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sign In
                </h2>
                <p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>Welcome back. Please enter your credentials to access your account.</p>
      <Login/>

      <div className='pt-6 border-t border-gray-900 dark:border-gray-700'>
                              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Register
                </h2>
                <p className='mt-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400'>New here? Create an account to start connecting with others on ByteTalk.</p>
      <Register/>
      </div>
      </div>
      </div>
      </div>
      </section>
            <section id='readmore' className='py-28 bg-white'>
        <div className='max-w-3xl mx-auto text-center space-y-6 fade-in'>
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900">About ByteTalk</h2>
        <p className='text-lg text-gray-600 leading-relaxed'>ByteChat is a modern, real-time messaging platform built for seamless communication and meaningful connections. Powered by the robust and secure Chatify API, our app delivers lightning-fast conversations, smooth authentication, and a user-friendly interface that makes chatting intuitive and enjoyable.

Whether you're reconnecting with old friends or building new communities, ByteTalk gives you the tools to stay engaged—anytime, anywhere. Our mission is simple: to create a chat experience that’s fast, reliable, and personal.</p>

</div>
      </section>
                  <Footer/>
    </div>
  )
}

export default HomePage