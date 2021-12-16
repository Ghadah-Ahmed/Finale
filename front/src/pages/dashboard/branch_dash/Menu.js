import React from 'react'
import Item from './Item';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

export default function Menu() {
    const [items, setItems] = React.useState([])

    React.useEffect(() => {
        axios.get(`http://localhost:8080/menu/guest/61af09d0de68afd3b8044910/61af0ab8a46570f29896158b`)
        .then(res => {
            setItems(res.data)
        })
    },[])

    React.useEffect(() => {
        console.log(items)
    },[items])

    return (
        <div className='orders_container'>
           <div style={{maxHeight: '90vh', height: 'auto', overflow: 'scroll', padding: 0, gridGap: '0'}} className='dash_menu_div'>
           <h2 style={{position: 'sticky', top: '0', backgroundColor: '#ededed', width: '100%', padding: '20px', margin: '0'}}> Menu </h2>

            <TableContainer>
            <Table  size="small" aria-label="sticky table">
                <TableBody>
                {items?.map((item, index) => (
                    <TableRow key={index} style={{position: 'relative'}}>
                    <TableCell>
                        <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                        <img width='100px' height='70px' style={{objectFit: 'cover'}} src={item.image}/> {item.name}
                        </div>
                    </TableCell>
                    <TableCell align="left">{item.description}</TableCell>
                    <TableCell align="left"><Item available={item.available} id={item._id}/></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            </div>
        </div>
    );
}
