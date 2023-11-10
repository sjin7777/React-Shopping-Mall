import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';

function Item(props) {
    const { sx, item } = props;
    const navigate = useNavigate();
    const itemTitle = item.title;

    return (
        <div style={{margin: '20px',}}>
            <Box
                sx={{
                    width: '170px',
                    height: '350px',
                    p: 1,
                    m: 1,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
                    color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                    border: '1px solid',
                    borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                    borderRadius: 2,
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    ...sx,
                }}
            >
                <div key={item.id} onClick={() => navigate(`/ProductDetail/${item.id}`, {state: {item}})} style={{width: "150px", padding: "0 10px" }}>
                    <div style={{height: "200px", textAlign: "center" }}><img src={item.image} alt={item.title} style={{width: "90%",  height: "90%", padding: "15px 5px", objectFit: "scale-down"}} /></div>
                    <h3 style={{height: "90px", paddingTop: "10px" }}>{(itemTitle.length < 30) ? itemTitle : itemTitle.slice(0,30) + '...'}</h3>
                    <div style={{height: "10px", textAlign: "center"}}>{item.price}</div>
                </div>
            </Box>
        </div>
    );
}

Item.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

export default function FlexWrap({items}) {
    return (
        <Box                        
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                maxWidth: 1000,
                borderRadius: 1,
            }}
            >
        {items.map((item) => (
            <Item key={item.id} item={item} />
        ))}
        </Box>
    );
}