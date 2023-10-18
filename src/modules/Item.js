// import { useEffect, useState } from "react";

// const url = `https://fakestoreapi.com/products`;

// const ITEM_LIST = 'ITEM_LIST';
// const ITEM_DETAIL = 'ITEM_DETAIL';

// const initialState = {
//     productList: {
//         productId: 0,
//         productTitle: '',
//         productPrice: 0,
//         productCategory: '',
//         productDescription: '',
//         productImage: '',
//         productRating: {
//             productRate: 0,
//             productCount: 0
//         }
//     },
//     product: {

//     }
// }

// export const itemList = (isLoading) => ({
//     type: ITEM_LIST,
//     payload: {
//         isLoading
//     }
// })

// export const itemDetail = (productId) => ({
//     type: ITEM_DETAIL,
//     payload: {
//         productId
//     }

// })


// function item(state=initialState, action) {
    
//     const [ items, setItems ] = useState([]);
//     const [ isLoading, setIsLoading ] = useState(true); 
//     useEffect(() => {
//         fetch(url, 'GET')
//             .then((response) => response.json())
//             .then((data) => {
//                 setItems(data)
//                 setIsLoading(false)
//             })
//             .catch((error) => console.log(error))
//     }, [])

//     switch(action.type) {
//         case ITEM_LIST:
//             return {
//                 ...state,
//                 isLoading: isLoading,
//                 productList: items
//             }
//         case ITEM_DETAIL:
//             return {
//                 ...state,

//             }
//         default:
//             return state;
//     }
// }

// export default item;