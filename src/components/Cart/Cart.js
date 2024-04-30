import styles from './Cart.module.css';
import CartCard from '../CartCard/CartCard';
import { fetchCart , clearCart, placeOrder} from '../../redux/reducers/cartReducer';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import orderPlacedAnimation from '../../utils/Animation - 1713521554351.json'

export default function Cart(){
    const {cost , count, items, status} = useSelector(state=> state.cartReducer);
    const user = useSelector(state => state.auth.user);
    const userStatus = useSelector(state => state.auth.status);
    const [hideWrapper, sethideWrapper] = useState();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCart());
    },[dispatch,user]);

    useEffect(()=>{
        // console.log("user Data: ")
        // console.log(userStatus)
        // console.log(user)
        // console.log("cart Data: ")
        // console.log(items)
        // console.log(status)
    },[dispatch,userStatus, items ])


    const handleClearCart = () =>{
        dispatch(clearCart());
    }

    const handleOrderPlaced = () =>{
        sethideWrapper('hidden')
        setTimeout(()=>{
            dispatch(placeOrder({cost , count, items}))
            navigate('/orders');
            sethideWrapper(null);
        },3000)
    }
    // console.log("cart Main");
    // console.log(status);
    if(!user){
        return(
            <div className={styles.cartWrapper}>
            <div className={styles.cardContainer}>
            <h1>Loading....</h1>
            </div>
        </div>
        )
    } else if(user && items.length === 0 && status === 'idle'){
        return(
            <div className={styles.cartWrapper}>
            <div className={styles.cardContainer}>
            <h1>Cart is empty</h1>
            </div>
        </div>
        )
    }else if(items.length > 0){
        return (
            <>
            <div className={hideWrapper === 'hidden' ? styles.hidden : styles.cartWrapper}>
                
                <div className={styles.cardContainer}>
                <div className={styles.cartHeader}>
                    <h1>Cart</h1>
                    <button onClick={handleClearCart}>Clear Cart</button>
                </div>
                {items.map((item)=>(<CartCard item={item} key={item.productId}/>))}
                
                <hr />

                <div className={styles.cartFooter}>
                    <div className={styles.costDetails}>
                        <h4>Total products: {count}</h4>
                        <h4>Total Cost: &#8377; {cost}</h4>
                    </div>
                    <div className={styles.orderButton}>
                        <button onClick={handleOrderPlaced}>Place Order</button>
                    </div>
                </div>
                </div>
            </div>
            {hideWrapper === 'hidden' && <div className={styles.orderPlaced}>
                <h1>Order Placed</h1>
            <Lottie  className={styles.animation} animationData={orderPlacedAnimation} loop={false} />;
            </div>
            }
            </>
        )
    }
    
}