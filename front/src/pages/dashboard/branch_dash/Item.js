import React from 'react'
import Radio from '@mui/material/Radio';
import { AuthAxiosContext } from '../../../App'
import { useParams } from "react-router-dom";

export default function Item({available, id}) {
    const [checked, setChecked] = React.useState(available)
    const authAxios = React.useContext(AuthAxiosContext);
    let { adminId, branchId } = useParams();


    const markUnavailable = () => {
        setChecked(!checked)
        if ( checked ){
            authAxios.post('/missing/', {menu: id, user: branchId}).then(
                console.log('posted')
              )
        }else{
            authAxios.delete('/missing/' + id).then(
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
