import React from 'react'
import { Container } from '@mui/material';
import '../App.css';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    function handleUsername(e) {
        setUsername(e.target.value)
      }
      function handlePassword(e) {
        setPassword(e.target.value)
      }
      function logIn() {
        if (password !== '' && username !== '') {
          axios.post('http://localhost:8080/log-in', {
            username: username,
            password: password,
          })
            .then(function (res) {
              console.log(res)
            })
            .catch(function (error) {
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
              <Typography variant='h2' align='center' sx={{ fontWeight: '400', mb: { xs: 1, sm: 0 } }}>
                Login
              </Typography>
              <Divider />
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
                <Button variant="contained" fullWidth={true} size='large' onClick={logIn}>Login</Button>
              </Box>
              <Divider />
              <Button variant="outlined" size='large' sx={{ display: 'block', m: '20px auto' }} href="/sign-up">Sign-up</Button>
            </Container>
            </div>
      )
}