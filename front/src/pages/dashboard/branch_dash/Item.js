import React from 'react'
import Radio from '@mui/material/Radio';

export default function Item() {
    const [checked, setChecked] = React.useState(false)

    return (
        <div className='dash_menu_div_item'>
            <div className={checked? 'unavailable' : 'none'}></div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}} >
                <img width='100' height='100' src='https://finedine.imgix.net/2PvyB5mz/91eaa640-eac7-4537-9b5a-1cff08b4e355.jpg?auto=format,&fit=crop&w=120&h=80&dpr=3'/>
                <p style={{fontSize: '16px', lineHeight: '30px'}} className='item_name'>بوكس كوكيز الفورنايو</p>
            </div>
            <p style={{fontSize: '13px', lineHeight: '20px', marginBottom: '10px'}} className='item_description'>اللذّة والخّفة والذوبان قصة مع كوكيز الفورنايو</p>
            <span style={{fontSize: '14px'}} className='item_price'>SR59.00</span>
            <Radio checked={checked} onClick={(e)=> setChecked(!checked)} color="default" style={{marginRight: '20px'}}/>
        </div>
    )
}
