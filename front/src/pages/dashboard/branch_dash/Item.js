import React from 'react'
import Radio from '@mui/material/Radio';
import axios from 'axios';

export default function Item({available, id}) {
    const [checked, setChecked] = React.useState(available)

    const markUnavailable = () => {
        setChecked(!checked)
        if ( checked ){
            axios.post('http://localhost:8080/missing/', {menu: id, user: '61af0ab8a46570f29896158b'}).then(
                console.log('posted')
              )
        }else{
            axios.delete('http://localhost:8080/missing/' + id).then(
                console.log('deleted')
              )
        }
    }

    return (
        <>
            <div  className={checked? 'none': ''} style={{backgroundColor: 'white', opacity: '0.8', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}></div>
            <Radio checked={!checked} onClick={(e)=> markUnavailable()} color="default" style={{marginRight: '20px'}}/>
            <span  className={checked? 'none': ''}  >NOT AVAILABLE</span>
        </>
    )
}
