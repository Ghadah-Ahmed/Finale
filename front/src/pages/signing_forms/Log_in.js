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

export default function Log_in() {

    const [values, setValues] = React.useState({
        name: '',
        password: '',
        email: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
               <TextField size='small' sx={{width: '290px', mt: '20px'}} color='secondary' id="standard-basic" label="Name" variant="standard" />
               <TextField size='small' sx={{width: '290px', mt: '20px'}} type='email' color='secondary' id="standard-basic" label="Email" variant="standard"/>
               <FormControl sx={{width: '290px', mt: '20px'}} color='secondary' variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>  

        <Button size='large' sx={{width: '200px', mt: '40px'}} color='secondary' variant="text">Get Started</Button>
      
            
           </div>
           </div>
        </div>
    )
}
