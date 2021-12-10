import React from 'react'
import Button from './Button'

export default function Orders() {
    const [items, setItems] = React.useState(['qq', 'ee', 'gg', 'hh', 'ff', 'kk', 'oo', 'yy', 'ff', 'kk', 'oo', 'yy'])
   
    return (
        <div className='orders_container'>
            <div className='branch_statistics'>
                <div className='dash_div'>
                </div>
                <div className='dash_div'>
                </div>
            </div>
            <div style={{height: '65vh'}} className='dash_div'>
            <div className='branch_statistics table'>
                        <p>Table</p>
                        <p>Order Id</p>
                        <p>Date</p>
                        <p>Time</p>
                        <p>Status</p>
                    </div>
                {items.map((item)=>(
                    <div className='branch_statistics table'>
                        <p>{item}</p>
                        <p>{item}</p>
                        <p>{item}</p>
                        <p>{item}</p>
                        <p><Button value='Active'/></p>
                    </div>
                ))}
            </div>   
        </div>
    )
}
