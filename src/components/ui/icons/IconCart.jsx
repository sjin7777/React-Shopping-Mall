import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function IconCart({itemCount}) {
    return (
        <Badge badgeContent={itemCount} color="secondary">
            <ShoppingCartIcon />
        </Badge>
    );
}