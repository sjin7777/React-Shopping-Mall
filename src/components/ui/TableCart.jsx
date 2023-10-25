import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';




export default function TableCart({items}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>체크박스</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>체크박스</TableCell>
                        <TableCell component="th" scope="row">
                            <img alt={item.title} src={item.image} style={{width: "50px", height: "50px"}}/>
                        </TableCell>
                        <TableCell >{item.title}</TableCell>
                        <TableCell align="right">
                            <Button></Button>
                            {item.itemAmount}
                            <Button></Button>
                        </TableCell>
                        <TableCell align="right">
                            {Math.round(item.itemAmount * item.price * 100) / 100}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}