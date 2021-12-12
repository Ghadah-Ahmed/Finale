import React from 'react'
import Sections from './Sections'
import StickyHeadTable from './StickyHeadTable'

export default function Menu() {
   
    return (
        <div className='orders_container'>
            <div className='branch_statistics'>
                <div style={{width: '450px'}} className='dash_div'>
    
                </div>
                <div className='dash_div'>
                    <Sections/>
                </div>
            </div>
            <div className='branch_statistics'>
            <div style={{ height: '65vh'}} className='dash_div'>
            <h3 style={{textAlign: 'center', margin: '0', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.04)', borderBottom: '1px solid rgb(87, 89, 98)'}}>Menu</h3>
                <StickyHeadTable/>
            </div>
            <div style={{ height: '65vh', width: '550px'}} className='dash_div'>
            </div>   
            </div>
        </div>
    )
}
