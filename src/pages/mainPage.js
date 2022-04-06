import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [loggedIn, setLogin] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if(!loggedIn) navigate("/login")
  })
 
  return (
    <div>mainPage</div>
  )
}
