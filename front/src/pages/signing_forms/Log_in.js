import React from 'react'
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

export default function Log_in() {

    const [showPassword, setShowPassword] = React.useState(false)
    const [err, setErr] = React.useState(false)
    const [values, setValues] = React.useState({ password: '', email: '' });
    const navigate = useNavigate()

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

      // const successfullyLoggedIn = (token, callback) => {
      //   localStorage.setItem('token', token);
      //   callback();
      // }

      const login = () => {
        axios.post('http://localhost:8080/log/login', values).then( res => {
            setErr(false)
            console.log(res.data) 
            localStorage.setItem('token', res.data.token)
            res.data.role == 'branch' ?
            navigate(`/dash/${res.data.dbUser.admin}/${res.data.dbUser._id}`)
          : navigate(`/dash/${res.data.dbUser._id}`)
        }
        ).catch(
            function (error) {
              console.log(error)
              setErr(true)
           }
          )
      };
    
      
    return (
        <div className='log_in_page' dir='ltr'>
           <div className='log_in_div'>
               <div className='quick_log_in_div'>
                  <h4>Login</h4>
                  <div style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
                      <TwitterIcon sx={{color: 'white'}}/>
                      <FacebookIcon sx={{color: 'white'}}/>
                      <GoogleIcon sx={{color: 'white'}}/>
                  </div>
               </div>
               <p>Or Be Classical</p>
               <div className='form_div'>
               <TextField focused={err} onChange={handleChange('email')} size='small' sx={{width: '290px', mt: '20px'}} type='email' color={err ? 'error' : 'secondary'} id="standard-basic" label="Email" variant="standard"/>
               <FormControl focused={err} sx={{width: '290px', mt: '20px', mb: 8}} color={err ? 'error' : 'secondary'} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>  


        <br/>
        <Link to='/signup' style={{marginTop: '50px'}}>Sign Up</Link><br/>
        <Button onClick={()=> login()} size='large' sx={{width: '200px', mt: 1}} color='secondary' variant="text">Get Started</Button>

            
           </div>
           </div>
        </div>
    )
}
