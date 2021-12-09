import React from 'react'
import { useParams, useNavigate } from "react-router-dom";

export default function Details() {
    let { itemId } = useParams();
    const navigate = useNavigate()

    return (
        <div className='details'>
                <div className='b_menu' style={{position: 'absolute'}} onClick={()=> navigate('/menu/id/id')}>
                   <svg width="16" height="16" viewBox="0 0 24 26" fill="currentColor" _css4="rotate(360deg)"><path d="M6.92 1c.255 0 .509.138.636.275l10.158 11.157c.381.413.381.964 0 1.377L7.683 24.69c-.381.413-.89.413-1.27 0-.381-.413-.381-.964 0-1.377l9.396-10.192L6.287 2.652c-.381-.413-.381-.964 0-1.378A.932.932 0 016.92 1z" fill="null" stroke="null" strokeWidth="0.25"></path></svg>
                </div>
            <img src="https://finedine.imgix.net/2PvyB5mz/4319b03a-9375-474b-8853-c8f49400f8ca.jpg?fit=crop&auto=format&w=414&h=null&dpr=3"/>
            <div className='details_div'>
                <p className='item_name'>بوكس كوكيز الفورنايو</p>
                <p className="item_price">SR59.00</p>
                <p className='item_description'>اللذّة والخّفة والذوبان، قصة مع كوكيز الفورنايو</p>
            </div>
        </div>
    )
}
