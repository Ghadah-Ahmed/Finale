import React from 'react'
import StickyHeadTable from './StickyHeadTable'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';


const initialValues = {name: '', city: '', district: '', email: '', password: ''}

export default function Branches() {

    const [refresh, setRefresh] = React.useState(false)

    const [currentID, setCurrentID] = React.useState('')
    const [Values, setValues] = React.useState(initialValues)

    React.useEffect(() => {
        if( currentID !== '')  
            axios.get(`http://localhost:8080/users/`+currentID)
        .then(res => {
            setValues(res.data)  
        })
        },[currentID])

    const postOrEdit = () => {
        if (currentID === ''){
            axios.post('http://localhost:8080/users', {...Values, admin: '61af09d0de68afd3b8044910'})
              .then(function (response) {
                setRefresh(!refresh)
                setValues(initialValues)
            })
              .catch(function (error) {
                console.log(error);
              });
        }else{
            axios.put('http://localhost:8080/users/'+currentID, Values)
            .then(function (response) {
              setRefresh(!refresh)
              setValues(initialValues)
              setCurrentID('')
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    };

    const cancelEdit = () => {
            setCurrentID('');
            setValues(initialValues)
    };

    const deleteBranch = (id) => {
        axios.delete('http://localhost:8080/users/'+id)
        .then(function (response) {
          setRefresh(!refresh)
          setValues(initialValues)
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const handleInputChange = e => {
        var { name, value } = e.target
        setValues({
            ...Values,
            [name]: value
        })
    }

    return (
        <div className='orders_container'>
            <div className='branch_statistics'>
            <div style={{ height: '50vh'}} className='dash_div'>
            <h3 style={{textAlign: 'center', margin: '0', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.04)', borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>Branches</h3>
                <StickyHeadTable refresh={refresh} setCurrentMenuID={setCurrentID} deleteMenu={deleteBranch} component='Branches'/>
            </div>
            <div style={{ height: '50vh', width: '500px'}} className='dash_div'>
            <form >
            <h3 style={{textAlign: 'center', margin: '0', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.04)', borderBottom: '1px solid rgba(224, 224, 224, 1)'}}>
               {currentID ? <span>Edit Branch</span>:<span>New Branch</span>}</h3>

            <TextField
                id="outlined-basic"
                label="Supervisor" 
                name="name" 
                value={Values.name}
                onChange={(e)=>handleInputChange(e)}
                variant="outlined" 
                size='small'
                color="secondary"
                sx={{width: '300px', marginTop: '20px'}} 
                InputLabelProps={{
                    shrink: true,
            }}/>
            <TextField
                id="outlined-basic"
                label="Email" 
                name="email" 
                value={Values.email}
                onChange={(e)=>handleInputChange(e)}
                variant="outlined" 
                size='small'
                type='email'
                color="secondary"
                sx={{width: '300px', marginTop: '20px'}} 
                InputLabelProps={{
                    shrink: true,
            }}/>
                        <TextField
                id="outlined-basic"
                label="Password" 
                name="password" 
                value={Values.password}
                onChange={(e)=>handleInputChange(e)}
                variant="outlined" 
                size='small'
                type='password'
                color="secondary"
                sx={{width: '300px', marginTop: '20px'}} 
                InputLabelProps={{
                    shrink: true,
            }}/>

            <div style={{maxWidth:'100%', display:'flex', justifyContent:'center'}}>
                 <TextField
                    id="outlined-number"
                    label="District"
                    name="district" 
                    value={Values.district}
                    onChange={(e)=>handleInputChange(e)}
                    size='small'
                    sx={{ mt: 2,mr: 1, width: 140}}
                    color="secondary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                 <TextField
                    id="outlined-number"
                    label="City"
                    name="city" 
                    value={Values.city}
                    onChange={(e)=>handleInputChange(e)}
                    size='small'
                    sx={{ mt: 2, ml: 1, width: 140}}
                    color="secondary"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                </div>

  
                


               <br/> 
               {currentID?
               <>
               <Button onClick={()=>postOrEdit()}  sx={{width: '140px', mt: '10px', mr: 1}} color="secondary" variant="contained">EDIT</Button>  
               <Button onClick={()=>cancelEdit()}  sx={{width: '140px', mt: '10px', ml: 1}} color='inherit' variant="contained">CANCEL</Button>  
               </>
            :  <Button onClick={()=>postOrEdit()}  sx={{width: '300px', marginTop: '10px'}} color="secondary" variant="contained">POST</Button>  
            }
            </form>
            </div>   
            </div>
        </div>
    )
}
