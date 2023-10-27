import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function Row({orderSheet}) {
    const [open, setOpen] = React.useState(false);
    const orderDate = (date) => date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8)+' '+date.slice(8,10)+':'+date.slice(10,12)+':'+date.slice(12,14);
    
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{orderSheet.address}</TableCell>
                <TableCell align="right">{orderDate(orderSheet.orderDate)}</TableCell>
                <TableCell align="right">{orderSheet.sum}</TableCell>
                <TableCell align="right">{orderSheet.fee}</TableCell>
                <TableCell align="right">{orderSheet.total}</TableCell>
                <TableCell align="right">{orderSheet.orderState}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                        {/* <Typography variant="h6" gutterBottom component="div" textAlign="center">
                            Products
                        </Typography> */}
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Price ($)</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderSheet.itemList[0].map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell component="th" scope="row">
                                            <img alt={item.title} src={item.image} style={{width: "50px", height: "50px"}}/>
                                        </TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell align="right">{item.itemAmount}</TableCell>
                                        <TableCell align="right">
                                            {Math.round(item.itemAmount * item.price * 100) / 100}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


export default function TableOrder({orderSheetList}) {
    const orderKey = (order) => Object.keys(order)[0]
    return (
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                    <TableCell />
                    <TableCell>배송지</TableCell>
                    <TableCell align="right">주문일자</TableCell>
                    <TableCell align="right">상품금액</TableCell>
                    <TableCell align="right">배송비</TableCell>
                    <TableCell align="right">합계</TableCell>
                    <TableCell align="right">주문상태</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orderSheetList.map((orderSheet) => (
                    <Row key={orderKey(orderSheet)} orderSheet={orderSheet[orderKey(orderSheet)]} />
                ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}