import React from 'react'
import { Container } from '@mui/material';
import '../App.css';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { API_URI } from '../config';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './loadingPage'
import Zoom from '@mui/material/Zoom';
import Alert from '@mui/material/Alert';

export default function SignUp() {
  const navigate = useNavigate()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPwd, setConfirmPwd] = React.useState('')
  const [error, setError] = React.useState(false)
  const [errorText, setErrorText] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  function handleUsername(e) {
    setUsername(e.target.value.replace(/[^a-zA-Z/d]/, '').toLowerCase())
    setError(false)
    setErrorText('')
  }
  function handlePassword(e) {
    setPassword(e.target.value)
    setError(false)
    setErrorText('')
  }
  function handleConfirmPwd(e) {
    setConfirmPwd(e.target.value)
  }

  function signUp() {
    setLoading(true)
    axios.defaults.baseURL = API_URI
    if (password.length < 3) {
      setError(true)
      setErrorText('Password: minimum 3 characters')
      setLoading(false)
      return
    }
    if (password === confirmPwd && password !== '' && confirmPwd !== '' && username !== '') {
      axios.post('/sign-up', {
        username: username,
        password: password
      })
        .then(function (res) {
          localStorage.setItem('token', res.data)
          if (res.status === 200) {
            navigate('/')
          }
        })
        .catch(function (error) {
          setError(true)
          setErrorText('Username already taken')
          setLoading(false)
        });
    } else {
      setLoading(false)
      setError(true)
      setErrorText('Invalid username/password')
    }
  }

  return (
    <div className='wrapper'>
      {isLoading? <LoadingPage />
      :
        <Container maxWidth='sm' sx={{
          backgroundColor: 'rgb(220, 220, 220)', borderRadius: '10px', minHeight: '40vh',
          margin: '2vh', boxShadow: 'rgba(214, 230, 237, 0.12) 0px 2px 4px 0px, rgba(214, 230, 237, 0.32) 0px 2px 16px 0px;', padding: '10px'
          , display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
        }}>
          <Typography variant='h2' align='center' sx={{ fontWeight: '400', mb: 1 }}>
            Sign-up
          </Typography>
          <Divider />
          {error ?
            <Zoom in={error}>
              <Alert sx={{m: 1}} severity="error" action={
                <Button color="inherit" size="small" onClick={() => setError(false)}>
                  Close
                </Button>
              }
              >
                {errorText}
              </Alert>
            </Zoom>
            : null}
          <Box
            component="form"
            sx={{
              width: '45%', m: '20px auto', gap: 2, display: 'flex', flexWrap: 'wrap'
            }}
          >
            <TextField
              id="username"
              label="Username"
              value={username}
              onChange={handleUsername}
              fullWidth={true}
              autoComplete="current-username"
              required
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={handlePassword}
              fullWidth={true}
              autoComplete="current-password"
              required
            />
            <TextField
              id="confirmPwd"
              label="Confirm password"
              type='password'
              value={confirmPwd}
              onChange={handleConfirmPwd}
              fullWidth={true}
              autoComplete="current-password"
              required
            />
            <Button variant="contained" color='success' fullWidth={true} size='large' onClick={signUp}>Sign-up</Button>
          </Box>
          <Divider />
          <Button variant="outlined" size='large' sx={{ display: 'block', m: '20px auto' }} href="/login">Back</Button>
        </Container>
}
    </div>
  )
}
