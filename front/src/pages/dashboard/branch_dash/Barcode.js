import React from 'react'
import QRcode from 'qrcode'
import { useParams } from "react-router-dom";


export default function Barcode({ source }) {
    const [src, setSrc] = React.useState('')
    let { adminId, branchId } = useParams();


    var opts = {
        width: 400
    }

    React.useEffect(() => {
    source === 'Branch' ?
        QRcode.toDataURL(`http://localhost:3000/menu/${adminId}/${branchId}`, opts).then((data) => {
            setSrc(data)
        })
             
      : QRcode.toDataURL(`http://localhost:3000/menu/${adminId}`, opts).then((data) => {
        setSrc(data)
    })
    
    },[])

    return (
        <div>
            <img src={src}/>
            <p>Scan the URL to display your branch's menu.</p>
            <p>or visit: 
                &nbsp;
            <a style={{textDecoration: 'underline', color: 'blue'}} href={ source === 'Branch' ? `http://localhost:3000/menu/${adminId}/${branchId}` : `http://localhost:3000/menu/${adminId}`}>{ source === 'Branch' ? <span>My Menu</span>:<span>My Branches</span>}</a></p>
        </div>
    )
}
