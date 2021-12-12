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
            {/* <h2 style={{textAlign: 'left'}}>Orders</h2> */}
            {/* <div className='branch_statistics table'>
                        <p>Table</p>
                        <p>Order Id</p>
                        <p>Date</p>
                        <p>Time</p>
                        <p>Status</p>
                    </div> */}
                {/* {items.map((item)=>(
                    <div className='branch_statistics table'>
                        <p>{item}</p>
                        <p>{item}</p>
                        <p>{item}</p>
                        <p>{item}</p>
                        <p><Button value='Active'/></p>
                    </div>
                ))} */}
                <CollapsibleTable/>
            </div>   
        </div>
    )
}
