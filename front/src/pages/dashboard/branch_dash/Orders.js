import React from 'react'
import Bubble from './Bubble'
import Button from './Button'
import CollapsibleTable from './CollapsibleTable'
import Gradient from './Gradient'
import Line from './Line'

export default function Orders() {
    const [items, setItems] = React.useState(['hh', 'ee', 'gg', 'hh', 'ff', 'kk', 'oo', 'yy', 'ff', 'kk', 'oo', 'yy'])
   
    return (
        <div className='orders_container'>
            <div className='branch_statistics'>
                <div className='dash_div'><Line/></div>
                <div className='dash_div'><Gradient/></div>
                <div className='dash_div'><Bubble/></div>
            </div>
            <div style={{maxHeight: '65vh', height: 'auto'}} className='dash_div'>
                <CollapsibleTable/>
            </div>   
        </div>
    )
}
