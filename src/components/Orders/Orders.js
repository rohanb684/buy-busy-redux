import styles from './Orders.module.css'
import OrderCard from '../OrderCard/OrderCard';
import { fetchOrders } from '../../redux/reducers/cartReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function Orders () {
    const orders = useSelector(state=> state.cartReducer.orders);
    const user = useSelector(state => state.auth.user);

    const dispatch = useDispatch();

    useEffect(()=>{
        if(user){
            dispatch(fetchOrders())
        }   
    },[dispatch, user])
    
    return(
        <div className={styles.orderWrapper}>
            <div className={styles.cardContainer}>
                {orders.map((order, index)=><OrderCard key={index} order={order} orderNum={orders.length - index}/>)} 
            </div>
        </div>
    )    
}