import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebaseDb from "../../../fire";

export default function Cart() {
    const [items, setItems] = React.useState([])
    const [ordersNum, setOrdersNum] = React.useState(true)
    const [total, setTotal] = React.useState(0)
    const [info, setInfo] = React.useState({name: '', note: ''})
    let { adminId, branchId } = useParams();

    const navigate = useNavigate()

    const order = () => {
        let obj = {orders: items, note: info.note, name: info.name, status: 'Active'}
        firebaseDb.child('orders').push( obj ).then(res => {
            var orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.push(res.getKey()); 
            localStorage.setItem(`orders`, JSON.stringify(orders));
            var n = sessionStorage.length;
                while(n--) {
                var key = sessionStorage.key(n);
                    sessionStorage.removeItem(key);
            }
            navigate('/orders')
        }).catch(
            err => console.log(err)
        )
    }

    React.useEffect(() => {
        var all = []
        var total = 0;
        for (var key in sessionStorage) {
            if (JSON.parse(sessionStorage.getItem(`${key}`))  !== null  ){
                var item = JSON.parse(sessionStorage.getItem(`${key}`))
                all.push(item)
                total += item.price*item.quantity || item.price ;
            }
        }
        setItems(all)
        setTotal(total)
    },[ordersNum])



    return (
        <div>
                <div className='b_menu' onClick={()=> navigate(`/menu/${adminId}/${branchId}`)}>
                   <svg width="16" height="16" viewBox="0 0 24 26" fill="currentColor" _css4="rotate(360deg)"><path d="M6.92 1c.255 0 .509.138.636.275l10.158 11.157c.381.413.381.964 0 1.377L7.683 24.69c-.381.413-.89.413-1.27 0-.381-.413-.381-.964 0-1.377l9.396-10.192L6.287 2.652c-.381-.413-.381-.964 0-1.378A.932.932 0 016.92 1z" fill="null" stroke="null" strokeWidth="0.25"></path></svg>
                </div>
        <div >
          <h3>My Orders</h3>
          <div className='items_container'>
          {items?.map((item, index) => (
              <CartItem item={item} key={index} ordersNum={ordersNum} setOrdersNum={setOrdersNum}/>
          ))}
                { items.length != 0 ?

                <div className='item_div' dir='ltr'>
                    <form style={{width: '100%'}}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Note"
                        multiline
                        rows={4}
                        fullWidth
                        placeholder="Leave a side note."
                        onChange={(e)=> setInfo({...info, note: e.target.value})}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                     />
                    <TextField 
                        id="outlined-basic"
                        label="Table / Name"
                        placeholder="Leave your name."
                        variant="outlined" 
                        color='primary'
                        fullWidth
                        onChange={(e)=> setInfo({...info, name: e.target.value})}
                        style={{ marginTop: '10px'}} 
                        InputLabelProps={{
                            shrink: true,
                         }}
                    />
                    </form>
                </div> 
                
                :<></>}
          </div>
          </div>
        
        <hr/>

          <div className='order_div details_div'>
                <p className="display item_description">المجموع <span>SR{total}</span></p>
                <p className="display item_description">الضريبة <span>SR59.00</span></p>
                <p style={{color: '#000'}} className='display item_name'>المجموع الكليّ <span>SR{total}</span></p>

                <div  id='order_div' style={{padding: '0 15px'}}>
                    <Button onClick={()=> order()} fullWidth variant="contained">اطلب الآن</Button>
                </div>
            </div>
        </div>
    )
}


function CartItem({ item, setOrdersNum, ordersNum }) {
    const [quantity, setQuantity] = React.useState(item.quantity || 1)

    React.useEffect(() => {
        isNaN(item.quantity) ?
        setQuantity(1)
        : setQuantity(item.quantity)
    },[item])

    const addItem = () => {
        setQuantity(quantity+1)
        var old = JSON.parse(sessionStorage.getItem(`${item._id}`)) 
        sessionStorage.setItem(`${item._id}`, JSON.stringify({...old, quantity: quantity+1}));
        setOrdersNum(!ordersNum)
    }

    const decreaseItem = () => {
       if (quantity > 1){
        setQuantity(quantity-1) 
        var old = JSON.parse(sessionStorage.getItem(`${item._id}`)) 
        sessionStorage.setItem(`${item._id}`, JSON.stringify({...old, quantity: quantity-1}));
       }else{
        sessionStorage.removeItem(`${item._id}`)
       }   
       setOrdersNum(!ordersNum)
    }

    return (
        <a>
        <div className='item_div'>
            <div className='item_info'>
                <p style={{fontSize: '16px', lineHeight: '30px'}} className='item_name'>{item.name}</p>
                <p style={{fontSize: '13px', lineHeight: '20px', marginBottom: '10px'}} className='item_description'>{item.description}</p>
                <div style={{justifyContent: 'space-between', display: 'flex', alignItems: 'center', gap: '10'}}>
                  <span style={{fontSize: '14px'}} className='item_price'>{item.price * quantity}$</span>
                  <div>
                      <AddCircleOutlinedIcon onClick={() => addItem()}/>
                      <RemoveCircleIcon onClick={() => decreaseItem()} sx={{ ml: 2}}/>
                  </div>
                </div>
            </div>
            <img  src={item.image}/>
            <span className='remove_order'>{quantity}</span>
        </div>
        </a>
    );
  }