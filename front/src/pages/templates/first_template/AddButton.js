import React from 'react'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function AddButton({ordersNum, setOrdersNum, item, style }) {
    const [added, setAdded] = React.useState(false)
    const [items, setItems] = React.useState({...sessionStorage})

    const saveToCart = (item) => {
          sessionStorage.setItem(`${item._id}`, JSON.stringify({...item}));
          setAdded(true)    
          setOrdersNum? setOrdersNum(!ordersNum): setItems({...sessionStorage});
      }

    const removeFromCart = (item) => {
        setAdded(false)
        sessionStorage.removeItem(`${item._id}`)
        setOrdersNum? setOrdersNum(!ordersNum): setItems({...sessionStorage});
    }

    React.useEffect(() => {
    setItems({...sessionStorage})
    },[ordersNum])


    return (
        items[item._id] || added? 
        <RemoveCircleIcon  style={style} color='warning' onClick={()=> removeFromCart(item)}/>
    :   <AddCircleOutlinedIcon style={style} onClick={()=> saveToCart(item)}/>

        )
}
