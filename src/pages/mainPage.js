import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { API_URI } from '../config';

export default function MainPage() {
  const navigate = useNavigate();
  const [loginToken, setToken] = useState(false)
  function logOut() {
    localStorage.removeItem('token');
    navigate("/login");
  }
  useEffect(() => {
    axios.defaults.baseURL = API_URI
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.post('/verify', { token: token })
      .then((res) => {
        if (res.status === 200) {
          setToken(res.data)
        }
      })
      .catch((err) => {
        localStorage.removeItem('token');
        navigate("/login");
        console.log(err)
      });
  }, [navigate])

  return (
    <div>mainPage
      <Button onClick={logOut}>Logout</Button>
    </div>
  )
}
