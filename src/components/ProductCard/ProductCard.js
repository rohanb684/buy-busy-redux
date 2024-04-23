import styles from './ProductCard.module.css'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import  {useNavigate} from 'react-router-dom';
import { addToCart,decreaseQuantity } from '../../redux/reducers/cartReducer';


export default function ProductCard(props){
    
    const[quantity, setQuantity] = useState(0);

    const {product, image, price, category} = props.value

    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(()=>{
        setQuantity(0);
    },[props])

    const handleIncrease = () =>{
        if(quantity < 4){
            dispatch(addToCart(props.value))
            setQuantity(prev=> ++prev)
        }
    }

    const handDecrease = ()=>{
        if(quantity!=0){
            dispatch(decreaseQuantity(props.value))
            setQuantity(prev=> --prev)
        }
    }

    const handleAddtoCart = () =>{
        dispatch(addToCart(props.value))
        setQuantity(1)
    }

    const handleloggedOut = () =>{
        navigate('/signIn');
    }




    return(
        <div className={styles.productCard}>
            <div className={styles.productImage} >
                <img src={image} alt="product image" />
            </div>
            <div className={styles.cardBody}>
                <h3>{product}</h3>
                <p>&#8377; {price}</p>
                <p>Category: {category}</p>
                {!user ? <button onClick={handleloggedOut}>Add to cart</button> : 
                (quantity == 0 ? <button onClick={handleAddtoCart}>Add to cart</button> :
                <div className={styles.cartQty}>
                    <p className={styles.decQty} onClick={handDecrease}>-</p>
                    <p className={styles.qty}>{quantity}</p>
                    <p className={styles.incQty} onClick={handleIncrease}>+</p>
                </div>)}

            </div>
        </div>
    )
    
    


}