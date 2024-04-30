import styles from './CartCard.module.css';
import { MdDeleteForever } from "react-icons/md";
import { addToCart,decreaseQuantity,removeProduct } from '../../redux/reducers/cartReducer';
import { useDispatch} from 'react-redux';

export default function CartCard(props){
    const dispatch = useDispatch();
    const data = props.item


    const handleIncreaseQuantity = () =>{
        dispatch(addToCart(data));
    }
    const handleDecreaseQuantity = () =>{
        if(data.count > 1){
            dispatch(decreaseQuantity(data));
        }
    }

    const handleRemoveProduct = () =>{
        dispatch(removeProduct(data));
    }

    return(
        <div className={styles.card}>
            <div className={styles.cardLeft}>
                <div className={styles.picture}>
                    <img src={data.image} alt="" />
                </div>
                <div className={styles.cardDetails}>
                    <h4>{data.product}</h4> 
                    <p className={styles.productPrice}>&#8377; {data.price}</p>
                    <div className={styles.cartQty}>
                    <p className={styles.decQty} onClick={handleDecreaseQuantity} >-</p>
                    <p className={styles.qty}>{data.count}</p>
                    <p className={styles.incQty} onClick={handleIncreaseQuantity}>+</p>
                    </div>  
                </div>
            </div>
            <div className={styles.cardRight}>
                <p>&#8377;{data.price} X {data.count}</p>
                <p>&#8377;{data.price * data.count}</p>
                <MdDeleteForever  className={styles.delIcon} onClick={handleRemoveProduct}/>
            </div>
            


        </div>
    )
}