import React from 'react'
import firebaseDb from "../../../fire";
import { useNavigate, useParams } from "react-router-dom";

export default function Orders() {
    const navigate = useNavigate()
    const [orders, setOrders] = React.useState([])
    let { adminId, branchId } = useParams();


    const selectStyle =   {
        padding: '5px', 
        borderRadius: '4px',
        color: 'white'
    }

    React.useEffect(() => {
    var ordersID = JSON.parse(localStorage.getItem("orders")) || [];
    var all = {}
    
    ordersID.map((order)=>{

        firebaseDb.child(`orders${branchId}/`+order).on('value', snapshot => {
                if (snapshot.val() != null)
                all = {...all, [order]:{...snapshot.val()}}
                setOrders(all)
        })
    })

    }, [])

    const status = (value) => {
        switch (value) {
            case 'Active':
                return <p style={{...selectStyle, backgroundColor: '#ff8b00'}} className='item_description'>{value}</p>
                break;
            case 'Processing':
                return <p style={{...selectStyle, backgroundColor: 'green'}} className='item_description'>{value}</p>
                break;   
            
            case 'Closed':
                return <p style={{...selectStyle, backgroundColor: 'rgba(244, 67, 54, 0.85)'}} className='item_description'>{value}</p>
                break;    
            default:
                break;
        }

    }
    return (
        <div>
            {orders.length != 0 ?  
            <div>
                <div>
                <div className='b_menu' onClick={()=> navigate(`/menu/${adminId}/${branchId}`)}>
                    <svg width="16" height="16" viewBox="0 0 24 26" fill="currentColor" _css4="rotate(360deg)"><path d="M6.92 1c.255 0 .509.138.636.275l10.158 11.157c.381.413.381.964 0 1.377L7.683 24.69c-.381.413-.89.413-1.27 0-.381-.413-.381-.964 0-1.377l9.396-10.192L6.287 2.652c-.381-.413-.381-.964 0-1.378A.932.932 0 016.92 1z" fill="null" stroke="null" strokeWidth="0.25"></path></svg>
                </div>
            </div>
            <h3>My Orders</h3>

            <div className='items_container'>
            <div className='orders_header'>
                <p>Status</p>
                <p>Total</p>
                <p>Order Name</p>
            </div>
                                { Object.keys(orders).reverse().map(id => (
                                    <div  key={id} className='dash_menu_div_item orders_div'>
                                     {status(orders[id].status)}
                                    <span style={{fontSize: '14px'}} >SR59.00</span>
                                    <p style={{fontSize: '16px', lineHeight: '30px'}} className='item_name'>{orders[id].name}</p>
                                    </div>
                                ))}
            </div>

            </div> 
            : <p> Oops! You have no orders yet!</p>}
          
        </div>
    )
}
