import './App.css';
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoadingPage from './pages/loadingPage'

const MainPage = lazy(() => import("./pages/mainPage"));
const LoginPage = lazy(() => import("./pages/loginPage"));
const SignUpPage = lazy(() => import("./pages/signUpPage"));

function App() {

  return (
    <Suspense fallback={<LoadingPage />}>
    <Router>
      <Routes>
        <Route path="/" element={ <MainPage /> } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </Router>
    </Suspense>
  );
}

export default App;
