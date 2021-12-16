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
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import axios from 'axios';


const Input = styled('input')({
  display: 'none',
});

export default function Menu() {
    const [sectionID, setSectionID] = React.useState('');
    const [rows, setRows] = React.useState([])

    const [sectionImage, setSectionImage] = React.useState('https://freelance.sa/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png')
  
    const uploadImage = async e => {
      const files = e.target.files
      const data = new FormData()
      data.append('file', files[0])
      data.append('upload_preset', 'images')
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/det8kbepq/image/upload',
        {
          method: 'POST',
          body: data
        }
      )
      const file = await res.json()
  
      setSectionImage(file.secure_url)
    }
    

    React.useEffect(() => {
      axios.get(`http://localhost:8080/section`)
      .then(res => {
        setRows(res.data)
      })
  },[])


    const handleChange = (event) => {
        setSectionID(event.target.value);
      };
    
    return (
        <div className='orders_container'>
            <div className='branch_statistics'>
                <div style={{width: '450px'}} className='dash_div'>
                <form style={{display: 'flex', justifyContent: 'space-around', alignItems:'center'}}>
                    <div>
                    <TextField
                        id="outlined-basic"
                        label="Name" variant="outlined" 
                        size='small'
                        color="secondary"
                        sx={{width: '200px', mb: 1, mt:1}} 
                        InputLabelProps={{
                            shrink: true,
                    }}/>                  
                        <img style={{objectFit:'cover'}} width='200px' height='40px' src={sectionImage}/>
                        <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" onChange={(e)=> uploadImage(e)}  multiple type="file" />
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
                    <Sections rows={rows}/>
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

            <TextField
                id="outlined-basic"
                label="Name" variant="outlined" 
                size='small'
                color="secondary"
                sx={{width: '300px', marginTop: '20px'}} 
                InputLabelProps={{
                    shrink: true,
            }}/>

                <TextField
                    id="filled-multiline-static"
                    label="Description"
                    multiline
                    rows={2}
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
                    size='small'
                    sx={{ mt: 2, width: 120}}
                    color="secondary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                            />
    
                <FormControl sx={{ mt: 2, ml: 1, minWidth: 170, mb: 2 }}>
                    <InputLabel 
                        color="secondary"
                        id="demo-simple-select-autowidth-label">
                        Section
                    </InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={sectionID}
                    onChange={handleChange}
                    color="secondary"
                    label="Section"
                    size='small'
                    >
                        {rows.map((row)=>(
                           <MenuItem value={row._id}>{row.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </div>
                

                <img style={{objectFit:'cover'}} width='300px' height='90px' src='https://freelance.sa/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png'/>

                <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file"  multiple type="file" />
                <Button variant="contained"  sx={{backgroundColor: '#bdbdbd', width: '300px', marginTop: '10px'}} color="secondary" component="span">
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
