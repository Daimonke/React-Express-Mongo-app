import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import SignUpPage from './pages/signUpPage'

function App() {
  const [loggedIn, setLogin] = useState(false)
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
