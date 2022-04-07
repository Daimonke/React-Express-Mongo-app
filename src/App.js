import './App.css';
import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import SignUpPage from './pages/signUpPage'
import LoadingPage from './pages/loadingPage'
import MainPage from './pages/mainPage'

function App() {

  return (
    <Suspense fallback={<LoadingPage />}>
    <Router>
      <Routes>
        <Route path="/" element={ <MainPage verify={useEffect} /> } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </Router>
    </Suspense>
  );
}

export default App;
