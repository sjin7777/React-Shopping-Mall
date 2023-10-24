import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function IconCart(cartNum) {
    return (
        <Badge badgeContent={cartNum} color="secondary">
            <ShoppingCartIcon />
        </Badge>
    );
}