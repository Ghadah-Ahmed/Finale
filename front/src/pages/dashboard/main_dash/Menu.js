import React from 'react'
import Sections from './Sections'
import StickyHeadTable from './StickyHeadTable'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PreviewIcon from '@mui/icons-material/Preview';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';


const Input = styled('input')({
  display: 'none',
});

export default function Menu() {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
      };
    
    return (
        <div className='orders_container'>
            <div className='branch_statistics'>
                <div style={{width: '450px'}} className='dash_div'>
                <form style={{display: 'flex', justifyContent: 'space-around', alignItems:'center'}}>
                    <div>
                        <TextField id="standard-basic" label="Name"  color="secondary" variant="standard" sx={{width: '200px'}} /><br/>
                        <TextField id="standard-basic" label="Description"  color="secondary" variant="standard" sx={{width: '200px'}} />
                        <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file"  multiple type="file" />
                        <Button variant="contained"  sx={{backgroundColor: '#bdbdbd', width: '200px', m: 1}} color="secondary" component="span">
                            Upload Image ‎&nbsp;‎ <PhotoCamera />
                        </Button>
                        </label>                 
                    </div>
                    <Stack direction="column" spacing={1}>
                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton  aria-label="add an alarm">
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton color="secondary" aria-label="add to shopping cart">
                        <AddCircleOutlinedIcon />
                      </IconButton>
                  </Stack>                </form>
                </div>
                <div className='dash_div'>
                    <Sections/>
                </div>
            </div>
            <div className='branch_statistics'>
            <div style={{ height: '65vh'}} className='dash_div'>
            <h3 style={{textAlign: 'center', margin: '0', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.04)', borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>Menu</h3>
                <StickyHeadTable/>
            </div>
            <div style={{ height: '65vh', width: '550px'}} className='dash_div'>
            <form >
            <h3 style={{textAlign: 'center', margin: '0', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.04)', borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>New Dish</h3>

            <TextField id="outlined-basic"
                label="Name" variant="outlined" 
                color="secondary"
                sx={{width: '300px', marginTop: '20px'}} 
                InputLabelProps={{
                    shrink: true,
            }}/>

                <TextField
                    id="filled-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue=""
                    color="secondary"
                    sx={{width: '300px', marginTop: '20px'}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <div style={{maxWidth:'100%', display:'flex', justifyContent:'center'}}>
                 <TextField
                    id="outlined-number"
                    label="Price"
                    type="number"
                    sx={{ mt: 2, width: 120}}
                    color="secondary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                            />
    
                <FormControl sx={{ mt: 2, ml: 1, minWidth: 170 }}>
                    <InputLabel 
                        color="secondary"
                        id="demo-simple-select-autowidth-label">
                        Section
                    </InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={age}
                    onChange={handleChange}
                    color="secondary"
                    label="Section"
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={10}>Dinner</MenuItem>
                        <MenuItem value={21}>Coffee</MenuItem>
                        <MenuItem value={22}>Breakfast</MenuItem>
                    </Select>
                </FormControl>
                </div>



                <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file"  multiple type="file" />
                <Button variant="contained"  sx={{backgroundColor: '#bdbdbd', width: '300px', marginTop: '20px'}} color="secondary" component="span">
                    Upload Image ‎&nbsp;‎ <PhotoCamera />
                </Button>
                </label>


               <br/> <Button  sx={{width: '300px', marginTop: '20px'}} color="secondary" variant="contained">POST</Button>  
            </form>
            </div>   
            </div>
        </div>
    )
}
