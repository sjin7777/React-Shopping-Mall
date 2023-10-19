import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const url = `https://fakestoreapi.com/products`;

function ProductList() {
    const navigate = useNavigate();
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
    
    const itemList = items.map((item) => (
        <div key={item.id} onClick={() => navigate(`/productDetail/${item.id}`, {state: {item}})} style={{border: "2px solid black"}}>
            <img src={item.image} alt={item.title} style={{width: "50px", height: "50px"}}/>
            <h3>{item.title}</h3>
            <h5>{item.price}</h5>
        </div>
    ));
    return (
        <>
            {isLoading ? <h1>Loading....</h1> : itemList}
        </>
    )
}
export default ProductList;