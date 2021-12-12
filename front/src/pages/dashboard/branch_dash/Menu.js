import React from 'react'
import Item from './Item';

export default function Menu() {
    const [items, setItems] = React.useState(['qq', 'ee', 'gg', 'hh', 'ff', 'kk', 'oo', 'yy', 'ff', 'kk', 'oo', 'yy', 'ff', 'kk', 'oo', 'yy'])

    return (
        <div className='orders_container'>
            <h2> Menu </h2>
            <p> Mark Unavailable Menu Items. </p>
            <div style={{height: '73vh'}} className='dash_menu_div'>
                {items.map((item)=>(
                    <Item/>
                ))}
            </div>   
    </div>
    );
}
