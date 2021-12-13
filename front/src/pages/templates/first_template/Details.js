import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import AddButton from './AddButton';


export default function Details() {
    let { itemId } = useParams();
    const navigate = useNavigate()

    const [item, setItem] = React.useState({})

    React.useEffect(() => {
      axios.get(`http://localhost:8080/menu/${itemId}`)
      .then(res => {
        setItem(res.data)
      })
  },[])

    return (
        <div className='details'>
                <div className='b_menu' style={{position: 'absolute'}} onClick={()=> navigate('/menu/id/id')}>
                   <svg width="16" height="16" viewBox="0 0 24 26" fill="currentColor" _css4="rotate(360deg)"><path d="M6.92 1c.255 0 .509.138.636.275l10.158 11.157c.381.413.381.964 0 1.377L7.683 24.69c-.381.413-.89.413-1.27 0-.381-.413-.381-.964 0-1.377l9.396-10.192L6.287 2.652c-.381-.413-.381-.964 0-1.378A.932.932 0 016.92 1z" fill="null" stroke="null" strokeWidth="0.25"></path></svg>
                </div>
            <img src={item.image}/>
            <div className='details_div' style={{padding: '0 10px'}}>
                <p className='item_name'>{item.name}</p>
                <p className="item_price">{item.price}$</p>
                <p className='item_description'>{item.description}</p>
            </div>
            <AddButton item={item}/>
        </div>
    )
}
