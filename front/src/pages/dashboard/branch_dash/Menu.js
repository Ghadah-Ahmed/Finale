import React from 'react'
import Item from './Item';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { AuthAxiosContext } from '../../../App'
import { useParams } from "react-router-dom";

export default function Menu() {
    const [items, setItems] = React.useState([])
    const authAxios = React.useContext(AuthAxiosContext);
    let { adminId, branchId } = useParams();


    React.useEffect(() => {
        authAxios.get(`/menu/guest/${adminId}/${branchId}`)
        .then(res => {
            setItems(res.data)
        })
    },[])

    // React.useEffect(() => {
    //     console.log(items)
    // },[items])

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
                        <img width='100px' height='70px' style={{objectFit: 'cover'}} src={item.image}/> {item.name.en}
                        </div>
                    </TableCell>
                    <TableCell align="left">{item.description.en}</TableCell>
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
