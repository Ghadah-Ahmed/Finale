import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function Cart() {
    const [items, setItems] = React.useState([])
    const [ordersNum, setOrdersNum] = React.useState(true)

    const navigate = useNavigate()

    React.useEffect(() => {
        var all = []
        for (var key in localStorage) {
            if (JSON.parse(localStorage.getItem(`${key}`))  !== null  ){
                var item = JSON.parse(localStorage.getItem(`${key}`))
                all.push(item)
            }
        }
        setItems(all)
    },[ordersNum])



    return (
        <div>
                <div className='b_menu' onClick={()=> navigate('/menu/id/id')}>
                   <svg width="16" height="16" viewBox="0 0 24 26" fill="currentColor" _css4="rotate(360deg)"><path d="M6.92 1c.255 0 .509.138.636.275l10.158 11.157c.381.413.381.964 0 1.377L7.683 24.69c-.381.413-.89.413-1.27 0-.381-.413-.381-.964 0-1.377l9.396-10.192L6.287 2.652c-.381-.413-.381-.964 0-1.378A.932.932 0 016.92 1z" fill="null" stroke="null" strokeWidth="0.25"></path></svg>
                </div>
        <div >
          <h3>My Orders</h3>
          <div className='items_container'>
          {items?.map((item, index) => (
              <CartItem item={item} key={index} ordersNum={ordersNum} setOrdersNum={setOrdersNum}/>
          ))}
          </div>
          </div>
<hr/>

          <div className='order_div details_div'>
                <p className="display item_description">المجموع <span>SR59.00</span></p>
                <p className="display item_description">الضريبة <span>SR59.00</span></p>
                <p style={{color: '#000'}} className='display item_name'>المجموع الكليّ <span>SR59.00</span></p>

                <div className='contact_div' id='order_div'>
                    {/* <a href="tel:+966555720204"> */}
                    <button>
                        <div>
                            <span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.982 17.25l-4.292-2.785a2.221 2.221 0 00-3.093.667l-.568.89c-1.004-.347-2.596-1.115-4.266-2.785-1.67-1.67-2.44-3.261-2.786-4.265l.89-.568a2.21 2.21 0 00.98-1.412 2.198 2.198 0 00-.311-1.677L6.75 1.02A2.225 2.225 0 003.68.35l-1.046.667a4.485 4.485 0 00-1.157 1.08C-1.515 6.3.163 13.404 5.38 18.62 8.748 21.988 13.053 24 16.893 24c1.919 0 3.653-.512 5.014-1.48l.032-.025a4.5 4.5 0 001.054-1.141l.663-1.037a2.237 2.237 0 00-.674-3.067zm-.423 2.37l-.654 1.025a3.183 3.183 0 01-.774.833c-1.137.8-2.6 1.223-4.237 1.223-3.505 0-7.465-1.87-10.597-5C1.534 12.94-.086 6.571 2.52 2.872a3.154 3.154 0 01.824-.768l1.035-.66a.951.951 0 011.282.283l2.788 4.298a.923.923 0 01-.28 1.284l-1.309.835a.65.65 0 00-.276.72c.355 1.28 1.208 3.238 3.262 5.291 2.053 2.053 4.01 2.906 5.291 3.261a.653.653 0 00.721-.276l.835-1.308a.944.944 0 011.288-.279l4.296 2.787a.934.934 0 01.283 1.28z" fill="null"></path></svg>
                            </span>
                            <span>اطلب الآن</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}


function CartItem({ item, setOrdersNum, ordersNum }) {
    const [quantity, setQuantity] = React.useState(item.quantity || 1)

    const addItem = () => {
        setQuantity(quantity+1)
        var old = JSON.parse(localStorage.getItem(`${item._id}`)) 
        localStorage.setItem(`${item._id}`, JSON.stringify({...old, quantity: quantity+1}));
    }

    const decreaseItem = () => {
       if (quantity > 1){
        setQuantity(quantity-1) 
        var old = JSON.parse(localStorage.getItem(`${item._id}`)) 
        localStorage.setItem(`${item._id}`, JSON.stringify({...old, quantity: quantity-1}));
       }else{
        localStorage.removeItem(`${item._id}`)
        setOrdersNum(!ordersNum)
       }   
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