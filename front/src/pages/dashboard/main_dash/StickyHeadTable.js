import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PreviewIcon from '@mui/icons-material/Preview';
import axios from 'axios';

export default function StickyHeadTable({ setCurrentMenuID, deleteMenu, refresh, component}) {
  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    component === 'Branches' ?
    axios.get(`http://localhost:8080/users/admin/61af09d0de68afd3b8044910`)
    .then(res => {
      setRows(res.data)
    })
    : 
    axios.get(`http://localhost:8080/menu/admin/61af09d0de68afd3b8044910`)
    .then(res => {
      setRows(res.data)
    })
},[refresh])

  return (
    <Paper sx={{ width: '100%', overflow: 'scroll', height:"100%"}}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {rows?.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {component === 'Branches' ?
                    <>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.district}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>

                    <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton  onClick={()=> deleteMenu(row._id)} aria-label="delete">
                        <DeleteIcon/>
                      </IconButton>
                      <IconButton onClick={()=> setCurrentMenuID(row._id)}  aria-label="add an alarm">
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton color="secondary" aria-label="add to shopping cart">
                        <PreviewIcon />
                      </IconButton>
                  </Stack>
                    </TableCell>
                    </> 
                    
                    
                    : <> 
                    
                    <TableCell sx={{ width: '100px', padding: '0' }}><img style={{objectFit: 'cover'}} width='100px' src={row.image}/></TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton  onClick={()=> deleteMenu(row._id)} aria-label="delete">
                        <DeleteIcon/>
                      </IconButton>
                      <IconButton onClick={()=> setCurrentMenuID(row._id)}  aria-label="add an alarm">
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton color="secondary" aria-label="add to shopping cart">
                        <PreviewIcon />
                      </IconButton>
                  </Stack>
                    </TableCell>
                    </>}
              
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}