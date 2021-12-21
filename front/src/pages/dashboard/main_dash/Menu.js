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
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { AuthAxiosContext } from '../../../App'


const Input = styled('input')({
  display: 'none',
});

const initialValues = {image: 'https://freelance.sa/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png', name: ''}
const initialMenuValues = {image: 'https://freelance.sa/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png', name: '', section: '', description: '', price: ''}

export default function Menu() {
    const [rows, setRows] = React.useState([])
    const [refresh, setRefresh] = React.useState(false)

    const [currentSectionID, setCurrentSectionID] = React.useState('')
    const [sectionValues, setSectionValues] = React.useState(initialValues)

    const [currentMenuID, setCurrentMenuID] = React.useState('')
    const [menuValues, setMenuValues] = React.useState(initialMenuValues)

    let { adminId } = useParams();
    const authAxios = React.useContext(AuthAxiosContext);


    React.useEffect(() => {
        axios.get(`http://localhost:8080/section/admin/${adminId}`)
        .then(res => {
          setRows(res.data)
        })
      },[refresh])

    React.useEffect(() => {
        if( currentSectionID !== '' ) 
    axios.get(`http://localhost:8080/section/`+currentSectionID)
    .then(res => {
    setSectionValues({name: res.data.name, image: res.data.image})  
    })
    },[currentSectionID])


    React.useEffect(() => {
    if( currentMenuID !== '')  
        axios.get(`http://localhost:8080/menu/`+currentMenuID)
    .then(res => {
        setMenuValues(res.data)  
    })
    },[currentMenuID])
  

    const uploadImage = async (e) => {
      const files = e.target.files
      const data = new FormData()
      data.append('file', files[0])
      data.append('upload_preset', 'images')
      const res = await fetch('https://api.cloudinary.com/v1_1/det8kbepq/image/upload',{ method: 'POST',body: data })
      const file = await res.json()

      setSectionValues({...sectionValues, image: file.secure_url})
    }

    const uploadMenuImage = async (e) => {
          const files = e.target.files
          const data = new FormData()
          data.append('file', files[0])
          data.append('upload_preset', 'images')
          const res = await fetch('https://api.cloudinary.com/v1_1/det8kbepq/image/upload',{ method: 'POST',body: data })
          const file = await res.json()
    
          setMenuValues({...menuValues, image: file.secure_url})
    }
    
    // React.useEffect(() => {
    //     console.log(menuValues)
    //   },[menuValues])



    const postOrEditSection = () => {
        if (currentSectionID === ''){
            authAxios.post('/section', {...sectionValues, admin: adminId})
              .then(function (response) {
                setRefresh(!refresh)
                setSectionValues(initialValues)
              })
              .catch(function (error) {
                console.log(error);
              });
        }else{
            authAxios.put('/section/'+currentSectionID, sectionValues)
            .then(function (response) {
              setRefresh(!refresh)
              setSectionValues(initialValues)
              setCurrentSectionID('')
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    };

    const postOrEditMenu = () => {
        if (currentMenuID === ''){
            authAxios.post('/menu', {...menuValues, admin: adminId})
              .then(function (response) {
                setRefresh(!refresh)
                setMenuValues(initialMenuValues)
            })
              .catch(function (error) {
                console.log(error);
              });
        }else{
            authAxios.put('/menu/'+currentMenuID, menuValues)
            .then(function (response) {
              setRefresh(!refresh)
              setMenuValues(initialMenuValues)
              setCurrentMenuID('')
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    };

    const cancelEdit = (cancelWhat) => {
        if (cancelWhat == 'menu'){
            setCurrentMenuID('');
            setMenuValues(initialMenuValues)
        }else{
            setCurrentSectionID('');
            setSectionValues(initialValues)
        }
    };

    const deleteSection = () => {
        authAxios.delete('/section/'+currentSectionID)
        .then(function (response) {
          setRefresh(!refresh)
          setSectionValues(initialValues)
          setCurrentSectionID('')
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const deleteMenu = (id) => {
        authAxios.delete('/menu/'+id)
        .then(function (response) {
          setRefresh(!refresh)
          setMenuValues(initialMenuValues)
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const handleInputChange = e => {
        var { name, value } = e.target
        setMenuValues({
            ...menuValues,
            [name]: value
        })
    }
    
    return (
        <div className='orders_container'>
            <div className='branch_statistics'>
                <div style={{width: '450px'}} className='dash_div'>
                <form style={{display: 'flex', justifyContent: 'space-around', alignItems:'center'}}>
                    <div>
                    <TextField
                        id="outlined-basic"
                        label="Name" 
                        variant="outlined" 
                        size='small'
                        color="secondary"
                        value={sectionValues.name}
                        onChange={(e) => setSectionValues({...sectionValues, name: e.target.value})}
                        sx={{width: '200px', mb: 1, mt:1}} 
                        InputLabelProps={{
                            shrink: true,
                    }}/>                  
                        <img style={{objectFit:'cover'}} width='200px' height='40px' src={sectionValues.image}/>
                        <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" onChange={(e)=> uploadImage(e)}  multiple type="file" />
                        <Button variant="contained"  sx={{backgroundColor: '#bdbdbd', width: '200px', m: 1}} color="secondary" component="span">
                            Upload Image ‎&nbsp;‎ <PhotoCamera />
                        </Button>
                        </label>                 
                    </div>
                    <Stack direction="column" spacing={1}>
                        {currentSectionID !== '' ?
                        ( <>
                      <IconButton  aria-label="add an alarm" onClick={() => cancelEdit()}>
                        <ClearIcon />
                      </IconButton>
                        <IconButton onClick={()=> deleteSection()} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={()=> postOrEditSection()}  color="secondary" aria-label="add an alarm">
                        <ModeEditIcon />
                      </IconButton>
                      
                    
                      </>)
                        : 
                            <IconButton onClick={()=> postOrEditSection()} color="secondary" aria-label="add to shopping cart">
                            <AddCircleOutlinedIcon/>
                          </IconButton>
                        
                        }
                     
                     
                  </Stack>                </form>
                </div>
                <div className='dash_div'>
                    <Sections rows={rows} setCurrentSectionID={setCurrentSectionID}/>
                </div>
            </div>
            <div className='branch_statistics'>
            <div style={{ height: '65vh'}} className='dash_div'>
            <h3 style={{textAlign: 'center', margin: '0', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.04)', borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>Menu</h3>
                <StickyHeadTable refresh={refresh} setCurrentMenuID={setCurrentMenuID} deleteMenu={deleteMenu}/>
            </div>
            <div style={{ height: '65vh', width: '550px'}} className='dash_div'>
            <form >
            <h3 style={{textAlign: 'center', margin: '0', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.04)', borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
                {currentMenuID? <span>Edit Dish</span>: <span>New Dish</span>}</h3>

            <TextField
                id="outlined-basic"
                label="Name" 
                name="name" 
                value={menuValues.name}
                onChange={(e)=>handleInputChange(e)}
                variant="outlined" 
                size='small'
                color="secondary"
                sx={{width: '300px', marginTop: '20px'}} 
                InputLabelProps={{
                    shrink: true,
            }}/>

                <TextField
                    id="filled-multiline-static"
                    label="Description"
                    name="description" 
                    value={menuValues.description}
                    onChange={(e)=>handleInputChange(e)}
                    multiline
                    rows={2}
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
                    name="price" 
                    value={menuValues.price}
                    onChange={(e)=>handleInputChange(e)}
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
                    value={menuValues.section}
                    name="section" 
                    onChange={(e)=>handleInputChange(e)}
                    color="secondary"
                    label="Section"
                    size='small'
                    >
                        {rows.map((row, index)=>(
                           <MenuItem key={index} value={row._id}>{row.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </div>
                

                <img style={{objectFit:'cover'}} width='300px' height='90px' src={menuValues.image}/>

                <label htmlFor="contained-button">
                <Input onChange={(e)=> uploadMenuImage(e)}  accept="image/*" id="contained-button"  multiple type="file" />
                <Button variant="contained"  sx={{backgroundColor: '#bdbdbd', width: '300px', marginTop: '10px'}} color="secondary" component="span">
                    Upload Image ‎&nbsp;‎ <PhotoCamera />
                </Button>
                </label>


               <br/> 
               {currentMenuID?
               <>
               <Button onClick={()=>postOrEditMenu()}  sx={{width: '140px', mt: '20px', mr: 1}} color="secondary" variant="contained">EDIT</Button>  
               <Button onClick={()=>cancelEdit('menu')}  sx={{width: '140px', mt: '20px', ml: 1}} color='inherit' variant="contained">CANCEL</Button>  
               </>
            :  <Button onClick={()=>postOrEditMenu()}  sx={{width: '300px', marginTop: '20px'}} color="secondary" variant="contained">POST</Button>  
            }
            </form>
            </div>   
            </div>
        </div>
    )
}
