import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import IconLoading from "../ui/icons/IconLoading";
import FlexWrap from "../ui/FlexWrap";

const url = `https://fakestoreapi.com/products`;

function ProductList() {
    // const navigate = useNavigate();
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
    
    // const itemList = items.map((item) => (
    //     <div key={item.id} onClick={() => navigate(`/ProductDetail/${item.id}`, {state: {item}})} style={{border: "2px solid black"}}>
    //         <img src={item.image} alt={item.title} style={{width: "50px", height: "50px"}}/>
    //         <h3>{item.title}</h3>
    //         <h5>{item.price}</h5>
    //     </div>
    // ));

    return (
        <>
            {isLoading ? <IconLoading /> : <FlexWrap items={items}/>}
        </>
    )
}
export default ProductList;