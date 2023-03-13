import React from 'react'
import { useLocalStorage } from '../../hooks';
import { Dashboard } from '../Dashboard';
import { Login } from '../Login';

const Home = () => {
  const [token] = useLocalStorage('token', '')
  console.log(token)
  return (
    <>
      {!token ? <Login /> : <Dashboard />}
    </>
  )
}

export default Home