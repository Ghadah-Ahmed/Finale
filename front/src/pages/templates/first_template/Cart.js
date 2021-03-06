import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebaseDb from "../../../fire";
import texts from './Texts.json'
import { LanguageContext } from '../../../App'

export default function Cart() {
    const [items, setItems] = React.useState([])
    const [ordersNum, setOrdersNum] = React.useState(true)
    const [total, setTotal] = React.useState(0)
    const [info, setInfo] = React.useState({name: 'Anonymous', note: 'No notes.'})
    const { adminId, branchId } = useParams();
    const {lang, setLang} = React.useContext(LanguageContext)

    const navigate = useNavigate()

    const order = () => {
        let obj = {orders: items, note: info.note, name: info.name, status: 'Active'}
        firebaseDb.child(`orders${branchId}`).push( obj ).then(res => {
            var orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.push(res.getKey()); 
            localStorage.setItem(`orders`, JSON.stringify(orders));
            var n = sessionStorage.length;
                while(n--) {
                var key = sessionStorage.key(n);
                    sessionStorage.removeItem(key);
            }
            navigate(`/orders/${adminId}/${branchId}`)
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
        <div>
          <h3>{texts[lang].myOrders}</h3>
          <div className='items_container'>
          {items?.map((item, index) => (
              <CartItem item={item} key={index} ordersNum={ordersNum} setOrdersNum={setOrdersNum}/>
          ))}
                { items.length != 0 ?

                <div className='item_div' dir={lang === 'ar' ? 'rtl' : "ltr"} >
                    <form style={{width: '100%'}}>
                    <TextField
                        id="outlined-multiline-static"
                        label={texts[lang].note}
                        multiline
                        rows={4}
                        fullWidth
                        placeholder={texts[lang].notePlaceholder}
                        onChange={(e)=> setInfo({...info, note: e.target.value})}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                     />
                    <TextField 
                        id="outlined-basic"
                        label={texts[lang].table}
                        placeholder={texts[lang].tablePlaceholder}
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

          <div dir={lang === 'ar' ? 'rtl' : "ltr"} className='order_div details_div'>
                <p className="display item_description">{texts[lang].total} <span>$ {(Math.round(total * 100) / 100).toFixed(2)}</span></p>
                <p className="display item_description">{texts[lang].VAT} <span>$ { (Math.round((total * (15/100)) * 100) / 100).toFixed(2)}</span></p>
                <p style={{color: '#000'}} className='display item_name'>{texts[lang].gross} <span>$ { (Math.round(((total * (15/100)) + total) * 100) / 100).toFixed(2)}</span></p>

                <div  id='order_div' style={{padding: '0 15px'}}>
                    <Button onClick={()=> order()} fullWidth variant="contained">{texts[lang].orderNow}</Button>
                </div>
            </div>
        </div>
    )
}


function CartItem({ item, setOrdersNum, ordersNum }) {
    const [quantity, setQuantity] = React.useState(item.quantity || 1)
    const {lang, setLang} = React.useContext(LanguageContext)

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
            <div dir={lang === 'ar' ? 'rtl' : "ltr"} style={lang === 'ar' ? {textAlign: 'right'} : {textAlign: 'left'}} className='item_info'>
                <p style={{fontSize: '16px', lineHeight: '30px'}} className='item_name'>{item.name[lang]}</p>
                <p style={{fontSize: '13px', lineHeight: '20px', marginBottom: '10px'}} className='item_description'>{item.description[lang]}</p>
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