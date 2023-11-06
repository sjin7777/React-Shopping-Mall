import { useState, useEffect } from "react";
import IconLoading from "../ui/icons/IconLoading";
import FlexWrap from "../ui/FlexWrap";

const url = `https://fakestoreapi.com/products`;

function ProductList() {
    const [ items, setItems ] = useState([]);
    const [ isLoading, setLoading ] = useState(true); 
    
    useEffect(() => {
        fetch(url, {method: "GET"})
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
                setLoading(false)
            })
            .catch((error) => console.log(error));
    }, [])
    

    return (
        <>
            {isLoading ? <IconLoading /> : <FlexWrap items={items}/>}
        </>
    )
}
export default ProductList;