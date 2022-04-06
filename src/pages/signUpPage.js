import React from 'react'
import { Container } from '@mui/material';
import '../App.css';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function SignUp() {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPwd, setConfirmPwd] = React.useState('')
  const [userSuccess, setUserSuccess] = React.useState(false)
  const [usernameError, setUsernameError] = React.useState(false)
  const [usernameErrorText, setUsernameErrorText] = React.useState('')

  function handleUsername(e) {
    setUsername(e.target.value)
    setUsernameError(false)
    setUsernameErrorText('')
  }
  function handlePassword(e) {
    setPassword(e.target.value)
  }
  function handleConfirmPwd(e) {
    setConfirmPwd(e.target.value)
  }

  function signUp() {
    if (password === confirmPwd && password !== '' && confirmPwd !== '' && username !== '') {
      axios.post('http://localhost:8080/sign-up', {
        username: username,
        password: password
      })
        .then(function (res) {
          if (res.status === 200) {
            setUserSuccess(true)
            setUsername('')
            setPassword('')
            setConfirmPwd('')
          }
        })
        .catch(function (error) {
          setUsernameError(true)
          setUsernameErrorText('Username already taken')
          console.log(error);
        });
    } else {
      alert('Try again')
    }
  }

  return (

    <div className='wrapper'>
        <Container maxWidth='sm' sx={{
          backgroundColor: 'rgb(220, 220, 220)', borderRadius: '10px', minHeight: '40vh',
          margin: '2vh', boxShadow: 'rgba(214, 230, 237, 0.12) 0px 2px 4px 0px, rgba(214, 230, 237, 0.32) 0px 2px 16px 0px;', padding: '10px'
          , display: 'flex', flexDirection: 'column', justifyContent: 'space-around'
        }}>
          <Typography variant='h2' align='center' sx={{ fontWeight: '400', mb: 1 }}>
            Sign-up
          </Typography>
          <Divider />
          <Box
            component="form"
            sx={{
              width: '45%', m: '20px auto', gap: 2, display: 'flex', flexWrap: 'wrap'
            }}
          >
            {userSuccess
              &&
              <Typography className='created' variant='h6' align='center' sx={{ fontWeight: '300', mb: 1, color: 'green', width: '100%', borderBottom: '1px solid green' }}>
                User created!
              </Typography>}
            <TextField
              error={usernameError}
              helperText={usernameErrorText}
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
    </div>
  )
}
